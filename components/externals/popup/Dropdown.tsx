import { Props } from "next/script";
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction, useRef } from "react";

type MyDropdownProps = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
> & {
    justHidden?: boolean,
    show: boolean,
    toHide: Dispatch<SetStateAction<any | ((prev: any) => void)>>,
}


export default function Dropdown({
    justHidden,
    show,
    toHide,
    children,
    className,
    ref,
    ...props
}: MyDropdownProps) {
    return (
        <>
            {(show || justHidden) && (
                <div className={`${!show ? 'hidden' : ''}`}>
                    <div className="fixed inset-0 z-20" onClick={() => toHide(false)}></div>
                    <div
                        className={`absolute z-20 card ${className}`} //overflow-hidden
                        {...props}
                    >
                        {children}
                    </div >
                </div>
            )}
        </>
    )
}