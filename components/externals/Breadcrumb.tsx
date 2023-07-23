import { typeBreadcumbProps } from '@/interfaces/externals/breadcumb';
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import React from 'react'



export default function Breadcrumb({ navigations }: { navigations?: typeBreadcumbProps }) {
    const router = useRouter();
    const controls = navigations?.length ? navigations : pathToNavigations(router);

    return (
        <section className="mb-0 bg-white border-y shadow">
            <div className='px-3'>
                <div className="flex text-xs capitalize py-2 font-semibold">
                    {controls?.map((control, indexControl) => {
                        return (
                            <div key={indexControl}>
                                {((indexControl + 1) < controls.length) ? (
                                    <div className='text-slate-500'>
                                        <Link href={String(control?.url)}>{control?.label}</Link>
                                        <i className="bi bi-chevron-compact-right mx-1"></i>
                                    </div>
                                ) : (
                                    <div className='cursor-default text-slate-600'>{control?.label}</div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}





function pathToNavigations(router: NextRouter) {
    const prevPaths = String(router.asPath).split('?')[0].split('/').filter((asPath) => (asPath != 'admin'))
    const prevAsPath = String(router.pathname).split('/')

    return prevPaths.map((prevPath, indexPrevPath) => {
        var label;
        var url = '';
        switch (indexPrevPath) {
            case 0:
                url = `/admin`
                label = 'dashboard';
                break;
            case 1:
                url = `/admin/${prevPath}`
                label = prevPath;
                break;
            case 2:
                if (prevAsPath[3].includes('[') && prevAsPath[3].includes(']')) {
                    label = `detail ${prevPaths[1]}`;
                } else if (prevPath == 'data') {
                    label = prevPaths[3] ? `edit ${prevPaths[1]}` : `buat ${prevPaths[1]} baru`;
                } else if (prevPath == 'manage') {
                    label = `Manage ${prevPaths[1]}`;
                }
                break;
        }
        if (label) {
            return {
                url,
                label: label.replace('-', ' ')
            }
        }
    }).filter((prevPath) => (prevPath));
}