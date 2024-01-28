import { useEffect, useMemo, useState } from "react";
import Header from "./components/header";
import TabGroupListItem from "./components/tab-group-list-item";
import { motion } from "framer-motion";

function App() {
    const [groupItems, setGroupItems] = useState<TabGroups>({});

    const groupItemKeys = useMemo(() => Object.keys(groupItems).sort((a, b) => a.localeCompare(b)), [groupItems]);

    const [options, setOptions] = useState({
        pinned: false,
        currentWindow: true,
    });

    async function runTabQuery() {
        const tabs = await chrome.tabs.query({
            windowType: "normal",
            pinned: options.pinned,
            currentWindow: options.currentWindow === true ? true : undefined,
        });

        const items = tabs
            .filter((tab) => tab.url !== undefined && tab.url !== null && tab.url.length !== 0 && tab.id !== undefined)
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
    }, [options]);

    return (
        <div className="relative flex flex-col min-h-screen">
            <Header />
            <div className="grid grid-cols-2 p-3 text-xs bg-white border-b">
                <div className="flex items-center">
                    <input
                        id="pinned-tabs"
                        type="checkbox"
                        value=""
                        className="w-3 h-3"
                        checked={options.pinned}
                        onChange={() => {
                            setOptions((opt) => {
                                return {
                                    ...opt,
                                    pinned: !opt.pinned,
                                };
                            });
                        }}
                    />
                    <label htmlFor="pinned-tabs" className="text-xs ms-2">
                        Only Pinned Tabs
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        id="current-window"
                        type="checkbox"
                        value=""
                        className="w-3 h-3"
                        checked={options.currentWindow}
                        onChange={() => {
                            setOptions((opt) => {
                                return {
                                    ...opt,
                                    currentWindow: !opt.currentWindow,
                                };
                            });
                        }}
                    />
                    <label htmlFor="current-window" className="text-xs ms-2">
                        Only Current Window
                    </label>
                </div>
            </div>
            <div className="divide-y">
                {groupItemKeys.map((key, index) => (
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.03 * index, duration: 0.3 }}
                    >
                        <TabGroupListItem host={key} key={`domain-${key}-${index}`} tabs={groupItems[key]} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default App;
