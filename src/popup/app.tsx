import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import FilterBar from "./filter-bar";
import Header from "./components/header";
import TabGroupListItem from "./components/tab-group-list-item";
import { useAppStore } from "./stores/appstore";

function App() {
    const [groupItems, setGroupItems] = useState<TabGroups>({});

    const { filter } = useAppStore();

    const groupItemKeys = useMemo(() => {
        switch (filter.sort) {
            case "count":
                return Object.keys(groupItems).sort((a, b) => groupItems[b].length - groupItems[a].length);
            case "name":
            default:
                return Object.keys(groupItems).sort((a, b) => a.localeCompare(b));
        }
    }, [groupItems, filter]);

    async function runTabQuery() {
        const tabs = await chrome.tabs.query({
            windowType: "normal",
            pinned: filter.pinned,
            currentWindow: filter.currentWindow === true ? true : undefined,
        });

        const items = tabs
            .filter((tab) => tab.url !== undefined && tab.url !== null && tab.url.length !== 0 && tab.id !== undefined)
            .filter((tab) => tab.url?.includes(filter.search) || tab.title?.includes(filter.search))
            .reduce<TabGroups>((value, tab) => {
                let url;
                try {
                    url = new URL(`${tab.url}`);
                } catch (error) {
                    return value;
                }

                let host = url.hostname;

                if (url.protocol === "file:" || url.protocol === "view-source:") {
                    host = url.protocol;
                }

                const tabToBeAdded = {
                    name: `${!tab.title || tab.title.length == 0 ? tab.url : tab.url}`,
                    url: `${tab.url}`,
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    id: tab.id!,
                };

                if (host in value) {
                    value[host] = [...value[host], tabToBeAdded];
                } else {
                    value[host] = [tabToBeAdded];
                }
                return value;
            }, {});

        setGroupItems(items);
    }

    useEffect(() => {
        function handleOnTabsUpdated() {
            runTabQuery();
        }
        runTabQuery();
        chrome.tabs.onUpdated.addListener(handleOnTabsUpdated);
        chrome.tabs.onRemoved.addListener(handleOnTabsUpdated);
        chrome.tabs.onCreated.addListener(handleOnTabsUpdated);
        return () => {
            chrome.tabs.onUpdated.removeListener(handleOnTabsUpdated);
            chrome.tabs.onRemoved.removeListener(handleOnTabsUpdated);
            chrome.tabs.onCreated.removeListener(handleOnTabsUpdated);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        runTabQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    return (
        <div className="relative flex flex-col h-full overflow-hidden">
            <div className="sticky top-0 z-10">
                <Header />
                <FilterBar />
            </div>
            <div className="flex-grow overflow-scroll divide-y">
                <AnimatePresence>
                    {groupItemKeys.map((key, index) => (
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.03 * index, duration: 0.3 }}
                            key={`domain-${key}-${index}`}
                        >
                            <TabGroupListItem host={key} tabs={groupItems[key]} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default App;
