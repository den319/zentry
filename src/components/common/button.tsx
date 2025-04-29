import React from "react";


export interface ButtonProps {
    id?: string;
    title?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    containerClass?: string;
    textClass?:string;
}
export default function Button({id, title, leftIcon, rightIcon, containerClass, textClass}: ButtonProps) {
    return (
        <button
            id={id}
            className={`group relative w-fit cursor-pointer overflow-hidden rounded-full 
            bg-violet-50 px-7 py-3 text-black ${containerClass}`}
        >
            {leftIcon}

            <span className="relative incline-flex overflow-hidden font-general text-xs uppercase">
                <div className={`${textClass}`}>
                    {title}
                </div>
            </span>

            {rightIcon}
        </button>
    )
}