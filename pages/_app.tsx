import Breadcrumb from '@/components/externals/Breadcrumb'
import HeaderAdminApp from '@/components/internals/adminApp/HeaderAdminApp'
import SidebarAdminApp from '@/components/internals/adminApp/SidebarAdminApp'
import { typeBreadcumbProps } from '@/interfaces/externals/breadcumb'
import { typeUserAuthed } from '@/interfaces/externals/userAuthed'
import { typeDataBookLists } from '@/interfaces/internals/dataBookLists'
import { AppContext } from '@/utils/frontend'
import type { AppProps } from 'next/app'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const prefix = String(router.pathname).split('/')[1]

  /**
   * State Declaration
   */
  const [UserAuthed, setUserAuthed] = useState<typeUserAuthed>({});
  const [StatusCode, setStatusCode] = useState<number>(200);
  const [BreadcumbValue, setBreadcumbValue] = useState<typeBreadcumbProps>([])
  const [DataBookLists, setDataBookLists] = useState<typeDataBookLists>([])

  
  /**
   * Importing CSS
   */
  if (prefix == 'admin') {
    import('@/styles/externals/corePanel.css')
  }
  import('@/styles/externals.scss')


  /**
   * use effect
   */
  useEffect(() => {
    setDataBookLists([
      {
        id: Date.now(),
        title: 'Book 1',
        prolog: 'Hello World!'
      },
      {
        id: Date.now() + 1,
        title: 'Book 2',
        prolog: 'Hello Panda!'
      }
    ])
  }, [])


  /**
   * Rendered JSX
   */
  return (
    <AppContext.Provider
      value={{
        UserAuthed: UserAuthed, setUserAuthed,
        StatusCode: StatusCode, setStatusCode,
        BreadcumbValue: BreadcumbValue, setBreadcumbValue,
        DataBookLists: DataBookLists, setDataBookLists
      }}
    >
      {(() => {
        if (![200, 202, 422].includes(StatusCode)) {
          return <Error statusCode={StatusCode} />
        } else if ((router.route == '/_error') || !['admin'].includes(prefix)) {
          return <Component {...pageProps} />
        } else {
          return (
            <div className="main-layout">
              <div className="flex">
                <div>
                  <SidebarAdminApp />
                </div>
                <div className="container-fluid">
                  <HeaderAdminApp />
                  <main className="pb-[2rem]">
                    <Breadcrumb navigations={BreadcumbValue} />
                    <Component {...pageProps} />
                  </main>
                </div>
              </div>
            </div>
          )
        }
      })()}
    </AppContext.Provider >
  )
}
