import React from 'react'
import Color from '../components/Color'

const FilterBy = () => {
    return (
        <div className='filter-card mb-3'>
            <h3 className='filter-title'>
                Filter By
            </h3>
            <div>
                <h5 className='sub-title'>Availablity</h5>
                <div>
                    <div className='form-check'>
                        <input className='form-check-input' type='checkbox' value='' id='' />
                        <label className='form-check-label' htmlFor=''>In Stock (1)</label>
                    </div>
                    <div className='form-check'>
                        <input className='form-check-input' type='checkbox' value='' id='' />
                        <label className='form-check-label' htmlFor=''>Out of Stock (0)</label>
                    </div>
                </div>
                <h5 className='sub-title'>Price</h5>
                <div className='d-flex align-items-center'>
                    <div className="form-floating">
                        <input type="number"
                            className="form-control"
                            style={{ height: '50px' }}
                            id="floatingInputValue"
                            placeholder="From" />
                        <label htmlFor="floatingInputValue">From</label>
                    </div>
                    <div className="form-floating">
                        <input type="number"
                            className="form-control"
                            style={{ height: '50px' }}
                            id="floatingInputValue"
                            placeholder="To" />
                        <label htmlFor="floatingInputValue">To</label>
                    </div>
                </div>
                <h5 className='sub-title mt-3'>Color</h5>
                <div>
                    <Color />
                </div>
                <h5 className='sub-title'>Size</h5>
                <div>
                    <div className='form-check'>
                        <input className='form-check-input' type='checkbox' value='' id='color-1' />
                        <label className='form-check-label' htmlFor='color-1'>S (2)</label>
                    </div>
                    <div className='form-check'>
                        <input className='form-check-input' type='checkbox' value='' id='color-2' />
                        <label className='form-check-label' htmlFor='color-2'>M (2)</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterBy
