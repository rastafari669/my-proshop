import React from 'react'
import '../css/homeScreen.css'
import {Button} from 'react-bootstrap'


const ImageCover = ({history}) => {

  const clickHandler = () =>{
   history.push('/')
  }
    return (
        
      <div className='screen-shot'>
      <div className='inner-con'>
      <h1 style={{color:'white',fontWeight:'700'}}>Amazing Digital Products</h1>
      
      <Button onClick={clickHandler} type='btn' variant='outline-success'>Explore</Button>
     
      </div>
    </div>
        
    )
}

export default ImageCover
