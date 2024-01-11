import React from 'react'
import { useSelector } from 'react-redux';
import Container from '../../components/Container';
import BlogCard from '../../components/BlogCard';
import moment from 'moment';

const Blogs = () => {
    const blogState = useSelector((state) => state?.blog?.blog);
    return (
        <Container class1='blog-wrapper py-5 home-wrapper-2'>
            <div className='row'>
                <div className='col-12'>
                    <h3 className='section-heading'>Our Latest Blogs</h3>
                </div>
                <div className='row'>
                    {blogState && blogState?.map((item, index) => {
                        return (
                            <div className='col-3' key={index}>
                                <BlogCard id={item?._id} title={item?.title} description={item?.description} date={moment(item?.createdAt).format('MMMM Do YYYY, h:mm a')} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </Container>
    )
}

export default Blogs
