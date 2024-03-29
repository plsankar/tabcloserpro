import { FC } from "react";

const CloseButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return (
        <button
            className="z-[1] inline-flex items-center justify-center w-6 h-6 p-1 bg-red-500 rounded-full button text-neutral"
            type="button"
            {...props}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="w-5 h-5 lucide lucide-x"
            >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
            </svg>
        </button>
    );
};

export default CloseButton;
