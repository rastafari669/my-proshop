import React,{useEffect} from 'react'
import './BestReviews.css'
import {bestReviewstDetails} from '../../actions/reviewAction'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../Loader'
import {Row,Col, Card,Container} from 'react-bootstrap'
import Rating from '../Rating'



const BesttReviews = () => {
    const dispatch = useDispatch()

    const bestReviews = useSelector(state => state.bestReviews)
    const {loading,error,best} = bestReviews
    console.log(best);

    useEffect(() => {
        dispatch(bestReviewstDetails())
    }, [dispatch])

    return (

      <>
      <div className='section-reviews'>
            <div className="bg-video">
                <video  className='video-content' autoPlay muted loop>
                    <source src='images/planet.mp4' type='video/mp4'></source>
                    Tour browser is not supported
                </video>
            </div>
            <h2 className='title-reviews'>Best Reviews</h2>
            <Row>
                {loading ? <Loader/> :
                best.map(review =>(
                    <Col sm={12} md={6} lg={3} exl={4}>
                  <Card style={{border:'1px solid black'}} className='my-3 p-3 rounded'>
<div className='review-con'>
     
                  <Card.Img className='img-review' src={review.image} variant='top'/>
                  
                  <Card.Body>
            
             <Card.Title as='div'>
                 <strong>{review.name}</strong>
            </Card.Title>
           
            <Card.Text as='div'>
             <Rating color={'green'} value={review.rating}/>
            </Card.Text>
            <Card.Text style={{fontSize:'1rem'}} as='h3'>
              &quot;{review.review}&quot;
            </Card.Text>
            </Card.Body>
    </div>
                  </Card>
                   
                    </Col>
                ))
                
                }
            </Row>
            </div>
            
           
          
        
        </>
    )
}

export default BesttReviews
