import React, { useEffect,useState,useCallback } from 'react'
import {Route} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch,useSelector} from 'react-redux';
import {Navbar,Nav,Container, NavDropdown} from 'react-bootstrap';
import {logout} from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = () => {
  const top = {backgroundColor: 'transparent'}
  const scrolled = {background: 'rgba(0,0,0,0.9)'}

     const dispatch = useDispatch()

     const[color,setColor] = useState(top)

     
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    const logoutHandler = () =>{
        dispatch(logout())
    }
   
    
    

    const handleScroll = useCallback(() => {
      if (window.pageYOffset > 0) {
        setColor({style: scrolled})
      }else{
        setColor({style:top})
      }
    }, [scrolled,top]);


    useEffect(() => {
     window.addEventListener('scroll',handleScroll)
     return () => {
      window.removeEventListener('scroll',handleScroll);
    }
    }, [handleScroll,scrolled,top])
    
   

     return (
        <header>
        <Navbar className='navbar' onScroll={handleScroll} style={color.style}  variant='dark' expand="lg" collapseOnSelect>
            <Container>
        <LinkContainer to='/'>
       <Navbar.Brand className='logo' >ProShop</Navbar.Brand>
       </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Route render={({history}) => <SearchBox history={history}/>}></Route>
    <Nav className="ml-auto">
      <LinkContainer to='/cart'>
      <Nav.Link ><i className='fas fa-shopping-cart'>({cartItems.length})</i>{' '}Cart</Nav.Link>
      </LinkContainer>
      {userInfo ? (
       <NavDropdown title={userInfo.name} id ='username'>
           <LinkContainer to='/profile'>
           <NavDropdown.Item>Profile</NavDropdown.Item>
           </LinkContainer>
           <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
       </NavDropdown>
      ):
        <LinkContainer to='/login'>
      <Nav.Link ><i className='fas fa-user'></i>{' '}Sign In</Nav.Link>
      </LinkContainer>
      }
      {userInfo && userInfo.isAdmin && (
        <NavDropdown title='Admin' id ='adminmenu'>
           <LinkContainer to='/admin/userlist'>
           <NavDropdown.Item>Users</NavDropdown.Item>
           </LinkContainer>
           <LinkContainer to='/admin/productlist'>
           <NavDropdown.Item>Products</NavDropdown.Item>
           </LinkContainer>
           <LinkContainer to='/admin/orderlist'>
           <NavDropdown.Item>Orders</NavDropdown.Item>
           </LinkContainer>
         
       </NavDropdown>
      ) }
      
      </Nav>
    
  </Navbar.Collapse>
  {userInfo &&<img style={{width:'60px',height:'60px',borderRadius:'50%',border:'1px solid white'}} src={userInfo && userInfo.image}></img>}
  </Container>
  
</Navbar>

        </header>
    )
}

export default Header
