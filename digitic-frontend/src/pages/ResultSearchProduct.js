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
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { Empty, Flex } from 'antd';

const ResultSearchProduct = () => {
    const { value: valueSearch } = useParams()

    const [productList, setProductList] = useState([]);
    const [productListState, setProductListState] = useState([]);
    const [grid, setGrid] = useState(4);

    const productState = useSelector((state) => state.product.product);

    const dispatch = useDispatch();

    useEffect(() => {
        if (productState && valueSearch) {
            const result = productState.filter(e => e.title.includes(valueSearch))
            setProductListState(result)
            setProductList(result)
        }
    }, [productState, valueSearch]);
    useEffect(() => {
        getProducts();
    }, []);

    const sortOrderProduct = React.useCallback((value) => {
        let sort_result
        switch (value) {
            case "title-ascending":
                sort_result = _.orderBy(productList, ['title'],
                    ['asc']);
                setProductListState(sort_result)
                break;
            case "title-descending":
                sort_result = _.orderBy(productList, ['title'],
                    ['desc']);
                setProductListState(sort_result)
                break;
            // case "best-selling":
            //     sort_result = _.orderBy(productList, ['createdAt'],
            //         ['desc']);
            //     setProductListState(sort_result)
            //     break;
            case "price-ascending":
                sort_result = _.orderBy(productList, ['price'],
                    ['asc']);
                setProductListState(sort_result)
                break;
            case "price-descending":
                sort_result = _.orderBy(productList, ['price'],
                    ['desc']);
                setProductListState(sort_result)
                break;
            default:
                setProductListState(productList);
        }
    }, [productList])

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
                        <SortOrder setGrid={setGrid} onOrderCallback={sortOrderProduct} />
                        <div className='products-list pb-5'>
                            <div className='d-flex gap-10 flex-wrap'>
                                {productList.length === 0 ?
                                    <Flex align='center' style={{ width: '100%' }} justify='center'>

                                        <Empty />
                                    </Flex>
                                    :
                                    <ProductCard data={productList} grid={grid} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default ResultSearchProduct;
