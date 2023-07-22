import React from 'react'

function BookPage() {
    return (
        <>
            <section className='mt-4'>
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">Book List</div>
                    </div>
                    <div className="card-body">
                        {['nama', 'email', 'hoby'].map((res, index) => (
                            <div key={index} className='input-group'>
                                <label>{res}</label>
                                <input type="text" />
                            </div>
                        ))}
                    </div>
                    <div className="card-footer"></div>
                </div>
            </section>
        </>
    )
}

export default BookPage