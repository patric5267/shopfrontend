import React, { useEffect, useState } from 'react'
import '../css/Order.css'
import { useDispatch, useSelector } from 'react-redux'
import { getorder } from '../redux/action'
import noorder from '../images/noorder.png'
import { useParams } from 'react-router-dom'

const Order = () => {
  const {email} = useParams()
  const dispatch = useDispatch()
  const [orderdata, setOrderdata] = useState([])
  const { orderitem, isloading } = useSelector((state) => state.auth)
  useEffect(() => {
    if (orderitem) {
      setOrderdata(orderitem)
    }
  }, [orderitem])
  useEffect(() => {
    // const email = localStorage.getItem('email')
    if (email) {
      dispatch(getorder(email))
    }
  }, [dispatch , email])
  if (isloading) {
    return <div className='loader'><div className='innerloader'></div></div>
  }
  return (
    <div className='ordercon'>
      {orderdata.length === 0 ? <div className='noorder'><img src={noorder} alt="" /></div> : orderdata.map((val) => {
        return (
          <div className="orderitems" key={val._id}>
            <div className="leftorderitem">
              <img src={val.img} alt="" />
            </div>
            <div className="rightorderitem">
              <div>
                {val.name}
              </div>
              <div>
                Size : {val.size}
              </div>
              <div>
                Order Placed On : {val.date}/{val.month}/{val.year}
              </div>
              <div>
                Delivering on Monday 24
              </div>
            </div>
          </div>
        )
      })}


    </div>
  )
}

export default Order
