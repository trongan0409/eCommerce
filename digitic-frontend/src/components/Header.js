import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getTokenFromLocalStorage } from '../utils/AxiosConfig';
import { getUserCart, logoutUser } from '../features/users/userSlide';
import { toast } from 'react-toastify';

const Header = () => {
    const navigate = useNavigate()
    const [total, setTotal] = useState(null);
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const cartState = useSelector(state => state?.auth?.cartProducts);


    const handleLogout = () => {
        dispatch(logoutUser())
        toast.info('User Logouted successfully!');
        setTimeout(() => {
            navigate('/login')
        }, 500)
    }
    useEffect(() => {
        let sum = 0;
        if (cartState !== null || typeof cartState !== 'undefined') {
            for (let index = 0; index < cartState?.length; index++) {
                sum = sum + (Number(cartState[index].quantity) * Number(cartState[index].price));
                setTotal(sum);
            }
        }
    }, [cartState])

    useEffect(() => {
        dispatch(getUserCart())
    }, [])

    const onSearchProduct = (value) => {
        navigate(`/product/search-result/${value}`)
    }


    return (
        <>
            <header className='header-top-strip py-3'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-6'>
                            <p className='text-white mb-0'>Free Shipping Over $100 & Free Returns</p>
                        </div>
                        <div className='col-6'>
                            <p className='text-end text-white mb-0'>Hotline: <a href='tel:+84 935379931'>+84 935379931</a></p>
                        </div>
                    </div>
                </div>
            </header>
            <header className='header-upper py-3'>
                <div className='container-xxl'>
                    <div className='row align-items-center'>
                        <div className='col-2'>
                            <h2>
                                <Link className='text-white'>Dev Corner</Link>
                            </h2>
                        </div>
                        <div className='col-5'>
                            <div className="input-group">
                                <input type="text"
                                    className="form-control py-2"
                                    placeholder="Search product here..."
                                    aria-label="Search product here..."
                                    aria-describedby="basic-addon2"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            onSearchProduct(e.target.value)

                                        }
                                    }}
                                />
                                <span className="input-group-text py-3" id="basic-addon2">
                                    <BsSearch className='fs-6' />
                                </span>
                            </div>
                        </div>
                        <div className='col-5'>
                            <div className='header-upper-links d-flex align-items-center justify-content-between'>
                                <div>
                                    <Link to='/compare-product' className='d-flex align-items-center gap-10 text-white'>
                                        <img src='../images/compare.svg' alt='compare' />
                                        <p className='bm-0 pt-3'>
                                            Compare <br /> Product
                                        </p>
                                    </Link>
                                </div>
                                <div>
                                    <Link to='/wishlist' className='d-flex align-items-center gap-10 text-white'>
                                        <img src='../images/wishlist.svg' alt='wishlist' />
                                        <p className='bm-0 pt-3'>
                                            Favourite <br /> Wishlist
                                        </p>
                                    </Link>
                                </div>
                                <div>
                                    {!user ?
                                        <Link to='/login' className='d-flex align-items-center gap-10 text-white'>
                                            <img src='../images/user.svg' alt='user' />
                                            <p className='bm-0 pt-3'>
                                                Login
                                            </p>
                                        </Link>
                                        :
                                        <div className='account d-flex align-items-center gap-10 text-white'>
                                            <img src='../images/user.svg' alt='user' />
                                            <div className='dropdown'>
                                                <div>
                                                    <p className='mt-3'>Account</p>
                                                    <div className='dropdown-content'>
                                                        <Link to='/purchase-order' className='content'>Purchase order</Link>
                                                        <Link className='content' onClick={handleLogout}>Logout</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div>
                                    <Link to='/cart' className='d-flex align-items-center gap-10 text-white'>
                                        <img src='../images/cart.svg' alt='cart' />
                                        <div className='d-flex flex-column gap-10'>
                                            <span className='badge bg-white text-dark mt-2'>{cartState ? cartState?.length : 0}</span>
                                            {/* <p className='bm-0'>$ {total ? total : 0}</p> */}
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <header className='header-bottom py-3'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='menu-bottom d-flex align-items-center gap-30'>
                                <div>
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex gap-15 align-items-center"
                                            type="button" id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            <img src='../images/menu.svg' alt='' />
                                            <span className='me-5 d-inline-block'>Shop Categories</span>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><Link className="dropdown-item text-white" to="#">Action</Link></li>
                                            <li><Link className="dropdown-item text-white" to="#">Another action</Link></li>
                                            <li><Link className="dropdown-item text-white" to="#">Something else here</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='menu-links'>
                                    <div className='d-flex align-items-center gap-15'>
                                        <NavLink to="/">Home</NavLink>
                                        <NavLink to="/product">Our store</NavLink>
                                        <NavLink to="/blogs">Blogs</NavLink>
                                        <NavLink to="/contact">Contact</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
