import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { useAppStore } from "../stores/appstore";

const Header = () => {
    const { setIsMenuOpen } = useAppStore();
    return (
        <div className="flex flex-row items-center w-full gap-4 px-3 py-1 border-b bg-background">
            <img src={chrome.runtime.getURL("logo.svg")} alt="Tab Closer Pro" className="inline-block w-28" />
            <div className="flex flex-row content-end justify-end flex-grow gap-0">
                <Button title="Menu" onClick={() => setIsMenuOpen(true)} size="icon" variant="outline">
                    <MenuIcon className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
};

export default Header;
