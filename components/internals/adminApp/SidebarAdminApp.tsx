import Link from 'next/link'
import React, { useEffect } from 'react'



function SidebarAdminApp() {

    useEffect(() => {
        /**
         * Add event showed dropdown child sidenav on click sidenav has child.
         */
        const sideNavHasChilds: any = document.getElementsByClassName('sidebar-item-has-child')
        for (const sideNavHasChild of (sideNavHasChilds as HTMLElement[])) {
            sideNavHasChild.querySelector('.sidebar-link')?.addEventListener('click', onClickSidenavHasChild)
        }

        return () => {
            /**
             * Remove event showed dropdown child sidenav on click sidenav has child.
             */
            for (const sideNavHasChild of (sideNavHasChilds as HTMLElement[])) {
                sideNavHasChild.querySelector('.sidebar-link')?.removeEventListener('click', onClickSidenavHasChild)
            }
        }
    }, [])

    return (
        <>
            <aside className="sidebar">
                <div className="text-center py-6">
                    <div className="mx-auto h-[5rem] bg-profile"></div>
                    <div>
                        <div className="mt-3 text-lg">SMKN 1 JENANGAN</div>
                        <div className="text-xs font-light">DATA INDUK SIMBAH</div>
                    </div>
                </div>
                <div>
                    <div className="sidebar-item">
                        <Link href={`/admin/buku`} className="sidebar-link">
                            <div className="flex items-center gap-4">
                                <i className="mt-[2px] bi bi-book"></i>
                                <div className="capitalize">Buku</div>
                            </div>
                        </Link>
                    </div>
                    <div className="sidebar-item sidebar-item-has-child">
                        <div className="sidebar-link">
                            <div className="flex items-center gap-4">
                                <i className="bi bi-easel"></i>
                                <div className="capitalize">Sidebar Has Child</div>
                            </div>
                            <div className="ml-auto">
                                <div className="sidebar-child-arrow">
                                    <i className="bi bi-chevron-left text-sm"></i>
                                </div>
                            </div>
                        </div >
                        <div className="sidebar-child">
                            <Link href={`#`} className="sidebar-link">
                                <i className="text-xs bi bi-dash"></i>
                                <div className="capitalize">child 1</div>
                            </Link>
                            <Link href={`#`} className="sidebar-link">
                                <i className="text-xs bi bi-dash"></i>
                                <div className="capitalize">child 2</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>
            <div
                className="sidebar-overlay"
                onClick={() => {
                    /**
                     * Hide sidebar on click overlay.
                     */
                    const sidebarEl = document.body.classList;
                    if (!sidebarEl.contains('sidebar-collapse')) {
                        sidebarEl.add('sidebar-collapse');
                    }
                }}
            />
        </>
    )
}






function onClickSidenavHasChild(e: Event) {
    e.preventDefault()
    const classList = (e.target as Element).closest('.sidebar-item-has-child')?.classList
    if (classList?.contains('sidebar-item-has-child-open')) {
        classList?.remove('sidebar-item-has-child-open')
    } else {
        classList?.add('sidebar-item-has-child-open')
    }
}




export default SidebarAdminApp