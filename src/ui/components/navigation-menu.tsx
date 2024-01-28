import { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { GithubIcon, TwitterIcon, LucideIcon, MessageSquare } from "lucide-react";
import { openTab } from "../utils";
import { useAppStore } from "../stores/appstore";

const NavigationMenu = () => {
    const { isMenuOpen, setIsMenuOpen } = useAppStore();
    return (
        <Transition appear show={isMenuOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsMenuOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transform transition ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out sm:duration-700"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="w-[80%] max-w-md p-2 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-e-xl flex flex-col justify-between">
                                <div className="flex flex-col gap-2">
                                    <NavigationMenuItem
                                        icon={MessageSquare}
                                        title="Feedback"
                                        action={() => openTab("https://twitter.com/plsankar96")}
                                    />
                                    <NavigationMenuItem
                                        icon={GithubIcon}
                                        title="Source Code"
                                        action={() => openTab("https://github.com/plsankar/tabcloserpro")}
                                    />
                                    <span className="block p-2 px-5 -mx-2 text-xs border-t text-primary border-primary/10">DEVELOPER</span>
                                    <NavigationMenuItem
                                        icon={TwitterIcon}
                                        title="@plsankar96"
                                        action={() => openTab("https://twitter.com/plsankar96")}
                                    />
                                    <NavigationMenuItem icon={GithubIcon} title="@plsankar" action={() => openTab("https://github.com/plsankar")} />
                                </div>
                                <div className="text-gray-500 ">V{chrome.runtime.getManifest().version}</div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

const NavigationMenuItem: FC<{ icon: LucideIcon; title: string; action?: () => void }> = ({ icon: Icon, title, action }) => {
    return (
        <button
            className="flex flex-row items-center gap-4 px-3 py-2 transition-all duration-300 rounded hover:bg-primary hover:text-neutral"
            title={title}
            onClick={action}
        >
            <Icon size={16} className="w-5 h-5" />
            <span>{title}</span>
        </button>
    );
};

export default NavigationMenu;
