import React from 'react'
import '../css/payment.css'
import tick from '../images/tick.png'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Paymentpage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams()
  const homepage = ()=>{
     dispatch({
      type:'clearpayment'
     })
     navigate('/')
  }
  return (
    <div className='paymentcon'>
      <div className="paymentinner">
         <div className="orderplaced">
             <img src={tick} alt="" />
         </div>
         <div className='transactionid'>
           <h2>Order Placed</h2>
           <h3>Transaction Id -- #{id}</h3>
         </div>
         <div className="backbtn" onClick={homepage}>
             Continue Shopping
         </div>
      </div>
    </div>
  )
}

export default Paymentpage
