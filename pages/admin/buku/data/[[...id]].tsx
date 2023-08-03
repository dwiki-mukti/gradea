import Form from '@/components/externals/Form'
import { AppContext } from '@/components/internals/AppContext'
import { useRouter } from 'next/router'
import React, { FormEvent, useContext, useEffect, useState } from 'react'

function BookPage() {
    const { setDataBookLists, DataBookLists } = useContext(AppContext)
    const router = useRouter()
    const queryId = router.query.id;

    /**
     * State Declaration
     */
    const [FormSample, setFormSample] = useState({})


    /**
     * Function Handler
     */
    function onSubmitForm(e: FormEvent<HTMLFormElement>) {
        const formData = new FormData(e.target as HTMLFormElement)
        setDataBookLists((prev: typeDataBookLists): typeDataBookLists => {
            const result = prev.filter(({ id }) => (String(id) != queryId?.[0]))
            result.unshift({
                id: (queryId?.[0] ?? Date.now()) as number,
                title: formData.get('title') as string,
                prolog: formData.get('prolog') as string,
            })
            return result
        })
        return router.push('/admin/buku')
    }


    /**
     * use effect
     */
    useEffect(() => {
        if (router.isReady && queryId?.[0]) {
            const defaultValue = DataBookLists.filter(({ id }) => (String(id) == queryId?.[0]))?.[0]
            if (defaultValue) {
                setFormSample((prev: typeStateInput): typeStateInput => ({
                    ...prev,
                    values: defaultValue
                }))
            }
        }
    }, [router])



    /**
     * Rendered JSX
     */
    return (
        <>
            <section className='bg-white border-b shadow'>
                <div className='h-[1rem]'>
                </div>
            </section>
            <section className='mt-4'>
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">Book List</div>
                    </div>
                    <div className="card-body">
                        <Form
                            onSubmit={onSubmitForm}
                            getter={FormSample}
                            setter={setFormSample}
                            fields={[
                                {
                                    name: 'title',
                                    title: 'judul',
                                    validations: { required: true }
                                },
                                {
                                    name: 'prolog',
                                    title: 'prolog',
                                    type: 'textarea',
                                    validations: { required: true }
                                }
                            ]}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default BookPage