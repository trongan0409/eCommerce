import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard';
import Color from '../components/Color';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../features/products/ProductSlice';
import { useEffect } from 'react';
import SortOrder from './SortOrder';
import RandomProduct from './RandomProduct';
import ProductTag from './ProductTag';
import FilterBy from './FilterBy';
import Categories from './Categories';

const OurStore = () => {

    const [grid, setGrid] = useState(4);

    const productState = useSelector((state) => state.product.product);

    const dispatch = useDispatch();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        await dispatch(getAllProducts());
    }

    return (
        <>
            <Meta title={'Our Store'} />
            <BreadCrumb title='Our Store' />
            <Container class1='store-wrapper home-wrapper-2 py-5'>
                <div className='row'>
                    <div className='col-3'>
                        <Categories />
                        <FilterBy />
                        <ProductTag />
                        <RandomProduct />
                    </div>
                    <div className='col-9'>
                        <SortOrder setGrid={setGrid} />
                        <div className='products-list pb-5'>
                            <div className='d-flex gap-10 flex-wrap'>
                                <ProductCard data={productState} grid={grid} />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default OurStore;
