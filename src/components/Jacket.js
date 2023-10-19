import React, { useEffect, useState } from 'react'
import '../css/tshirt.css'
import '../css/Home.css'
import arrow2 from '../images/arrow2.png'
import filter from '../images/filter.png'
import master from '../images/master.png'
import gpay from '../images/gpay.png'
import insta from '../images/insta.png'
import pinterest from '../images/pinterest.png'
import facebook from '../images/facebook.png'
import visa from '../images/visa.png'
import upi from '../images/upi.png'
import cash from '../images/cash.png'
import cross2 from '../images/cross2.png'
import sortimg from '../images/sortimg.png'
import { useDispatch, useSelector } from 'react-redux'
import { getitembycategory } from '../redux/action'
import { useNavigate } from 'react-router-dom'

const Jacket = () => {
  document.title='Ecommerce | Jackets'
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const { date, isloading } = useSelector((state) => state.auth)
  const[item,setItem]=useState([])
  useEffect(()=>{
     if(date){
      setItem(date)
     }
  },[date])
  // console.log(date);
  const [colorp, setColorp] = useState(false)
  const [rangep, setRangep] = useState(false)
  const [sizep, setSizep] = useState(false)
  const [color, setColor] = useState(false)
  const [range, setRange] = useState(false)
  const [size, setSize] = useState(false)
  const [min, setMin] = useState()
  const [max, setMax] = useState()
  const [sizevalue, setSizevalue] = useState()
  const [colorcode, setColorcode] = useState()
  const[sort,setSort]=useState(1)
  const checkapply = () => {
    if (colorp) {
      setColor(true)
    }
    if (rangep) {
      setRange(true)
    }
    if (sizep) {
      setSize(true)
    }
    const category = 'jacket'
    dispatch(getitembycategory({ min, max, sizevalue, colorcode, category }))
    document.getElementById('apply').style.display = 'none'
  }
  const coloronphone = (a) => {
    // console.log(a);
    setColorcode(a)
    setColorp(true)
  }
  const priceonphone = (b, c) => {
    setMin(b)
    setMax(c)
    setRangep(true)
  }
  const sizeonphone = (s) => {
    setSizevalue(s)
    setSizep(true)
  }
  const coloron = (a) => {
    // console.log(a);
    setColor(true)
    setColorcode(a)
  }
  const colornone = () => {
    setColorcode(null)
    // console.log('color');
    setColor(false)
    setColorp(false)
    setOpen(true)
  }
  const priceon = (b, c) => {
    setMin(b)
    setMax(c)
    setRange(true)

  }
  const pricenone = () => {
    setMin(null)
    setMax(null)
    setRange(false)
    setRangep(false)
    setOpen(true)
  }
  const sizeon = (size) => {
    setSizevalue(size)
    setSize(true)

  }
  const sizenone = () => {
    setSizevalue(null)
    setSize(false)
    setSizep(false)
    setOpen(true)
  }

  const allreset = () => {
    setColorcode(null)
    setMax(null)
    setMin(null)
    setSizevalue(null)
    setSize(false)
    setRange(false)
    setColor(false)
    setSizep(false)
    setRangep(false)
    setColorp(false)
  }
  const [state, setState] = useState(false)
  const [value, setValue] = useState('Rating: Low to High')
  const onoff = () => {
    if (state) {
      setState(false)
    }
    else {
      setState(true)
    }
  }
  const filteron = () => {
    document.getElementById('show').style.left = '0'
    document.body.style.overflow = 'hidden'
  }
  const closefilter = () => {
    document.getElementById('show').style.left = '-100%'
    document.body.style.overflow = 'scroll'
    document.body.style.overflowX = 'hidden'
  }
  const showfilter = () => {
    document.getElementById('filter').style.display = 'block'
    document.body.style.overflow = 'hidden'
  }
  const close = (b) => {
    const category='jacket'
    // console.log('dfdsfds');
    document.getElementById('filter').style.display = 'none'
    document.body.style.overflow = 'scroll'
    setSort(b)
    dispatch(getitembycategory({ min, max, sizevalue, colorcode, category ,sort}))
  }
  useEffect(() => {
    const category = 'jacket'
    if (window.innerWidth > 768) {
      dispatch(getitembycategory({ min, max, sizevalue, colorcode, category ,sort}))
    }
  }, [min, max, sizevalue, colorcode , sort])
  useEffect(() => {
    if (window.innerWidth <= 768) {
      const category = 'jacket'
      dispatch(getitembycategory({ min, max, sizevalue, colorcode, category ,sort}))
    }
  }, [])
  useEffect(() => {
    if (open) {
      const category = 'jacket'
      dispatch(getitembycategory({ min, max, sizevalue, colorcode, category ,sort}))
      setOpen(false)
    }
  }, [open])
  useEffect(() => {
    if (date) {
      document.body.style.overflowY = 'scroll'
    }
  }, [date])
  const definevalue = (a,b)=>{
    setValue(a)
    setSort(b)
  }
  if (isloading) {
    return <div className='loader'>
       <div className="innerloader">
          
       </div>
    </div>
  }
  return (
    <>
      <div className='maintshirt'>
        <div className="hometshirt">
          {date && <p>{`Home > T-shirts > ${date.length} products`}</p>}
        </div>
        <div className="seefilters">
          {color &&
            <div className='filtercolor allfilter'>
              <div style={{ backgroundColor: colorcode }}></div>
              <p>{colorcode}</p>
              <img src={cross2} alt="" onClick={colornone} />
            </div>}
          {range &&
            <div className='pricefilter allfilter'>
              <p>₹{min} - ₹{max}</p>
              <img src={cross2} alt="" onClick={pricenone} />
            </div>}
          {size &&
            <div className='sizefilter allfilter'>
              <p>{sizevalue}</p>
              <img src={cross2} alt="" onClick={sizenone} />
            </div>}
        </div>
        <div className="filtersection">
          <div className="innerfilter">
            <div className="leftfilter" onClick={filteron}>
              <img src={filter} alt="error" />
              <p>Filters</p>
            </div>
            <div className="rightfilter">
              <div className='heading'>Sort By:</div>
              <div className="parentsort">
                <div className='sort'>
                  <div className='first' style={{ backgroundColor: 'white' }}><p>{value}</p>
                    <img src={arrow2} alt="" onClick={onoff} />
                  </div>
                  {
                    state && <>
                      <div style={{ backgroundColor: 'white' }} onClick={() => definevalue('Rating: Low to High' , 3)}>Rating: Low to High</div>
                      <div style={{ backgroundColor: 'white' }} onClick={() => definevalue('Rating: High to Low',4)}>Rating: High to Low</div>
                      <div style={{ backgroundColor: 'white' }} onClick={() => definevalue('Price: High to low' , 2)}>Price: High to low</div>
                      <div style={{ backgroundColor: 'white' }} onClick={() => definevalue('Price: Low to High' ,1)}>Price: Low to High</div>
                    </>}
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="orderproduct">
          {
             item.length === 0 ? <h1>No item found</h1> : item.map((val) => {
              return (
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
        <form action="">
          <div className="sidefilter" id='show'>
            <div className="reset">
              <div className="leftreset">
                <input type="reset" onClick={allreset} />
              </div>
              <div className="rightreset" onClick={closefilter}>
                <img src={cross2} alt="" />
              </div>
            </div>
            <div className="colors">
              <div className="colorheading">
                COLOR
              </div>
              <div className='grpcon'>
                <div style={{ backgroundColor: 'black' }} onClick={() => coloron('Black')}></div>
                <div style={{ backgroundColor: 'green' }} onClick={() => coloron('Green')}></div>
                <div style={{ backgroundColor: 'purple' }} onClick={() => coloron('Purple')}></div>
                <div style={{ backgroundColor: 'yellow' }} onClick={() => coloron('Yellow')}></div>
                <div style={{ backgroundColor: 'brown' }} onClick={() => coloron('Brown')}></div>
                <div style={{ backgroundColor: 'blue' }} onClick={() => coloron('Blue')}></div>
                <div style={{ backgroundColor: 'white' }} onClick={() => coloron('White')}></div>
                <div style={{ backgroundColor: 'red' }} onClick={() => coloron('Red')}></div>
                <div style={{ backgroundColor: 'grey' }} onClick={() => coloron('Grey')}></div>
              </div>
            </div>
            <div className="price">
              <div className="topprice">
                <p className='p'>PRICE</p>
              </div>
              <div className="downprice">
                <div>
                  <input type="radio" name='price' onClick={() => priceon(0, 499)} />
                  <p>₹0.00 - ₹499.99</p>
                </div>
                <div> <input type="radio" name='price' onClick={() => priceon(500, 1499)} />
                  <p >₹500.00 - ₹1499.99</p></div>
                <div> <input type="radio" name='price' onClick={() => priceon(1599, 2000)} />
                  <p >₹1599.00 - ₹2000.99</p></div>
              </div>
            </div>
            <div className="size">
              <div className="topsize">
                <p className="psize">SIZE</p>
              </div>
              <div className="downsize">
                <div>
                  <input type="radio" name='size' onClick={() => sizeon('L')} />
                  <p>L</p>
                </div>
                <div><input type="radio" name='size' onClick={() => sizeon('S')} />
                  <p>S</p></div>
                <div><input type="radio" name='size' onClick={() => sizeon('M')} />
                  <p>M</p></div>
              </div>
            </div>
          </div>
        </form>
        <div className="stickyfilter">
          <div className="leftsticky">
            <img src={sortimg} alt=""  />
            <p onClick={showfilter}>SORT</p>
          </div>
          <div className="rightsticky">
            <img src={filter} alt="" />
            <p onClick={() => document.getElementById('apply').style.display = 'block'}>FILTER</p>
          </div>
        </div>
        <div className="sortingfilter" id='filter'>
          <div className="topfilter">
            Sort By
          </div>
          <div className="downfilter">
            <div onClick={()=>close(3)}>Rating: Low to High</div>
            <div onClick={()=>close(4)}>Rating: High to Low</div>
            <div onClick={()=>close(2)}>Price: High to low</div>
            <div onClick={()=>close(1)}>Price: Low to High</div>
          </div>
        </div>
      </div>
      <form>
        <div className="applyfilter" id='apply'>
          <div className="fcon">
            <div>FILTER</div>
            <input type="reset" onClick={allreset} />
          </div>
          <div className="applycolor">
            <div className="applycheading">
              COLOR
            </div>
            <div className="colorchart">
              <div style={{ backgroundColor: 'black' }} onClick={window.innerWidth <= 768 ? () => coloronphone('Black') : () => coloron('Black')}></div>
              <div style={{ backgroundColor: 'green' }} onClick={window.innerWidth <= 768 ? () => coloronphone('Green') : () => coloron('Green')}></div>
              <div style={{ backgroundColor: 'purple' }} onClick={window.innerWidth <= 768 ? () => coloronphone('Purple') : () => coloron('Purple')}></div>
              <div style={{ backgroundColor: 'yellow' }} onClick={window.innerWidth <= 768 ? () => coloronphone('Yellow') : () => coloron('Yellow')}></div>
              <div style={{ backgroundColor: 'brown' }} onClick={window.innerWidth <= 768 ? () => coloronphone('Brown') : () => coloron('Brown')}></div>
              <div style={{ backgroundColor: 'blue' }} onClick={window.innerWidth <= 768 ? () => coloronphone('Blue') : () => coloron('Blue')}></div>
              <div style={{ backgroundColor: 'white' }} onClick={window.innerWidth <= 768 ? () => coloronphone('White') : () => coloron('White')}></div>
              <div style={{ backgroundColor: 'red' }} onClick={window.innerWidth <= 768 ? () => coloronphone('Red') : () => coloron('Red')}></div>
              <div style={{ backgroundColor: 'grey' }} onClick={window.innerWidth <= 768 ? () => coloronphone('Grey') : () => coloron('Grey')}></div>
            </div>
          </div>
          <div className="applyprice">
            <div className="topapply">
              PRICE
            </div>
            <div className="downapply">
              <div>
                <input type="radio" name='price' onClick={window.innerWidth <= 768 ? () => priceonphone(0, 499) : () => priceon(0, 499)} />
                <p>₹0.00 - ₹499.99</p>
              </div>
              <div> <input type="radio" name='price' onClick={window.innerWidth <= 768 ? () => priceonphone(500, 1499) : () => priceon(500, 1499)} />
                <p >₹500.00 - ₹1499.99</p></div>
              <div> <input type="radio" name='price' onClick={window.innerWidth <= 768 ? () => priceonphone(1599, 2000) : () => priceon(1599, 2000)} />
                <p >₹1599.00 - ₹2000.99</p></div>
            </div>
          </div>
          <div className='applysize'>
            <div className="topapplysize">
              SIZE
            </div>
            <div className="downapplysize">
              <div>
                <input type="radio" name='size' onClick={window.innerWidth <= 768 ? () => sizeonphone('L') : () => sizeon('L')} />
                <p>L</p>
              </div>
              <div><input type="radio" name='size' onClick={window.innerWidth <= 768 ? () => sizeonphone('S') : () => sizeon('S')} />
                <p>S</p></div>
              <div><input type="radio" name='size' onClick={window.innerWidth <= 768 ? () => sizeonphone('M') : () => sizeon('M')} />
                <p>M</p></div>
            </div>
          </div>
          <div className="cancelapply">
            <div className="leftcancel">
              <p onClick={() => document.getElementById('apply').style.display = 'none'}>CANCEL</p>
            </div>
            <div className="rightcancel">
              <p onClick={checkapply}>APPLY</p>
            </div>
          </div>
        </div>
      </form >
    </>
  )
}

export default Jacket
