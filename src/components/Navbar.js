import React, { useEffect, useState } from 'react'
import '../css/Navbar.css'
import cart from '../images/cart.png'
import search from '../images/search.png'
import heart from '../images/heart.png'
import fashion from '../images/fashion.png'
import cross2 from '../images/cross2.png'
import drop from '../images/drop.png'
import inputsearch from '../images/inputsearch.png'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux'
import { signonoff, msgnull, getcartitem ,getsearchitem , getwish ,getwishcount} from '../redux/action'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const style1 = {
    fontWeight:'800',
    color:'#dc3545'
  }
  const style2 = {
    fontWeight:'800',
    color:'black'
  }
  const[lift , setLift]=useState('-100%')
  const[ts , setTs]=useState({color:'green'})
  const[ss , setSs]=useState({color:'green'})
  const[js , setJs]=useState({color:'green'})
  const[cs , setCs]=useState({color:'green'})
  const location = useLocation()
  useEffect(()=>{
     if(location.pathname==='/tshirt'){
      setTs(style1)
      setJs(style2)
      setCs(style2)
      setSs(style2)
     }
     else if(location.pathname==='/shirt'){
      setTs(style2)
      setJs(style2)
      setCs(style2)
      setSs(style1)
     }
     else if(location.pathname==='/jacket'){
      setTs(style2)
      setJs(style1)
      setCs(style2)
      setSs(style2)
     }
     else if(location.pathname==='/coords'){
      setTs(style2)
      setJs(style2)
      setCs(style1)
      setSs(style2)
     }
     else{
      setTs(style2)
      setJs(style2)
      setCs(style2)
      setSs(style2)
     }
  },[location.pathname])
  const dispatch = useDispatch()
  const[searchbar ,setSearchbar]=useState(false)
  const[search2 , setSearch2]=useState(null)
  const[searcharray , setSearcharray]=useState([])
  const { status, msg, cartitem ,searchitem , wishcount } = useSelector((state) => state.auth)
  
  useEffect(()=>{
    if(searchitem){
      setSearcharray(searchitem)
    }
  },[searchitem])
  useEffect(()=>{
     if(search){
         dispatch(getsearchitem(search2))
     }
  },[search2])
  useEffect(() => {
    if (cartitem) {
      // console.log(cartitem);
    }
  }, [cartitem])
  const [size, setSize] = useState(false)
  useEffect(() => {
    if (status) {
      setSize(status)
    }
    else {
      setSize(status)
    }
  })
  const navigate = useNavigate()
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  useEffect(() => {
    if (user) {
      dispatch(getcartitem(user.email))
      dispatch(getwish(user.email))
    }
  }, [user])
  useEffect(()=>{
     if(user){
       dispatch(getwishcount(user.email))
     }
  },[user,dispatch])
  // console.log(user, isAuthenticated);
  const page = (a) => {
    if (a === '/order' || a==='/wishlist') {
      if (isAuthenticated) {
        document.getElementById('drop').style.left = '-100%'
        navigate(`${a}/${user.email}`)
      }
      else {
        loginWithRedirect()
      }
    }
    else {
      navigate(a)
      document.getElementById('drop').style.left = '-100%'
    }

  }
  const checkuserstatus = (a) => {
    if (isAuthenticated) {
      document.getElementById('drop').style.left = '-100%'
      navigate(`${a}/${user.email}`)
    }
    else {
      loginWithRedirect()
    }
  }
  useEffect(() => {
    if (msg) {
      dispatch(getcartitem(user.email))
    }
  }, [msg])
  const checkdrop = () => {
    if (isAuthenticated) {
      // document.getElementById('bigdrop').style.left = '0'
      setLift('0')
    }
    else {
      loginWithRedirect()
    }
  }
  const logoutdes = () => {
    logout()
    // localStorage.removeItem('email')
    document.getElementById('bigdrop').style.left = '-100%'
  }
  const pages = (a) => {
     if(a==='/order'){
      navigate(`${a}/${user.email}`)
      if(lift==='0'){
        setLift('-100%')
      }
     }
     else{
      if(lift==='0'){
        setLift('-100%')
        navigate(a)
      }
      else{
        navigate(a)
      }
     }
    
  }
  const phonelogout = () => {
    document.getElementById('drop').style.left = '-100%'
    logout()
    // localStorage.removeItem('email')
  }
  const closesearchbar = ()=>{
    setSearchbar(false)
    setSearcharray([])
    document.body.style.overflow='scroll'
  }
  const gotocart = (pid)=>{
     setSearchbar(false)
     document.getElementById('drop').style.left = '-100%'
     navigate(`/product/${pid}`)
  }
  const settingsearch =()=>{
    setSearchbar(true)
    document.body.style.overflow='hidden'
  }
  return (
    <>
      <div className='navcon'>
        
        <div className="navleft">
          <div className='logoheading'>
            <div className="logoimg">
              <img src={drop} alt="" onClick={checkdrop} />
            </div>
            <div className="heading">
              <div onClick={() => navigate('/')}>
                <h2>CHANEL</h2>
                <p>Mens's Clothing</p>
              </div>
            </div>
          </div>
          <div className="logoheading2">
            <div className="drop2img">
              <img src={drop} alt="" onClick={() => document.getElementById('drop').style.left = '0'} />
            </div>
            <div className="head2img">
              <img src={fashion} alt="" />
            </div>
          </div>
        </div>
       
        {isAuthenticated && <div className="bigdrop" id='bigdrop' style={{left:lift}}>
          <div className="bigcross">
            <img src={cross2} alt="" onClick={() =>  setLift('-100%')} />
          </div>
          <div className="biginner">
            <img src={user.picture} alt="" />
            <div><h2>{user.email}</h2></div>
            <div className="orders" onClick={()=>pages('/order')}>
              My Orders
            </div>
            <div className="orders" onClick={logoutdes}>
              Logout
            </div>
          </div>
        </div>}
      
        <div className="navright">
          <div className="itemslist">
            <div onClick={() => pages('/tshirt')} style={ts}>T-SHIRTS</div>
            <div onClick={() => pages('/shirt')} style={ss}>SHIRTS</div>
            <div onClick={() => pages('/jacket')} style={js}>JACKETS</div>
            <div onClick={() => pages('/coords')} style={cs}>CO-ORDS</div>
          </div>
          <div className="searchbox">
            <img src='https://cdn-icons-png.flaticon.com/512/7828/7828884.png' alt="" onClick={settingsearch}/>

          </div>
          <div className="favourite cart" onClick={()=>checkuserstatus('/wishlist')}>
            <img src={heart} alt="" />
            {wishcount!==0 && <div className='count'>
              {wishcount}
            </div>}
          </div>
          <div className="cart" onClick={()=>checkuserstatus('/cart')} >
            <img src={cart} alt="" />
            {cartitem && <div className='count'>
              {cartitem.length}
            </div>}
          </div>
        </div>
       {searchbar && <div className="searchboxs">
            <div className="topbox">
               <div className='imgsearch'>
                <img src={inputsearch} alt="" />
               </div>
               <div className='searchinput'>
                <input type="text"  placeholder='Search for a product' onChange={(e)=>setSearch2(e.target.value)}/>
               </div>
               <div className='imgsearchcross'>
                <img src={cross2} alt="" onClick={closesearchbar}/>
               </div>
            </div>
           <div className="downbox" >
           { searcharray.length===0? null :  <div className="downinner">
             { searcharray.map((val)=>{
              return(
                <div className="inneritem" key={val._id} onClick={()=>gotocart(val.productid)}>
                <div className="itemimg">
                  <img src={val.mainimg} alt="error" />
                </div>
                <div className="inneritemdesc">
                   <div className="innername">
                    {val.name}
                   </div>
                   <div className="innername">
                    Color : {val.color}
                   </div>
                   <div className="innername">
                    ₹{val.price}
                   </div>
                </div>
               </div>
              )
             }) }
             </div> }
           </div>
        </div>  }
        {size && <div className="sizebox" >
          <div className="innersize" data-aos="zoom-in">
            <div className="crosssize">
              <img src={cross2} alt="" onClick={() => dispatch(signonoff(false))} />
            </div>
            <div className="infosize">
              <i className="fa-solid fa-circle-info"></i>
              <p>Select size to proceed</p>
            </div>
          </div>
        </div>}
        {msg && <div className="sizebox" >
          <div className="innersize" data-aos="zoom-in">
            <div className="crosssize">
              <img src={cross2} alt="" onClick={() => dispatch({type:'clearmessage'})} />
            </div>
            <div className="infosize">
              <p>{msg}</p>
            </div>
          </div>
        </div>}
      </div>
      <div className="dropdown" id='drop'>
        <div className="shopcross">
          <div className='shopheading'>Shop For</div>
          <div className='crossimg'>
            <div className="backimg">
              <img src={cross2} alt="" onClick={() => document.getElementById('drop').style.left = '-100%'} />
            </div>
          </div>
        </div>
        <div className="dropitems">
          <div onClick={() => page('/')}>Home</div>
          <div onClick={() => page('/tshirt')}>T-SHIRTS</div>
          <div onClick={() => page('/shirt')}>SHIRTS</div>
          <div onClick={() => page('/jacket')}>JACKETS</div>
          <div onClick={() => page('/coords')}>CO-ORDS</div>
          <div onClick={() => page('/order')}>My Orders</div>
        {wishcount!==0 &&  <div onClick={() => page('/wishlist')}>{`Wishlist (${wishcount})`}</div> }
          <div onClick={phonelogout}>Logout</div>
        </div>
      </div>
    
    </>
  )
}

export default Navbar
