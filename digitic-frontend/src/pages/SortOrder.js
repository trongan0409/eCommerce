import { Select } from 'antd'
import React from 'react'

const SortOrder = ({ setGrid, onOrderCallback }) => {
    const onChangeValueOrder = (value) => {
        onOrderCallback(value)
    };

    return (
        <div className='filter-sort-grid mb-4'>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center gap-10'>
                    <p className='mb-0 d-block' style={{ width: '100px' }}>Sort by:</p>
                    <Select defaultValue='all' onChange={onChangeValueOrder} style={{ width: "100%" }} options={[
                        {
                            label: 'All Products',
                            value: 'all'
                        },
                        // {
                        //     label: 'Best selling',
                        //     value: 'best-selling'
                        // },
                        {
                            label: 'Alphabetically, A-Z',
                            value: 'title-ascending'
                        },
                        {
                            label: 'Alphabetically, Z-A',
                            value: 'title-descending'
                        },
                        {
                            label: 'Price, low to high',
                            value: 'price-ascending'
                        },
                        {
                            label: 'Price, high to low',
                            value: 'price-descending'
                        }
                    ]} />
                </div>
                <div className='d-flex align-items-center gap-10'>
                    {/* <p className='total-products mb-0'>21 Products</p> */}
                    <div className='d-flex gap-10 align-items-center grid'>
                        <img onClick={() => setGrid(3)} src='/images/gr4.svg' className='d-block img-fluid' alt='grid' />
                        <img onClick={() => setGrid(4)} src='/images/gr3.svg' className='d-block img-fluid' alt='grid' />
                        <img onClick={() => setGrid(6)} src='/images/gr2.svg' className='d-block img-fluid' alt='grid' />
                        <img onClick={() => setGrid(12)} src='/images/gr.svg' className='d-block img-fluid' alt='grid' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SortOrder
