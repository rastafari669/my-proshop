import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({product}) => {
    return (
        <Card style={{border:'1px solid black',boxShadow:'5px 10px 8px #888888'}} className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
            <div className='img-hover-zoom'>
            <Card.Img className='img-hover-zoom-img' src={product.image} variant='top'/>
            </div>
            </Link>

            <Card.Body>
            <Link to={`/product/${product._id}`}>
             <Card.Title as='div'>
                 <strong>{product.name}</strong>
            </Card.Title>
            </Link>
            <Card.Text as='div'>
             <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </Card.Text>
            <Card.Text as='h3'>
               ${product.price}
            </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
