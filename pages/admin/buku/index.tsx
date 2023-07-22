import Button from '@/components/externals/Button'
import Filter from '@/components/externals/Filter'
import Table from '@/components/externals/Table'
import Link from 'next/link'
import React, { useState } from 'react'

function HomePage() {
  const [FilterTable, setFilterTable] = useState({})

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
        leftElement={<>
          <Filter
            setter={setFilterTable}
            getter={FilterTable}
          />
        </>
        }
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

export default HomePage