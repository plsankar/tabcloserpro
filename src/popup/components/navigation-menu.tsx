import { GithubIcon, LucideIcon, MessageSquare, TwitterIcon } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { FC } from "react";
import { openTab } from "../utils";
import { useAppStore } from "../stores/appstore";

const NavigationMenu = () => {
    const { isMenuOpen, setIsMenuOpen } = useAppStore();
    return (
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetContent side="left" className="p-3">
                <SheetHeader className="space-y-1">
                    <SheetTitle className="text-base leading-none">TabCloser Pro</SheetTitle>
                    <SheetDescription className="leading-none">V{chrome.runtime.getManifest().version}</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-2 mt-3">
                    <NavigationMenuItem icon={MessageSquare} title="Feedback" action={() => openTab("https://twitter.com/plsankar96")} />
                    <NavigationMenuItem icon={GithubIcon} title="Source Code" action={() => openTab("https://github.com/plsankar/tabcloserpro")} />
                    <span className="block p-2 px-5 -mx-2 border-t text-primary border-primary/10">DEVELOPER</span>
                    <NavigationMenuItem icon={TwitterIcon} title="@plsankar96" action={() => openTab("https://twitter.com/plsankar96")} />
                    <NavigationMenuItem icon={GithubIcon} title="@plsankar" action={() => openTab("https://github.com/plsankar")} />
                </div>
            </SheetContent>
        </Sheet>
    );
};

const NavigationMenuItem: FC<{ icon: LucideIcon; title: string; action?: () => void }> = ({ icon: Icon, title, action }) => {
    return (
        <button
            className="flex flex-row items-center gap-4 px-3 py-2 transition-all duration-300 rounded hover:bg-muted hover:text-foreground"
            title={title}
            onClick={action}
        >
            <Icon size={16} className="w-5 h-5" />
            <span>{title}</span>
        </button>
    );
};

export default NavigationMenu;
