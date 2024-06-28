import { FC, useState } from "react";

import { Badge } from "@/components/ui/badge";
import CloseButton from "./close-button";
import TabsList from "./tabs-list";
import clsx from "clsx";

const TabGroupListItem: FC<{ host: string; tabs: TabItem[] }> = ({ host, tabs }) => {
    const [isOpen, setIsOpen] = useState(false);
    async function handleOnCloseClicked(closingTabs: TabItem[]) {
        Promise.all(closingTabs.map((tab) => chrome.tabs.remove(tab.id)));
    }
    return (
        <div className={clsx("transition-all duration-200 hover:bg-white", isOpen && "bg-white")}>
            <div className="relative flex items-center gap-3 px-4 py-3 overflow-hidden group" onClick={() => setIsOpen(!isOpen)}>
                <div className="w-[25px] transition-all duration-200 group-hover:translate-y-14">
                    <img src={`https://www.google.com/s2/favicons?domain=${host}&sz=32`} width={32} height={32} className="object-cover w-4 h-4" />
                </div>
                <div className="flex-grow">
                    <p className="truncate">{host}</p>
                </div>
                <div className="w-[25px]">
                    <Badge variant="default" className="text-xs">
                        {`${tabs.length}`.padStart(2, "0")}
                    </Badge>
                </div>
                <div className="z-[2] w-[25px] h-6 absolute top-1/2 -translate-y-14 group-hover:-translate-y-1/2 left-4 transition-all duration-200">
                    <CloseButton
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            handleOnCloseClicked(tabs);
                        }}
                    />
                </div>
            </div>
            <TabsList isOpen={isOpen} tabs={tabs} />
        </div>
    );
};

export default TabGroupListItem;
