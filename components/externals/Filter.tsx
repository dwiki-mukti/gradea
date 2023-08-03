import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import Button from './Button'
import Mark from './Mark'
import Modal from './popup/Modal'
import HeaderModal from './popup/HeaderModal'



interface typeFilterProps {
    setter: Dispatch<SetStateAction<typeStateInput | ((prev: typeStateInput) => void)>>,
    getter: typeStateInput,
}

function Filter({ setter, getter }: typeFilterProps) {
    const [ShowMoadal, setShowMoadal] = useState(false)
    return (<>
        <Button
            className='h-[2.25rem] btn-outline border-gray-400 gap-1'
            onClick={() => { setShowMoadal(true) }}
            text={<>
                {false ? (
                    <Mark text={99} className='mb-[2px]' />
                ) : (
                    <i className='bi bi-sliders2'></i>
                )}
                <span>Filter</span>
            </>}
        />
        <Modal show={ShowMoadal} toHide={() => setShowMoadal(false)}>
            <div className='max-w-xl w-full m-auto'>
                <div className='card '>
                    <HeaderModal title='hello' toHide={setShowMoadal} />
                    <div className="card-body">
                        hello
                    </div>
                    <div className="card-footer">
                        <Button text="Terapkan" className='ml-auto' />
                    </div>
                </div>
            </div>
        </Modal>
    </>)
}

export default Filter