import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.push('/admin/buku');
  }, [])

  return (<></>)
}

export default HomePage