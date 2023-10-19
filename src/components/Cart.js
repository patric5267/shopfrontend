import React, { useEffect, useState } from 'react'
import '../css/Cart.css'
import premium from '../images/premium.png'
import secure from '../images/secure.png'
import seven from '../images/seven.png'
import visa from '../images/visa.png'
import upi from '../images/upi.png'
import cash from '../images/cash.png'
import master from '../images/master.png'
import gpay from '../images/gpay.png'
import pinterest from '../images/pinterest.png'
import facebook from '../images/facebook.png'
import insta from '../images/insta.png'
import empty from '../images/empty.png'
import arrow2 from '../images/arrow2.png'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getcartitem, removecartitem  ,addminus , payment , addtowish} from '../redux/action'

const Cart = () => {
    document.title='Ecommerce | Cart'
    const {email} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [total, setTotal] = useState()
    const delievery = 100
    const checkout = total + delievery
    const { cartitem, msg, msgcart , paymentid} = useSelector((state) => state.auth)
    useEffect(()=>{
      if(paymentid){
        // console.log(paymentid);
          navigate(`/payment/${paymentid}`)
      }
    },[paymentid])
    useEffect(() => {
        if (cartitem) {
            let sum = 0
            let i;
            for (i = 0; i < cartitem.length; i++) {
                sum = sum + cartitem[i].price
            }
            setTotal(sum);
        }
    }, [cartitem])
    useEffect(() => {
        if (msg==='item deleted') {
            dispatch(getcartitem(email))
        }
    }, [msg])
    useEffect(() => {
        if (msgcart) {
            dispatch(getcartitem(email))
            dispatch({
                type:'clearmsgcart'
            })
        }
    }, [msgcart])
    useEffect(() => {
        if (email) {
            dispatch(getcartitem(email))
        }
        else{
            navigate('/')
        }
    }, [email])
    const updown = (id,quan , action,price,oldprice)=>{
        // console.log(id,quan , action,price,oldprice);
        if(action==='add'){
            // console.log('plus');
            let quant = quan + 1
            let mprice = price + oldprice
            dispatch(addminus({quant, mprice , id}))
        }
        else{
            if(quan!==1){
                let quant = quan - 1
                let mprice = price - oldprice
                dispatch(addminus({quant, mprice , id}))
            }
        }
    }
    
    return (
        <>
        { cartitem && cartitem.length===0? <div className='emptycart'><img src={empty} alt="" /></div> :   <div className='cartcon'>
                <div className="itemscon">
                    {cartitem && <div className="shoppingcart">
                        <div>{`Shopping Cart (${cartitem.length} items)`}</div>
                        <div className='pricename'>Total: ₹{total}.00</div>
                    </div>}
                    <div className="cartlist">
                        {cartitem && cartitem.map((val) => {
                            return (
                                <div className="caritem" key={val._id}>
                                    <div className="cartimg">
                                        <img src={val.image} alt="" />
                                    </div>
                                    <div className="cartdesc">
                                        <div className="topcart">
                                            <div className="namecartcon">
                                                <div>{val.name}</div>
                                                <div className='lapprice'>₹{val.price}</div>
                                            </div>
                                            <div className="colorcartcon">
                                                <div>{`Size ${val.size} ${val.productid}`}</div>
                                                {/* <div>{`₹${val.originalprice} (${val.discount}% off)`}</div> */}
                                            </div>
                                            <div className="quancartcon">
                                                <p>QTY</p>
                                                <div onClick={()=>updown(val._id ,  val.quantity , 'minus', val.price,val.oldp)}>-</div>
                                                <p>{val.quantity}</p>
                                                <div onClick={()=>updown(val._id ,  val.quantity , 'add', val.price,val.oldp)}>+</div>
                                            </div>
                                        </div>
                                        <div className="downcart">
                                            <div style={{ color: '#96999b' }} onClick={() => dispatch(removecartitem(val._id))}>REMOVE</div>
                                            <div style={{ color: '#ec293c' }} >MOVE TO WISHLIST</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <div className="carlistphone">
                        {cartitem && cartitem.map((val) => {
                            return (
                                <div className='innercart' key={val._id}>
                                    <div className="topcartphone">
                                        <div className="topcartimg">
                                            <img src={val.image} alt="" />
                                        </div>
                                        <div className="topcartdesc">
                                            <div id='prodo' style={{ fontWeight: '800' }}>{val.name}</div>
                                            <div style={{ position: 'relative' }} id='prodo'>{`₹${val.originalprice} (${val.discount}% off)`}</div>
                                            <div className='phonequan'>
                                                <p style={{ fontWeight: '800' }}>QTY</p>
                                                <div onClick={()=>updown(val._id ,  val.quantity , 'minus', val.price,val.oldp)}>-</div>
                                                <p>{val.quantity}</p>
                                                <div onClick={()=>updown(val._id ,  val.quantity , 'add', val.price,val.oldp)}>+</div>
                                            </div>
                                            <div className="percentquan">
                                                <div style={{ fontWeight: '800' }}>₹{val.price}</div>
                                                <div style={{ textDecoration: 'line-through' }}>₹{val.originalprice}</div>
                                                <div style={{ color: '#009662' }}>{`(${val.discount}% OFF)`}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="downcartphone">
                                        <div className="leftcartphone" onClick={() => dispatch(removecartitem(val._id))}>
                                            REMOVE
                                        </div>
                                        <div className="rightcartphone">
                                            MOVE TO WISHLIST
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
                <div className="pricecon">
                    <div className="priceinnerbox">
                        <div className="pheading">
                            Price Detail
                        </div>
                        <div className="priceinfo">
                            <div className="infobox">
                                <div className="firstbox">
                                    <div>
                                        <p>Total MRP</p>
                                        <p>₹{total}.00</p>
                                    </div>
                                    <div>
                                        <p>Delievery</p>
                                        <p>₹{delievery}.00</p>
                                    </div>
                                </div>
                                <div className="secondbox">
                                    <div className="line"></div>
                                    <div className='free'>
                                        <i className="fa-solid fa-truck"></i>
                                        <p> <em id='delievery'
                                        > Free Delivery </em>Shop for more ₹300.00</p>
                                    </div>
                                    <div className="line"></div>
                                </div>
                                <div className="coupan">
                                    <div className="coupanbox">
                                        <div className="leftcoupan">
                                            <i className="fa-solid fa-percent" ></i>
                                            <div>Apply Coupan</div>
                                        </div>
                                        <div className="rightcoupan">
                                            <img src={arrow2} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="totalamount">
                                    <div>Total Amount</div>
                                    <div>₹{checkout}.00</div>
                                </div>
                                <div className="checkoutbtn" onClick={()=>dispatch(payment({checkout , cartitem , email }))}>
                                    CHECKOUT
                                </div>
                                <div className="secondbox">
                                    <div className="line"></div>
                                    <div className='free'>
                                        <i className="fa-solid fa-circle-info"></i>
                                        <p> <em id='refund'
                                        > Shipping & Refund</em>Policy</p>
                                    </div>
                                    <div className="line"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> }

            <div className="benefits">
                <div className="benefitcon">
                    <div style={{ backgroundColor: 'white' }}>
                        <div className="leftcon">
                            <img src={premium} alt="" />
                        </div>
                        <div className="rightcon">
                            <div className="left">
                                <h2>Premium Quality Products</h2>
                            </div>
                            <div className="right">
                                <p>All the clothing products are made from 100% premium quality fabric.</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: 'white' }}>
                        <div className="leftcon">
                            <img src={secure} alt="" />
                        </div>
                        <div className="rightcon">
                            <div className="left">
                                <h2>Secure Payments</h2>
                            </div>
                            <div className="right">
                                <p>Highly Secured SSL-Protected Payment Gateway.</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: 'white' }}>
                        <div className="leftcon">
                            <img src={seven} alt="" />
                        </div>
                        <div className="rightcon">
                            <div className="left">
                                <h2>7 Days Return Policy</h2>
                            </div>
                            <div className="right">
                                <p>Return or exchange the orders within 7 days of delivery.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="offersection">
                <div className="inneroffer">
                    <div className="leftsection">
                        <h2>Get Coupons & Offers</h2>
                        <p>You may unsubscribe at any moment. For that purpose, please find our contact info in the legal notice.</p>
                    </div>
                    <div className="rightsection">
                        <div>
                            <input type="text" placeholder='Your email address' />
                            <button>Subscribe</button>
                        </div>
                        <p>* Don't worry we don't spam</p>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="innerfooter">
                    <div className='terms'>
                        <div className="topterm">
                            <h1>USEFUL LINKS</h1>
                        </div>
                        <div className="downterm">
                            <div className="leftterm">
                                <p>Careers</p>
                                <p>Returns , exchange & Refund</p>
                                <p>Terms & Conditions</p>
                                <p>Cancellation Policy</p>
                                <p>Our Fanworld</p>
                            </div>
                            <div className="rightterm">
                                <p>About Us</p>
                                <p>Shipping Policy</p>
                                <p>Privacy Policy</p>
                                <p>How to Order</p>
                                <p>Contact Us</p>
                            </div>
                        </div>
                    </div>
                    <div className='cate'>
                        <div className="topcate">
                            <h2>CATEGORIES</h2>
                        </div>
                        <div className="downcate">
                            <p>T-shirts</p>
                            <p>Shirts</p>
                            <p>Jackets</p>
                            <p>Co-ords</p>
                        </div>
                    </div>
                    <div className='mail'>
                        <div className='topmail'>
                            <h2>SUPPORT</h2>
                        </div>
                        <div className='downmail'>
                            <div className="topsupport">
                                <p>Mail</p>
                                <p>Support@abc.in</p>
                            </div>
                            <div className='downsupport'>
                                <p>Phone</p>
                                <p>65656575756</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lastfooter">
                <div className="payoption">
                    <div>
                        <p>100% Secure Payment</p>
                    </div>
                    <div className='paycon'>
                        <div className='payimg'><img src={master} alt="" /></div>
                        <div className='payimg'><img src={gpay} alt="" /></div>
                        <div className='payimg'><img src={upi} alt="" /></div>
                        <div className='payimg'><img src={visa} alt="" /></div>
                        <div className='payimg'><img src={cash} alt="" /></div>
                    </div>
                </div>
                <div className="social">
                    <div>
                        <p>Follow us:</p>
                    </div>
                    <div className='socialcon'>
                        <div className='socialimg'><img src={facebook} alt="" /></div>
                        <div className='socialimg'><img src={insta} alt="" /></div>
                        <div className='socialimg'><img src={pinterest} alt="" /></div>
                    </div>
                </div>
            </div>
            <div className="rights">
                <p>© 2023 www.abc.in. All rights reserved.</p>
            </div>
          {cartitem && cartitem.length===0? null :  <div className="stickyprice">
                <div className="leftstickyphone">
                    <p>Total Amount</p>
                    <p>₹{checkout}.00</p>
                </div>
                <div className="rightstickyphone">
                    <div className="checkphonebtn" onClick={()=>dispatch(payment({checkout , cartitem , email }))}>
                        CHECKOUT
                    </div>
                </div>
            </div> }
        </> 
    )
}

export default Cart
