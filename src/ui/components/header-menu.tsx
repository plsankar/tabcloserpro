import { MenuIcon } from "lucide-react";
import { useAppStore } from "../stores/appstore";
import HeaderMenuItem from "./header-menu-item";

const HeaderMenu = () => {
    const { setIsMenuOpen } = useAppStore();
    return (
        <div className="flex flex-row content-end justify-end flex-grow gap-0">
            <HeaderMenuItem title="Menu" action={() => setIsMenuOpen(true)}>
                <MenuIcon size={16} />
            </HeaderMenuItem>
        </div>
    );
};

export default HeaderMenu;
