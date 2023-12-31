import React from 'react'

const SortOrder = ({ setGrid }) => {
    return (
        <div className='filter-sort-grid mb-4'>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center gap-10'>
                    <p className='mb-0 d-block' style={{ width: '100px' }}>Sort by:</p>
                    <select defaultValue={'manual'} className='form-control form-select'>
                        <option value='manual'>Featured</option>
                        <option value='best-selling'>Best selling</option>
                        <option value='title-ascending'>Alphabetically, A-Z</option>
                        <option value='title-descending'>Alphabetically, Z-A</option>
                        <option value='price-ascending'>Price, low to high</option>
                        <option value='price-descending'>Price, high to low</option>
                        <option value='created-ascending'>Date, old to new</option>
                        <option value='created-descending'>Date, new to old</option>
                    </select>
                </div>
                <div className='d-flex align-items-center gap-10'>
                    <p className='total-products mb-0'>21 Products</p>
                    <div className='d-flex gap-10 align-items-center grid'>
                        <img onClick={() => setGrid(3)} src='images/gr4.svg' className='d-block img-fluid' alt='grid' />
                        <img onClick={() => setGrid(4)} src='images/gr3.svg' className='d-block img-fluid' alt='grid' />
                        <img onClick={() => setGrid(6)} src='images/gr2.svg' className='d-block img-fluid' alt='grid' />
                        <img onClick={() => setGrid(12)} src='images/gr.svg' className='d-block img-fluid' alt='grid' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SortOrder
