import React,{useState, useEffect} from 'react'
import {listTopProducts} from '../actions/productActions'
import {useDispatch,useSelector} from 'react-redux';
import {FaArrowAltCircleRight,FaArrowAltCircleLeft} from 'react-icons/fa'
import { Link } from 'react-router-dom';

const Carusal = () => {

const dispatch = useDispatch()

const productTopRated = useSelector(state => state.productTopRated)

 const {products} =  productTopRated

 const [current,setCurrnet] = useState(0)
 const length = products.length

    useEffect(() => {
       dispatch(listTopProducts())
    }, [dispatch])

    const prevSlider = () =>{
       setCurrnet(current === 0 ? length - 1 : current - 1)
    }

    const nextSlider = () =>{
        setCurrnet(current === length - 1 ? 0 : current + 1)
    }
    return (
        <>
        <h1>Top Rated Products</h1>
        <section className='slider'>
            <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlider}/>
            <FaArrowAltCircleRight className='right-arrow' onClick={nextSlider}/>

            {products.map((slide,index) => {
              return(
                  <div  className={index === current ? 'slide active': 'slide'} key={index}>
                      {index === current &&
                       <Link to={`/product/${slide._id}`}>
                       
                        <img className='img-item'  src={slide.image} alt='slide.name'></img>
                           
                      </Link>  
                      }
       
                  </div>
              ) 
                
            })}
        </section>
        </>
    )
}

export default Carusal
