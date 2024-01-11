import React from 'react'

const ProductTag = () => {
    return (
        <div className='filter-card mb-3'>
            <h3 className='filter-title'>
                Product Tags
            </h3>
            <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                <span className='badge bg-light text-secondary rounded-3 px-3 py-2'>Headphone</span>
                <span className='badge bg-light text-secondary rounded-3 px-3 py-2'>Laptop</span>
                <span className='badge bg-light text-secondary rounded-3 px-3 py-2'>Mobile</span>
                <span className='badge bg-light text-secondary rounded-3 px-3 py-2'>Oppo</span>
                <span className='badge bg-light text-secondary rounded-3 px-3 py-2'>Speaker</span>
                <span className='badge bg-light text-secondary rounded-3 px-3 py-2'>Tablet</span>
            </div>
        </div>
    )
}

export default ProductTag
