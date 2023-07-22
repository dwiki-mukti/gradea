
import Confirm from '@/components/externals/popup/Confirm';
import Dropdown from '@/components/externals/popup/Dropdown';
import Link from 'next/link';
import React, { useState } from 'react'

function HeaderAdminApp() {
    return (
        <>
            <header className="header">
                <div className="flex items-center">
                    <div
                        className="header-icon-square"
                        onClick={onClickSlider}>
                        <i className="bi bi-justify-left text-lg"></i>
                    </div>
                </div>
                <div className="ml-auto flex items-center">
                    <Profile />
                </div>
            </header>
        </>
    )
}






function Profile() {
    const [ShowProfile, setShowProfile] = useState(false)
    const [AlertLogout, setAlertLogout] = useState(false)
    return (
        <div className='relative'>
            <div className="header-icon-square" onClick={() => setShowProfile(true)}>
                <i className="bi bi-person-circle text-2xl mb-[-.25rem]"></i>
            </div>
            <Dropdown show={ShowProfile} toHide={setShowProfile} className='w-[20rem] right-0 text-center overflow-hidden'>
                <div className="py-4">
                    <i className='bi bi-person-circle text-[3rem]'></i>
                    <div className="text-lg truncate mt-1">Dwiki</div>
                    <div className="text-xs text-gray-600 mt-1">Administrator</div>
                </div>
                <Link href={'/ubah-sandi'}>
                    <div
                        className="py-2 border-t cursor-pointer hover:bg-gray-200"
                    >
                        <span>Ubah sandi</span>
                    </div>
                </Link>
                <div
                    className="py-2 border-t cursor-pointer hover:bg-red-500 hover:text-white"
                    onClick={() => { setAlertLogout(true) }}
                >
                    {/* <FontAwesomeIcon icon={faPowerOff} className="mr-1" /> */}
                    <span>Logout</span>
                </div>
            </Dropdown>
            <Confirm
                question="Anda benar-benar ingin logout?"
                show={AlertLogout}
                toHide={setAlertLogout}
                onApproved={() => { setAlertLogout(false) }}
            />
        </div>
    )
}






/**
 * Handle toggle sidebar on click icon slider.
 */
function onClickSlider() {
    const sidebarEl = document.body.classList;
    if (!sidebarEl.contains('sidebar-collapse')) {
        sidebarEl.add('sidebar-collapse');
    } else {
        sidebarEl.remove('sidebar-collapse');
    }
}






export default HeaderAdminApp