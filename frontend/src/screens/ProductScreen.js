import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { Row,Col,Image,ListGroup,Card,Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import {listProductDetails,createProductReview} from '../actions/productActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants'


const ProductScreen = ({match,history}) => {

 const [qty,setQty] = useState(1);
 const [rating,setRating] = useState(0);
 const [comment,setComment] = useState('');
 const [flag,setFlag] = useState(false);

 const dispatch = useDispatch()  
 
 const productDetails = useSelector(state => state.productDetails)
 const {loading,error,product} = productDetails

 const userLogin = useSelector(state => state.userLogin)
 const {userInfo} = userLogin

 const productReviewCreate = useSelector(state => state.productReviewCreate)
 const {success: successProductReview ,error: errorProductReview} = productReviewCreate
 


    useEffect(() =>{
        if (successProductReview) {
            alert('Review Submitted')
            setComment('')
            setRating(0)
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
      dispatch(listProductDetails(match.params.id))
    },[dispatch,match,successProductReview])
   
    const addToCartHandler = () =>{
      history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) =>{
     e.preventDefault()
     dispatch(createProductReview(match.params.id,{
         rating,
         comment
     } ))
}
    
    return (
        <div>
            <Link className='btn btn-light my-3' to='/'>
            Go Back
            </Link>
            {
                loading ?
                 <Loader/> : 
                 error ?
                <Message variant='danger'>{error}</Message> :
                <>
            <Row>
                <Col md={6}>
                <div className='img-hover-zoom'>
                <Image className='img-hover-zoom-img' style={{border: '1px solid black'}} src={product.image} alt={product.name} fluid/>
                </div>
                </Col>
                <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating 
                        value={product.rating} 
                        text={`${product.numReviews} reviews`}/>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price: ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description: ${product.description}
                    </ListGroup.Item>
                </ListGroup>
                </Col>
                <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>

                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Price:
                            </Col>
                            <Col>
                            <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Status:
                            </Col>
                            <Col>
                            {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col>Quantity</Col>
                                <Col>
                                <Form.Control as='select' value={qty} onChange={(e)=> 
                                    setQty(e.target.value)}>
                                    
                                     {[...Array(product.countInStock).keys()].map(x => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))} 
                                </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                        <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock === 0}>
                          Add to Cart
                        </Button>
                    </ListGroup.Item>
                    </ListGroup>
                </Card>
                </Col>
            </Row> 
            <Row>
                <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                
                   {product.reviews.length > 0 ? <div className='review-container'>
                    {product.reviews.map(review =>(
                        
                            <ListGroup.Item  key={review._id}>
                            <Row>
                            <Col md={3}>
                            <p style={{fontWeight:'bold'}}>{review.name}</p>
                            <img className='img-hover-zoom-img' style={{width:'70px',borderRadius:'50%',border:'1px solid black'}} src={review.image} alt={review.name}></img>
                            </Col>
                            <Col md={6}>
                            <p>{review.comment}</p>
                            <Rating value={review.rating}/>
                            <p>{review.createdAt.substring(0,10)}</p>
                            </Col>
                            
                            </Row>
                         </ListGroup.Item>
                         ))}
                        </div>: null}
                     </Col>
                    <Col style={{marginTop:'50px'}} md={6}>
                    <ListGroup.Item>
                        
                        <h2>Write a customer review {' '}{userInfo && <Button type='button' onClick={() => setFlag(!flag)}><i className='fas fa-plus'></i></Button>}</h2>
                        
                    
                        {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                        {
                          userInfo && flag ?
                         (
                             <Form onSubmit={submitHandler}>
                                 <Form.Group controlId='rating'>
                                     <Form.Label>Rating</Form.Label>
                                     <Form.Control 
                                     as='select' 
                                     value={rating} 
                                     onChange={(e) => setRating(e.target.value)}>
                                     <option value="">Select...</option>
                                     <option value="1">1 - Poor</option>
                                     <option value="2">2 - Fair</option>
                                     <option value="3">3 - Good</option>
                                     <option value="4">4 - very Good</option>
                                     <option value="5">5 - Excellent</option>
                                     </Form.Control>
                                 </Form.Group>
                                 <Form.Group controlId='comment'>
                                     <Form.Label>Comment</Form.Label>
                                     <Form.Control
                                      as='textarea'
                                      row='3' 
                                      value={comment}
                                      onChange={(e) => setComment(e.target.value)}
                                      > 
                                      </Form.Control>
                                 </Form.Group>
                                 <Button type='submit' variant='primary'>
                                   Submit
                                 </Button>
                             </Form>
                             ) : !userInfo && (!flag || flag) ?
                          <Message>Please <Link to='/login'>Sign In</Link> to write a review </Message>
                          : null}
                    </ListGroup.Item>
                
                </Col>
            </Row>
            </>
            } 
           
        </div>
    )
}

export default ProductScreen
