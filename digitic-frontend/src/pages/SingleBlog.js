import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getABlog } from '../features/Blogs/BlogSlide';

const SingleBlog = () => {

    const dispatch = useDispatch();

    const location = useLocation();

    const getBlogId = location.pathname.split('/')[2];

    useEffect(() => {
        getBlog();
    }, []);

    const getBlog = () => {
        dispatch(getABlog(getBlogId));
    }

    const blogState = useSelector((state) => state?.blog?.singleBlog);

    return (
        <>
            <Meta title={blogState?.title} />
            <BreadCrumb title={blogState?.title} />
            <Container class1='blog-wrapper home-wrapper-2 py-5'>
                <div className='row'>
                    <div className='col-3'>
                        <div className='filter-card mb-3'>
                            <h3 className='filter-title'>
                                Shop By Categories
                            </h3>
                            <div>
                                <ul className='ps-0'>
                                    <li>Home</li>
                                    <li>Our Store</li>
                                    <li>Blogs</li>
                                    <li>Contact</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='col-9'>
                        <div className='single-blog-card'>
                            <Link to='/blogs' className='d-flex align-items-center gap-10'>
                                <HiOutlineArrowLeft className='fs-4' />
                                Go back to Blogs
                            </Link>
                            <h3 className='title'>{blogState?.title}</h3>
                            <img src='../images/blog-1.jpg' className='img-fluid w-60 my-4' alt='' />
                            <p dangerouslySetInnerHTML={{ __html: blogState?.description }}></p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default SingleBlog;
