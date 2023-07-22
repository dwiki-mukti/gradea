import { Dispatch, MouseEvent, ReactNode, SetStateAction, useEffect } from "react";



type MyModalProps = {
    children?: ReactNode,
    show: boolean,
    toHide: Dispatch<SetStateAction<any | ((prev: any) => void)>>,
    justHidden?: boolean,
    className?: string,
}

export default function Modal({ children, show, toHide, justHidden, className }: MyModalProps) {

    return (
        <>
            {(show || justHidden) && (
                <div className={`modal ${!show ? 'hidden' : ''} ${className}`}
                    onClick={(e: MouseEvent<HTMLDivElement>) => {
                        if (e.target == e.currentTarget) {
                            toHide(false)
                        }
                    }}>
                    {children}
                </div >
            )
            }
        </>
    )
}