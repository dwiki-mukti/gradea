import Button from '@/components/externals/Button'
import Filter from '@/components/externals/Filter'
import Table from '@/components/externals/Table'
import { AppContext } from '@/components/internals/AppContext'
import Link from 'next/link'
import React, { useContext, useState } from 'react'

function BookHomePage() {
  const { DataBookLists, setDataBookLists } = useContext(AppContext)

  /**
   * State Declaration
   */
  const [FilterTable, setFilterTable] = useState({})


  /**
   * Render JSX
   */
  return (
    <>
      {/* <section className='bg-white'>
        <div className='px-2'>
          <div className='pt-4 text-xl'>Hello World</div>
          <div className='pt-1'>Lorem ipsum dolor.</div>
        </div>
      </section> */}
      <Table
        type='carded-section'
        actions={['edit', 'delete']}
        noPaginate={true}
        data={{
          columns: [
            {
              title: 'Judul',
              keyData: 'title'
            },
            {
              title: 'Prolog',
              keyData: 'prolog'
            }
          ],
          dataRows: DataBookLists
        }}
        onDelete={(idItem: any) => {
          setDataBookLists((prev: typeDataBookLists) => {
            return prev.filter((data) => (data.id != idItem))
          })
        }}
        // leftElement={<>
        //   <Filter
        //     setter={setFilterTable}
        //     getter={FilterTable}
        //   />
        // </>
        // }
        rightElement={<>
          <Link href={'/admin/buku/data'}>
            <Button
              text='Tambah Data'
            />
          </Link>
        </>}
      />
    </>
  )
}

export default BookHomePage