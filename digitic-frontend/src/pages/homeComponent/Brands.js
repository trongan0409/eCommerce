import React from 'react'
import Container from '../../components/Container'
import Marquee from 'react-fast-marquee'

const Brands = () => {
    return (
        <Container class1='marquee-wrapper py-5'>
            <div className='row'>
                <div className='col-12'>
                    <div className='marquee-inner-wrapper bg-white card-wrapper'>
                        <Marquee className='d-flex'>
                            {Array.from({ length: 8 }).map((_, index) => <div className='mx-4 w-25'>
                                <img src={`/images/brand-0${index + 1}.png`} alt='brand' />
                            </div>)}
                        </Marquee>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Brands
