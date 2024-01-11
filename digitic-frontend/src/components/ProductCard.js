import React from 'react';
import Card from './Card';

const ProductCard = (props) => {
    const { grid, data } = props;
    return (
        <>
            {data && data?.map((item, index) => <Card dataProduct={item} grid={grid} key={index} wishList={false} />)}
        </>
    )
}

export default ProductCard;
