import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

const SpecialProduct = (props) => {

    const { id, title, brand, totalrating, price, sold, quantity } = props;

    return (
        <div className='col-4'>
            <div className='special-product-card'>
                <div className='d-flex justify-content-between'>
                    <div>
                        <img src='images/watch.jpg' className='img-fluid' alt='watch' />
                    </div>
                    <div className='special-product-content'>
                        <h6 className='brand'>{brand}</h6>
                        <h5 className='product-title'>
                            {title}
                        </h5>
                        <ReactStars count={5} size={24} activeColor='#ffd700' value={totalrating} edit={false} />
                        <p className='price'><span className='red-p'>${price}</span> &nbsp;</p>
                        <div className='discount-till d-flex align-items-center gap-10'>
                            <p className='mb-0'><b>5</b> days</p>
                            <div className='d-flex gap-10 align-items-center'>
                                <span className='badge rounded-circle p-4 bg-danger p-3'>1</span>:
                                <span className='badge rounded-circle p-4 bg-danger p-3'>1</span>:
                                <span className='badge rounded-circle p-4 bg-danger p-3'>1</span>
                            </div>
                        </div>
                        <div className='prod-count my-3'>
                            <p>Products: {quantity}</p>
                            <div className="progress">
                                <div className="progress-bar"
                                    role="progressbar"
                                    style={{ width: ((quantity / (sold + quantity)) * 100) + '%' }}
                                    aria-valuenow={(quantity / (sold + quantity)) * 100}
                                    aria-valuemin={quantity}
                                    aria-valuemax={sold + quantity}>

                                </div>
                            </div>
                        </div>
                        <Link className='button' to={'/product/' + id}>View</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecialProduct;
