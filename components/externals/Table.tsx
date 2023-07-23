import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import Confirm from './popup/Confirm';


interface typeDataTable {
    columns?: {
        title: string,
        keyData: string,
        className?: string
    }[],
    dataRows?: (Record<string, any>)[],
    paginate?: {
        current_page: number,
        last_page: number,
    },
    primaryKey?: string,
}
interface typeTableProps {
    url?: string,
    data?: typeDataTable,
    type?: 'carded-section' | 'carded' | 'striped',
    actions?: ('show' | 'edit' | 'delete')[] | '*',
    objParams?: Record<string, any>,

    onDelete?: (idItem: any) => void,
    onSearch?: (value: string) => void,
    onChangeParams?: (objectParams: any) => ReactNode,

    noNumber?: boolean,
    noSearch?: boolean,
    noPaginate?: boolean,

    leftElement?: ReactNode,
    rightElement?: ReactNode,
    customAction?: (dataRow: any) => {}
}
function Table({
    url,
    data,
    type,
    actions,
    objParams,

    onDelete,
    onSearch,
    onChangeParams,

    noNumber,
    noSearch,
    noPaginate,

    leftElement,
    rightElement,
    customAction,
}: typeTableProps) {
    const router = useRouter();
    const [DataTables, setDataTables] = useState<typeDataTable>({});
    const [ShowConfirmDelete, setShowConfirmDelete] = useState(null);
    const [SearchValue, setSearchValue] = useState('');
    const [CurrentPage, setCurrentPage] = useState(1);



    /**
     * Function Helper
     */
    function mergeParams(page: number) {
        const newObjParams: Record<string, any> = { page: page, ...objParams };
        if (SearchValue) newObjParams.search = SearchValue;
        return newObjParams;
    }




    /**
     * Function Handler
     */
    function loadData(page: number) {
        // Here code...
    }

    function handleDelete() {
        if (onDelete) onDelete(ShowConfirmDelete);

        if (!data && url) {
            // Here code...
        }
        setShowConfirmDelete(null);
    };

    function handleSearch(keyWord: string) {
        if (data) {
            setDataTables(() => ({
                ...data,
                dataRows: data.dataRows?.filter((dataRow) => {
                    return data.columns?.filter(({ keyData }) => {
                        return ((dataRow[keyData] as string).toLowerCase().match(keyWord.toLowerCase()))
                    }).length
                })
            }))
        }
        if (onSearch) onSearch(keyWord)
        setSearchValue(keyWord)
    }



    /**
     * useEffect
     */
    useEffect(() => {
        if (data) setDataTables(data);
    }, [data])

    useEffect(() => {
        if (!data && url) loadData(1)
        setCurrentPage(1)
    }, [SearchValue, objParams])

    useEffect(() => {
        if (onChangeParams) onChangeParams(mergeParams(CurrentPage))
    }, [SearchValue, CurrentPage])



    /**
     * Rendered JSX
     */
    return (
        <div>
            <div className='section bg-white'>
                <div className="flex gap-4 flex-col-reverse md:flex-row px-2 pt-8 pb-2">
                    <div className="flex gap-2 text-xs">
                        {!noPaginate && <Paginate />}
                        {!noSearch && <Search onSubmit={handleSearch} />}
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
                                {!noNumber && <th style={{ width: "1px" }}>#</th>}
                                {DataTables.columns?.map((column, indexColumn) => {
                                    return (
                                        <th key={indexColumn} className={column.className}>
                                            {column.title}
                                        </th>
                                    );
                                })}
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {Boolean(DataTables?.dataRows?.length) ? (
                                DataTables.dataRows?.map((dataRow: Record<string, any>, indexDataRow) => {
                                    const primaryKey = dataRow?.[DataTables.primaryKey ?? ''] ?? dataRow?.id;
                                    return (
                                        <tr key={indexDataRow}>
                                            {!noNumber && <td>{indexDataRow + 1}</td>}

                                            {/* data rows */}
                                            {DataTables.columns?.map((column, indexColumn) => {
                                                const { keyData } = column;
                                                return (
                                                    <td
                                                        key={indexColumn}
                                                        dangerouslySetInnerHTML={{
                                                            __html: (() => {
                                                                try {
                                                                    return eval(keyData)(dataRow);
                                                                } catch (error) {
                                                                    return dataRow[keyData];
                                                                }
                                                            })()
                                                        }}
                                                    />
                                                );
                                            })}

                                            {/* action rows */}
                                            <td className="inline-flex items-center gap-4">
                                                {customAction ? (customAction(dataRow) as ReactNode) : ''}
                                                {(actions?.includes('show') || actions?.[0] == '*') && (
                                                    <Link
                                                        href={`${router.pathname}/${primaryKey}`}
                                                        className="btn-square text-blue-400"
                                                    >
                                                        <i className='bi bi-eye-fill'></i>
                                                    </Link>
                                                )}
                                                {(actions?.includes("edit") || actions?.[0] == "*") && (
                                                    <Link
                                                        href={`${router.pathname}/data/${primaryKey}`}
                                                        className="btn-square text-yellow-400"
                                                    >
                                                        <i className='bi bi-pencil-square'></i>
                                                    </Link>
                                                )}
                                                {(actions?.includes("delete") || actions?.[0] == "*") && (
                                                    <a
                                                        className="btn-square text-red-400"
                                                        onClick={() => {
                                                            setShowConfirmDelete(primaryKey);
                                                        }}
                                                    >
                                                        <i className='bi bi-trash'></i>
                                                    </a>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan={(DataTables.columns?.length ?? 0) + 1}
                                        className="text-center text-gray-500"
                                        style={{ padding: "4rem 0" }}
                                    >
                                        Data Kosong
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Confirm
                    show={ShowConfirmDelete != null}
                    toHide={() => setShowConfirmDelete(null)}
                    onApproved={handleDelete}
                />
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


function Search({ onSubmit }: { onSubmit: (value: string) => void }) {
    const refSearch = useRef<HTMLInputElement>(null)
    const [DelaySearch, setDelaySearch] = useState<ReturnType<typeof setTimeout>>()
    return (
        <div className="flex grow md:grow-0">
            <input
                ref={refSearch}
                className='h-[2.25rem] w-full border border-gray-400 rounded-lg px-4'
                placeholder='Search...'
                onInput={(e) => {
                    const value = e.currentTarget.value
                    clearTimeout(DelaySearch)
                    setDelaySearch(
                        setTimeout(() => {
                            onSubmit(value);
                        }, 1000)
                    )
                }}
            />
            <div
                onSubmit={() => {
                    onSubmit(refSearch.current?.value ?? '');
                }}
                className='my-auto pb-[3px] ml-[-1.5rem] w-[1.5rem] cursor-pointer'
            >
                <i className='bi bi-search'></i>
            </div>
        </div>
    )
}

export default Table