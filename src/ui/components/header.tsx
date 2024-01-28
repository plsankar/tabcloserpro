import HeaderMenu from "./header-menu";

const Header = () => {
    return (
        <div className="sticky top-0 flex flex-row items-center w-full gap-4 px-4 py-1 border-b bg-neutral">
            <img src={chrome.runtime.getURL("logo.svg")} alt="Tab Closer Pro" className="inline-block w-28" />
            <HeaderMenu />
        </div>
    );
};

export default Header;
