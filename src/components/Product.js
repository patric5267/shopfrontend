import React, { useEffect, useState } from 'react'
import '../css/product.css'
import arrow2 from '../images/arrow2.png'
import pinterest from '../images/pinterest.png'
import facebook from '../images/facebook.png'
import insta from '../images/insta.png'
import wp from '../images/wp.png'
import premium from '../images/premium.png'
import secure from '../images/secure.png'
import seven from '../images/seven.png'
import visa from '../images/visa.png'
import upi from '../images/upi.png'
import cash from '../images/cash.png'
import master from '../images/master.png'
import gpay from '../images/gpay.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {  useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getitembyid  , gettshirt , signonoff , additem , addtowish , getwish} from '../redux/action'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
// import { Link } from 'react-router-dom'

const Product = () => {
    const {proid2} = useParams()
    const navigate = useNavigate()
    const[proid  , setProid]=useState(null)
    useEffect(()=>{
       if(proid2){
           setProid(proid2)
       }
       else{
           navigate('/')
       }
    },[proid2])
    useEffect(()=>{
        if(proid){
            dispatch(getitembyid(proid))
        }
    },[proid])
   const[selected , setSelected]=useState(0)
   const handleColor = (s,id)=>{
    // console.log(id);
       setSize(s)
       setSelected(id)
   }
    const[oldp , setOldp]=useState()
    const[email,setEmail]=useState()
    const { user, loginWithRedirect , isAuthenticated} = useAuth0();
    useEffect(()=>{
       if(user){
        setEmail(user.email)
       }
    },[user])
    const[pname , setPname]=useState()
    if(pname){
        document.title=`Ecommerce | ${pname}`
    }
    const[img , setImg]=useState()
    let[price,setPrice]=useState()
    const[original , setOriginal]=useState()
    const[discount , setDiscount]=useState()
    const[quan , setQuan]=useState(1)
    const[size , setSize]=useState()
    const[pid , setPid]=useState()
    const dispatch = useDispatch()
    const {isloadingitem , item , date , msg , wishlist} = useSelector((state)=>state.auth)
    useEffect(()=>{
        // console.log(msg);
      if(msg==='Product added to wishlist'){
        let wish = wishlist.length +1
            dispatch(getwish(user.email))
            dispatch({
                type:'increasecount',
                payload:wish
            })
      }
    },[msg, user])
   
    const[width,setWidth]=useState(0)
    const [desc, setDesc] = useState('none')
    const [pin, setPin] = useState('none')
    const showdesc = () => {
        if (desc === 'none') {
            setDesc('block')
            document.getElementById('descimg').style.transform = 'rotate(180deg)'
        }
        else {
            setDesc('none')
            document.getElementById('descimg').style.transform = 'rotate(0deg)'
        }
    }
    const showpin = () => {
        if (pin === 'none') {
            setPin('block')
            document.getElementById('descpin').style.transform = 'rotate(180deg)'
        }
        else {
            setPin('none')
            document.getElementById('descpin').style.transform = 'rotate(0deg)'
        }
    }
    useEffect(()=>{
       setWidth(window.innerWidth)
       document.body.style.overflowY='scroll'
    },[])
   
    useEffect(()=>{
      if(item){
        dispatch(gettshirt(item.category))
        setPname(item.name)
        setPid(item.productid)
        setPrice(item.price)
        setDiscount(item.discount)
        setOriginal(item.originalprice)
        setImg(item.mainimg)
        setOldp(item.price)
      }
    },[item])
    const addtocart =()=>{
        if(!user){
            loginWithRedirect()
        }
       else if(!size){
            dispatch(signonoff(true))
        }
        else{
            price = price*quan
            dispatch(additem({email,pname,img,price,original,discount,pid,size,quan,oldp}))
        }
    }
   
    if(isloadingitem){
        return <div className='loader'>
        <div className="innerloader">
           
        </div>
     </div>
    }
    return (
        <>
          {item &&  <div className="hometshirt">
                <p>{`Home > ${item.name}`}</p>
            </div> }
           {item && <div className='productovercon'>
                <div className="innerovercon">
                    <div className="overleft">
                       {width<=768?
                        <Carousel infiniteLoop={true} showStatus={false} showThumbs={false} showArrows={false} >
                            {item.images.map((val)=>{
                                return(
                                    <div key={val._id}><img src={val.img} alt="" /></div>
                                )
                                 
                            })}
                        </Carousel> : <> {item.images.map((val)=>{
                                return(
                                    <div key={val._id}><img src={val.img} alt="" /></div>
                                )
                                 
                            })}  </>}
                        
                    </div> 
                </div>
                <div className="overright">
                    <div className="title">
                        <p>{item.name}</p>
                    </div>
                    <div className="productid">
                        <p>#{item.productid}</p>
                    </div>
                    <div className="pricescon">
                        <p id='originalprice'>₹{item.price}</p>
                        <p style={{ textDecoration: 'line-through' }}>₹{item.originalprice}</p>
                        <p style={{ color: 'green' }}>{`(${item.discount}% OFF)`}</p>
                    </div>
                    <div className='creditcon'><p>or Pay <strong>₹300 now.</strong> Rest in <strong>0% interest EMIs </strong>
                        Credit card NOT required, Online approval in 2 minutes
                        <em> Flat 15% cashback up to ₹200.</em></p>
                    </div>
                    <div className="selectsize">
                        <p className="sheading">Select Size</p>
                        <div className='boxsize'>
                            {
                                item.size.map((val)=>{
                                    return(
                                        <button className='btnlink'  key={val._id} disabled={val.available? null : true}  style={val.available? {backgroundColor: val._id===selected? '#d63242' : 'transparent' , color:val._id===selected? 'white' : 'black'} : {color:'red'  }} onClick={()=>handleColor(val.size , val._id)}>
                                           {val.size}
                                        </button>
                                    )
                                })
                            }
                           
                        </div>
                    </div>
                    <div className="quantity">
                        <p className='sheading'>Quantity</p>
                        <div className="quanbutons">
                            <div className='btn' onClick={quan===1? null :()=> setQuan(quan-1)}>-</div>
                            <div style={{ border: '0' }} >{quan}</div>
                            <div className='btn' onClick={()=>setQuan(quan+1)}>+</div>
                        </div>
                    </div>
                    <div className="wishlist">
                        <div className="wishlistbtn" onClick={isAuthenticated?()=>dispatch(addtowish({pname , pid , discount , original , price , img,email})) : ()=>loginWithRedirect()}>
                            ADD TO WISHLIST
                        </div>
                        <div className="addbagbtn" onClick={addtocart}>
                            ADD TO BAG
                        </div>
                    </div>
                    <div className="detailbox">
                        <div className='productdescription'>
                            <div className='top'>
                                <h2>Product Details</h2>
                                <img src={arrow2} alt="" onClick={showdesc} id='descimg' />
                            </div>

                            <div className='opensection'>
                                <p style={{ display: desc }}>{item.description}</p>
                            </div>
                        </div>

                        <div className='productdescription pincode'>
                            <div className='top bot'>
                                <h2>Delievery & Return Information</h2>
                                <img src={arrow2} alt="" onClick={showpin} id='descpin' />
                            </div>

                            <div className='inputcheck'>
                                <div style={{ display: pin }}>
                                    <input type="text" placeholder='Enter Pincode' />
                                    <button>CHECK</button>
                                    <p>Please enter the PIN code to check cash/card delivery available.</p>
                                    <p>Return and Exchange will be available for 7 days from the date of order delivery.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="companylist">
                        <p>Share On</p>
                        <div className="sponserlist">
                            <img src={pinterest} alt="error" />
                            <img src={facebook} alt="error" />
                            <img src={wp} alt="error" />
                            <img src='https://www.svgrepo.com/show/144030/linkedin-square-logo.svg' alt="error" />
                        </div>
                    </div>
                </div>
            </div> }
            <div className="ourproducts">
                <div className='similar'>
                    <h2>Similar Products</h2>
                </div>
              
                <div className='productline'></div>
            </div>
            <div className="orderproduct">
                { date && date.map((val)=>{
                    return(
                        <div className='productcon' key={val._id} onClick={()=>navigate(`/product/${val.productid}`)}>
                    <div className="imagecon">
                        <img src={val.mainimg} alt="" />
                        <div className="heart">
                            <div className="tridev">
                                <p>NEW ARRIVAL</p>
                            </div>
                        </div>
                    </div>
                    <div className="desccon">
                        <div className="productimg2">
                            <p>{val.name}</p>
                        </div>
                        <div className="productdesc">
                            <div className="currentprice">
                                ₹{val.price}
                            </div>
                            <div className="originalprice">
                                ₹{val.originalprice}
                            </div>
                            <div className="oofer" style={{ color: 'green' }}>
                                {`(${val.discount}% OFF)`}
                            </div>
                        </div>
                    </div>
                </div> 
                    )
                })
               }
               
            </div >
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
           
        </>
    )
}

export default Product
