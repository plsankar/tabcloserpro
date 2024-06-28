import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const TabsList: FC<{ isOpen: boolean; tabs: TabItem[] }> = ({ isOpen, tabs }) => {
    async function handleOnClick(item: TabItem) {
        await chrome.tabs.update(item.id, { active: true });
    }
    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.section
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    style={{
                        backgroundColor: "white",
                    }}
                >
                    <div className={clsx("divide-y", isOpen && "border-t")}>
                        {tabs.map((item, index) => (
                            <div
                                key={index}
                                className="px-4 py-3 truncate transition-all duration-100 hover:bg-primary hover:text-neutral"
                                onClick={() => handleOnClick(item)}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                </motion.section>
            )}
        </AnimatePresence>
    );
};

export default TabsList;
