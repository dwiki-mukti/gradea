import Breadcrumb from '@/components/externals/Breadcrumb'
import HeaderAdminApp from '@/components/internals/adminApp/HeaderAdminApp'
import SidebarAdminApp from '@/components/internals/adminApp/SidebarAdminApp'
import { typeBreadcumbValue } from '@/interfaces/breadcumb'
import { typeUserAuthed } from '@/interfaces/userAuthed'
import { AppContext } from '@/utils/jsx'
import type { AppProps } from 'next/app'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const prefix = String(router.pathname).split('/')[1]

  /**
   * State Declaration
   */
  const [UserAuthed, setUserAuthed] = useState<typeUserAuthed>({});
  const [StatusCode, setStatusCode] = useState<number>(200);
  const [BreadcumbValue, setBreadcumbValue] = useState<typeBreadcumbValue>([])

  /**
   * Importing CSS
   */
  if (prefix == 'admin') {
    import('@/styles/externals/panels/corePanel.css')
  }
  import('@/styles/externals.scss')


  /**
   * Rendered JSX
   */
  return (
    <AppContext.Provider
      value={{
        UserAuthed: UserAuthed, setUserAuthed,
        StatusCode: StatusCode, setStatusCode,
        BreadcumbValue: BreadcumbValue, setBreadcumbValue,
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
              <div className="flex overflow-auto">
                <div>
                  <SidebarAdminApp />
                </div>
                <div className="grow">
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
