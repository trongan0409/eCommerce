import React from 'react'
import ReactStars from 'react-rating-stars-component';

const RandomProduct = () => {
    return (
        <div className='filter-card mb-3'>
            <h3 className='filter-title'>
                Random Product
            </h3>
            <div>
                <div className='random-products mb-3 pt-3 d-flex'>
                    <div className='w-50'>
                        <img src='images/watch.jpg' className='img-fluid' alt='watch' />
                    </div>
                    <div className='w-50'>
                        <h5>Kids headphones bulk 10 pack multi colored for students</h5>
                        <ReactStars count={5} size={24} activeColor='#ffd700' value={4} edit={false} />
                        <b>$100.00</b>
                    </div>
                </div>
                <div className='random-products pt-3 d-flex'>
                    <div className='w-50'>
                        <img src='images/laptop.jpg' className='img-fluid' alt='watch' />
                    </div>
                    <div className='w-50'>
                        <h5>Kids headphones bulk 10 pack multi colored for students</h5>
                        <ReactStars count={5} size={24} activeColor='#ffd700' value={4} edit={false} />
                        <b>$100.00</b>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RandomProduct
