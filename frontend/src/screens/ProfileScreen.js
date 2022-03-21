import React,{useState,useEffect} from 'react'
import {Form,Button,Row,Col,Table} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails, UpdateUserrProfile} from '../actions/userActions'
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstans'
import {listMyOrders} from '../actions/orderActions'
import axios from 'axios'

const ProfileScreen = ({history}) => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [image,setImage] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)
    const [uploading,setUploading] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading,error,user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderMyList = useSelector(state => state.orderMyList)
    const {loading:loadingOrders,error:errorOrders,orders} = orderMyList


    useEffect(() => {
       if (!userInfo) {
          history.push('/login') 
       }else{
          if (!user || !user.name || success) {
              dispatch({type: USER_UPDATE_PROFILE_RESET})
             dispatch(getUserDetails('profile')) 
             dispatch(listMyOrders())
          }else{
             setName(user.name)
             setEmail(user.email)
          }
       }
    }, [dispatch, history,userInfo,user,success])

    const submitHandler = (e) =>{
        e.preventDefault()
        //DISPATCH REGISTER
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        }else{
            //DISPATCH UPDATE PROFILE
            dispatch(UpdateUserrProfile({id: user._id,name,email,password,image}))
        }
        
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
        setUploading(true)
    
        try {
            const config ={
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
    
            const {data} = await axios.post('/api/upload',formData,config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error);
            setUploading(false)
        }
        }
    

    return <Row>
        <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                    type='name' 
                    placeholder='Enter Name' 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                    type='email' 
                    placeholder='Enter Email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Pssword</Form.Label>
                    <Form.Control 
                    type='password' 
                    placeholder='Enter Password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Pssword</Form.Label>
                    <Form.Control 
                    type='password' 
                    placeholder='Confirm Password' 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

    <Form.Group controlId='image'>
    <Form.Label>Image</Form.Label>
        <Form.Control 
        type='text' 
        placeholder='Enter image url' 
        value={image}
        onChange={(e) => setImage(e.target.value)}
        ></Form.Control>
        <Form.File 
        id='image-file' 
        label='Choose File'
        custom
        onChange={uploadFileHandler}
        ></Form.File>
        {uploading && <Loader/>}
    </Form.Group>

                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
        </Col>
        <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? <Loader/> : errorOrders ? <Message variant='danger'>{errorOrders}</Message>:
        <Table striped border hover responsive className='table-sm'>
            
            <thead>
                <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <tr key={order._id}>

                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0,10)}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.isPaid ? order.paidAt.substring(0,10):
                            (<i className='fas fa-times' style={{color: 'red'}}></i>)}
                        </td>
                        <td>{order.isDelivered ? order.deliveredAt.substring(0,10):
                            (<i className='fas fa-times' style={{color: 'red'}}></i>)}
                        </td>
                        <td>
                            <linkContainer to={`/order/${order._id}`}>
                            <Button className='btn-sm' variant='light'>Details</Button>
                            </linkContainer>
                        </td>
                    </tr>
                ))}
            </tbody>
            </Table>
            }
        </Col>

    </Row>
}

export default ProfileScreen

