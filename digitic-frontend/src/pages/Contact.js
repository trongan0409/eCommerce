import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { AiOutlineHome, AiOutlineMail } from 'react-icons/ai';
import { BiPhoneCall, BiInfoCircle } from 'react-icons/bi';
import Container from '../components/Container';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createQuery } from '../features/contact/contactSlide';

const Contact = () => {

    const dispatch = useDispatch();

    let contactSchema = yup.object({
        name: yup.string().required('Name is required!'),
        email: yup.string().nullable().email().required('Email is required!'),
        mobile: yup.string().default('').nullable().required('Phone Number is required!'),
        comment: yup.string().default('').nullable().required('Comment is required!'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            mobile: '',
            comment: ''
        },
        validationSchema: contactSchema,
        onSubmit: values => {
            dispatch(createQuery(values));
        },
    });

    return (
        <>
            <Meta title={'Contact Us'} />
            <BreadCrumb title='Contact Us' />
            <Container class1='contact-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30685.806706705887!2d108.23022831359314!3d15.975687441933319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142108997dc971f%3A0x1295cb3d313469c9!2sVietnam%20-%20Korea%20University%20of%20Information%20and%20Communication%20Technology.!5e0!3m2!1sen!2s!4v1699887129789!5m2!1sen!2s"
                            className='border-0 w-100'
                            title='map'
                            width="600"
                            height="450"
                            allowFullScreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade">

                        </iframe>
                    </div>
                    <div className='col-12 mt-5'>
                        <div className='contact-inner-wrapper d-flex justify-content-between'>
                            <div>
                                <h3 className='contact-title mb-4'>Contact</h3>
                                <form action='' onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                                    <div>
                                        <input
                                            type='name'
                                            className='form-control'
                                            placeholder='Name'
                                            name='name'
                                            onChange={formik.handleChange('name')}
                                            onBlur={formik.handleBlur('name')}
                                            value={formik.values.name}
                                        ></input>
                                        <div className='errors'>
                                            {formik.touched.name && formik.errors.name}
                                        </div>
                                    </div>
                                    <div>
                                        <input
                                            type='email'
                                            className='form-control'
                                            placeholder='Email'
                                            name='email'
                                            onChange={formik.handleChange('email')}
                                            onBlur={formik.handleBlur('email')}
                                            value={formik.values.email}
                                        ></input>
                                    </div>
                                    <div className='errors'>
                                        {formik.touched.email && formik.errors.email}
                                    </div>
                                    <div>
                                        <input
                                            type='tel'
                                            className='form-control'
                                            placeholder='Phone number'
                                            name='mobile'
                                            onChange={formik.handleChange('mobile')}
                                            onBlur={formik.handleBlur('mobile')}
                                            value={formik.values.mobile}
                                        ></input>
                                    </div>
                                    <div className='errors'>
                                        {formik.touched.mobile && formik.errors.mobile}
                                    </div>
                                    <div>
                                        <textarea
                                            className='w-100 form-control'
                                            id='' cols='30' rows='4'
                                            placeholder='Comment'
                                            name='comment'
                                            onChange={formik.handleChange('comment')}
                                            onBlur={formik.handleBlur('comment')}
                                            value={formik.values.comment}
                                        ></textarea>
                                    </div>
                                    <div className='errors'>
                                        {formik.touched.comment && formik.errors.comment}
                                    </div>
                                    <div>
                                        <button className='button border-0'>Submit</button>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <h3 className='contact-title mb-4'>Get in touch with us</h3>
                                <div>
                                    <ul className='ps-0'>
                                        <li className='mb-3 d-flex - gap-15 align-items-center'>
                                            <AiOutlineHome className='fs-5' />
                                            <address className='mb-0'>Hoa Hai, Ngu Hanh Son, Da Nang</address>
                                        </li>
                                        <li className='mb-3 d-flex - gap-15 align-items-center'>
                                            <AiOutlineMail className='fs-5' />
                                            <a href='tel:+84 935379931'>+84 935379931</a>
                                        </li>
                                        <li className='mb-3 d-flex - gap-15 align-items-center'>
                                            <BiPhoneCall className='fs-5' />
                                            <a href='mailto:doanan114@gmail.com'>doanan114@gmail.com</a>
                                        </li>
                                        <li className='mb-3 d-flex - gap-15 align-items-center'>
                                            <BiInfoCircle className='fs-5' />
                                            <p className='mb-0'>Monday - Friday: 8 AM - 10 PM</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Contact;
