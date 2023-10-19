import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import empty from '../images/empty.png'
import { useDispatch, useSelector } from 'react-redux';
import { getwish  ,removewish} from '../redux/action';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/Wishlist.css'

const Wishlist = () => {
  const {email} = useParams()
  document.title='Ecommerce | Wishlist'
  const[rimg , setRimg]=useState()
  const[rname , setRname]=useState()
  const[rprice , setRprice]= useState()
  const[roriginal , setRoriginal]=useState()
  const[rdiscount , setRdiscount] = useState()
  const[id , setId]=useState()
  const[pid , setPid]=useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const[remove , setRemove]=useState(false)
  const [wishdata, setWishdata] = useState([])
  const { isAuthenticated, user, loginWithRedirect } = useAuth0()
  const { wishlist, isloading, msg } = useSelector((state) => state.auth)
  useEffect(()=>{
    if(msg==='deleted'){
      let wish = wishlist.length-1
      dispatch(getwish(email))
      dispatch({
        type:'increasecount',
        payload:wish
      })
     
    }
  },[msg,email])
  // console.log(wishlist);
  useEffect(() => {
    if (wishlist) {
      setWishdata(wishlist)
    }
  }, [wishlist])
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getwish(email))
    }
    else {
      loginWithRedirect()
    }
  }, [dispatch, email])
  const removeproduct = ()=>{
      dispatch(removewish(id))
      document.getElementById(id).style.display='none'
      setRemove(false)
  }
  const openproduct =(img,name,price,original,discount, product , ids)=>{
       setRimg(img)
       setRname(name)
       setRprice(price)
       setRoriginal(original)
       setRdiscount(discount)
       setPid(product)
       setId(ids)
       setRemove(true)
  }
  if (isloading) {
    return <div className='loader'> <div className="innerloader"></div></div>
  }
  return (
    <>
     {wishdata.length===0?  <div className='emptywish'><img src={empty} alt="" /></div> : <div className="orderproduct">
        
           {wishdata.map((val) => {
            return (
              <div className='productcon' key={val._id} id={val._id} onClick={()=>openproduct(val.img, val.name , val.price , val.originalprice, val.discount , val.productid , val._id)}>
                <div className="imagecon">
                  <img src={val.img} alt="" />
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
      </div > }
    { remove && <div className="removeproduct">
        <div className="removeinner">
          <div className="topremove">
            <div className="leftreomove">
              <img src={rimg} alt="" />
            </div>
            <div className="rightremove">
              <div>
                {rname}
              </div>
              <div>
                ₹{rprice}  ({rdiscount}% OFF)
              </div>
            </div>
          </div>
          <div className="downremove">
             <button className="removeitem" onClick={removeproduct}>
               Remove
             </button>
             <button className='viewproduct' onClick={()=>navigate(`/product/${pid}`)}>
              View Product
             </button>
             <button className="closeproduct" onClick={()=>setRemove(false)}>
              Close
             </button>
          </div>
        </div>
      </div> }
    </>

  )
}

export default Wishlist
