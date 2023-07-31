import Button from '@/components/externals/Button'
import InputPassword from '@/components/externals/input/InputPassword'
import InputText from '@/components/externals/input/InputText'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FormEvent, useState } from 'react'

function LoginPage() {
    const router = useRouter()


    /**
     * State declaration
     */
    const [FormLogin, setFormLogin] = useState({})


    /**
     * Function handler
     */
    function onSubmitLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        router.push('/admin/buku')
    }


    /**
     * Render JSX
     */
    return (
        <section className='h-screen flex pb-[6rem] bg-blue-200/10'>
            <div className="card max-w-lg m-auto">
                <div className='card-body p-8'>
                    <Image
                        src={'/logo-pens-text.png'}
                        alt='me'
                        width={90}
                        height={0}
                        className='mb-[3rem] '
                    />
                    <div className='mb-[1rem]'>
                        <div className='text-xl'>Masuk ke akun pengguna</div>
                        <div className='text-xs text-gray-700 mt-1'>Jaga username dan password anda tetap aman</div>
                    </div>
                    <form onSubmit={onSubmitLogin}>
                        <InputText
                            getter={FormLogin}
                            setter={setFormLogin}
                            name='username'
                            className='float-label'
                        />
                        <div className="flex items-end gap-2">
                            <InputPassword
                                getter={FormLogin}
                                setter={setFormLogin}
                                name='password'
                                className='grow float-label'
                            />
                            <Button
                                className='aspect-square btn-outline border-gray-300'
                                text={<>
                                    <i className='bi bi-arrow-right mt-[2px]'></i>
                                </>}
                            />
                        </div>
                    </form>
                    <div className='mt-[4rem]'>
                        <p className="text-center text-gray-500 text-xs">
                            &copy;2023 IT PENS. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage