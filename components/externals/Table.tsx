import React, { ReactNode } from 'react'
interface typeTableProps {
    type?: 'carded-section' | 'carded' | 'striped',
    leftElement?: ReactNode,
    rightElement?: ReactNode
}
function Table({
    type,
    leftElement,
    rightElement
}: typeTableProps) {
    return (
        <div>
            <div className='section bg-white'>
                <div className="flex gap-4 flex-col-reverse md:flex-row px-2 pt-8 pb-2">
                    <div className="flex gap-2 text-xs">
                        <Paginate />
                        <Search />
                        {leftElement}
                    </div>
                    <div className='flex gap-2 md:ml-auto'>
                        {rightElement}
                    </div>
                </div>
            </div>
            <div>
                <div className={`overflow-auto ${(type == 'carded-section') && 'section-table'}`}>
                    <table className={`table table-${(type ?? 'striped').replace('-section', '')}`}>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3].map((res) => (
                                <tr key={res}>
                                    <td>{res}</td>
                                    <td>Zoe Kraken</td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}




function Paginate() {
    return (
        <div>
            <div className='flex items-center h-[2.25rem] border border-gray-400 rounded-lg cursor-pointer overflow-hidden'>
                <div className='hover:text-primary flex items-center'>
                    <i className='bi bi-chevron-left pt-[2px] pl-2'></i>
                </div>
                <div className='hover:text-primary flex items-center'>
                    <div className='px-1 pt-[2px]'>12/100</div>
                </div>
                <div className='hover:text-primary flex items-center'>
                    <i className='bi bi-chevron-right pt-[2px] pr-2'></i>
                </div>
            </div>
        </div>
    )
}


function Search() {
    return (
        <div className="flex grow md:grow-0">
            <input className='h-[2.25rem] w-full border border-gray-400 rounded-lg px-4' placeholder='Search...' />
            <div className='my-auto pb-[3px] ml-[-1.5rem] w-[1.5rem] cursor-pointer '>
                <i className='bi bi-search'></i>
            </div>
        </div>
    )
}

export default Table