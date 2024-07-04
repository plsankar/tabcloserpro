import { useEffect, useState } from "react";
import { useAppStore } from "../stores/appstore";

const ChromeStorageProvider = () => {
    const [initiated, setInitiated] = useState(false);
    const { setFilter, filter } = useAppStore();

    useEffect(() => {
        if (!initiated) {
            chrome.storage.sync.get("filter", function ({ filter }) {
                setFilter(filter);
                setInitiated(true);
            });
        }
    }, [initiated, setFilter]);

    useEffect(() => {
        if (initiated) {
            chrome.storage.sync.set({ filter: { ...filter, search: "" } });
        }
    }, [filter, initiated]);

    return null;
};

export default ChromeStorageProvider;
