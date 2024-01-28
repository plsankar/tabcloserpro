import { FC, ReactNode } from "react";

const HeaderMenuItem: FC<{ children: ReactNode; title: string; action?: () => void }> = ({ children, title, action }) => {
    return (
        <button
            className="inline-flex items-center justify-center rounded w-9 h-9 hover:bg-primary hover:text-neutral"
            data-tooltip-id="app-tooltip"
            data-tooltip-content={title}
            onClick={action}
            title={title}
        >
            {children}
        </button>
    );
};

export default HeaderMenuItem;
