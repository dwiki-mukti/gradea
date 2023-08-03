import Breadcrumb from '@/components/externals/Breadcrumb'
import { AppContext } from '@/components/internals/AppContext'
import HeaderAdminApp from '@/components/internals/adminApp/HeaderAdminApp'
import SidebarAdminApp from '@/components/internals/adminApp/SidebarAdminApp'
import { api } from '@/utils/frontend'
import type { AppProps } from 'next/app'
import Error from 'next/error'
import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'



/**
 * @App
 * 
 * 
 * Main Function
 */
function App({ children }: { children: ReactNode }) {
  const router = useRouter()
  const prefix = String(router.pathname).split('/')[1]


  /**
   * Importing CSS
   */
  if (prefix == 'admin') {
    import('@/styles/externals/corePanel.css')
  }
  import('@/styles/externals.scss')


  /**
   * State Declaration
   */
  const [UserAuthed, setUserAuthed] = useState<typeUserAuthed>({});
  const [StatusCode, setStatusCode] = useState<number>(200);
  const [BreadcumbValue, setBreadcumbValue] = useState<typeBreadcumbProps>([])
  const [DataBookLists, setDataBookLists] = useState<typeDataBookLists>([])


  /**
   * Load data
   */
  async function fetcher() {
    return (await api({ url: '/books.json' })).json()
  }
  const { data } = useQuery('bookApi', fetcher);


  /**
   * Use Effect
   */
  useEffect(() => {
    setDataBookLists(data);
  }, [data])


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
          return children
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
                    {children}
                  </main>
                </div>
              </div>
            </div>
          )
        }
      })()}
    </AppContext.Provider>
  )
}




/**
 * @HigherOrderApp
 * 
 * 
 * Init React Query Client
 */
function HigherOrderApp({ Component, pageProps }: AppProps) {
  /**
   * Init result
   */
  var result = (
    <App>
      <Component {...pageProps} />
    </App>
  )

  /**
   * Init react query
   */
  result = QueryClientProvider({
    client: new QueryClient(),
    children: result
  })

  /**
   * Render result
   */
  return result
}





export default HigherOrderApp