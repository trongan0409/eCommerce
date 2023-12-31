import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import BlogCard from '../components/BlogCard';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllBlogs } from '../features/Blogs/BlogSlide';
import moment from 'moment';
import Categories from './Categories';

const Blogs = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        getBlogs();
    }, []);

    const getBlogs = () => {
        dispatch(getAllBlogs());
    }

    const blogState = useSelector((state) => state?.blog?.blog);

    return (
        <>
            <Meta title={'Blogs'} />
            <BreadCrumb title='Blogs' />
            <Container class1='blog-wrapper home-wrapper-2 py-5'>
                <div className='row'>
                    <div className='col-3'>
                        <Categories />
                    </div>
                    <div className='col-9'>
                        <div className='row'>
                            {blogState && blogState?.map((item, index) => {
                                return (
                                    <div className='col-6 mb-3' key={index}>
                                        <BlogCard id={item?._id} title={item?.title} description={item?.description} date={moment(item?.createdAt).format('MMMM Do YYYY, h:mm a')} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Blogs;