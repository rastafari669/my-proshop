import React, {useEffect} from 'react'
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {Row,Col,Container} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {listProducts} from '../actions/productActions'
import Paginate from '../components/Paginate'
import BestReviews from '../components/bestReviews/BestReviews'
import Map from '../components/map/Map'


const HomeScreen = ({match}) => {

  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const disaptch = useDispatch();

  const productsList = useSelector(state => state.productList);
  const {loading, error, products, page, pages} = productsList;

useEffect(() =>{
    disaptch(listProducts(keyword,pageNumber))
},[disaptch,keyword,pageNumber])



    return (
        <>
  
         <Container>
            <h1>Latest Products</h1>
            {
            loading ? 
            <Loader/> : 
            error ? 
            <Message variant='danger'>{error}</Message> :
            <>
            <Row>
                {products.map(product =>(
                    <Col key={product._id} sm={12} md={6} lg={4} exl={3}>
                    <Product product={product}/>
                    </Col>
                ))}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
            </>
            
            }
            </Container>
           
            <BestReviews/>
            
        </>
    )
}

export default HomeScreen
