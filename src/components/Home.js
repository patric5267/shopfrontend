import React, { useEffect, useState } from 'react'
import '../css/Home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { arr2, arr } from './arr2';
import gheart from '../images/gheart.png'
import rheart from '../images/rheart.png'
import premium from '../images/premium.png'
import secure from '../images/secure.png'
import seven from '../images/seven.png'
import visa from '../images/visa.png'
import upi from '../images/upi.png'
import cash from '../images/cash.png'
import tshirt from '../images/tshirt.jpg'
import master from '../images/master.png'
import kurta from '../images/kurta.jpg'
import p2 from '../images/p2.jpg'
import p3 from '../images/p3.jpg'
import p4 from '../images/p4.jpg'
import jacket from '../images/jacket.jpg'
import coords from '../images/coords.jpg'
import p1 from '../images/p1.jpg'
import map from '../images/map.jpg'
import gpay from '../images/gpay.png'
import shirt from '../images/shirt.jpg'
import insta from '../images/insta.png'
import pinterest from '../images/pinterest.png'
import facebook from '../images/facebook.png'
import { useDispatch, useSelector } from 'react-redux';
import { gettshirt } from '../redux/action';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  document.title='Ecommerce | Home'
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const[tshirt,setTshirt]=useState([])
  const { date, isloading } = useSelector((state) => state.auth)
  if (date) {
    // setTshirt(date)
  }
  const [mainarr, setMainarr] = useState([])

  useEffect(() => {

    // console.log(window.innerWidth);

    if (window.innerWidth >= 696) {
      setMainarr(arr2)
    }
    else {
      setMainarr(arr)
    }
  }, [])
  useEffect(() => {
    dispatch(gettshirt('tshirt'))
  }, [])

  return (
    <>
      <Carousel autoPlay={true} infiniteLoop={true} showStatus={false} showThumbs={false} showArrows={false} showIndicators={false}>
        {
          mainarr.map((val) => {
            return (
              <div className='homecon' key={val.img}>
                <img src={val.img} alt="" />
              </div>
            )
          })

        }
      </Carousel>
      <div className="stylecon">
        <div className="upcon">
          <div>
            <h2>Chill In Style</h2>
          </div>
          <div>
            <p>Breezy fits to keep your Comfortable & Trendy</p>
          </div>
          <div className='line'></div>
        </div>
        <div className="downcon">
          <div className="slide">
            <div className="leftimg">
              <img src="http://res.cloudinary.com/dw4wbtjju/image/upload/v1696857959/xbnk8sdeewhh7sg9o5df.webp" alt="" onClick={() => navigate('/tshirt')} />
            </div>
            <div className="rightimg">
              <img src="http://res.cloudinary.com/dw4wbtjju/image/upload/v1696858003/pku1kg09zrg10nk92ypx.webp" alt="" onClick={() => navigate('/shirt')} />
            </div>
          </div>
        </div>
      </div>
      <div className="explore">
        <div className="product">
          <div>
            <h2>Explore Products</h2>
          </div>
          <div className='line2'></div>
        </div>
        <div className="productlist">
          <div className='items'>
            <div className='itemscart' onClick={() => navigate('/tshirt')}>
              <div className="productimg">
                <img src={tshirt} alt="" />
              </div>
              <div className="productname">
                T-SHIRTS
              </div>
            </div>
            <div className='itemscart' onClick={() => navigate('/shirt')}>
              <div className="productimg">
                <img src={shirt} alt="" />
              </div>
              <div className="productname">
                SHIRTS
              </div>
            </div>
            <div className='itemscart' onClick={() => navigate('/jacket')}>
              <div className="productimg">
                <img src={jacket} alt="" />
              </div>
              <div className="productname">
                JACKETS
              </div>
            </div>
            <div className='itemscart' onClick={() => navigate('/coords')}>
              <div className="productimg">
                <img src={coords} alt="" />
              </div>
              <div className="productname">
                CO-ORDS
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="offerscon">
        <div className="offeritem">
          <div className="leftoffer">
            <img src="https://www.jiomart.com/images/cms/offers/1677598710_MobiKwik_910x380.jpg" alt="" />
          </div>
          <div className="rightoffer">
            <img src="https://cdn.grabon.in/gograbon/images/web-images/uploads/1618560404016/phonepe-offers.jpg" alt="" />
          </div>
        </div>
      </div>
      <div className="ourproducts">
        <div>
          <h2>Our Products</h2>
        </div>
        <div>
          <p>Be the first to wear trends in town</p>
        </div>
        <div className='productline'></div>
      </div>
      <div className="orderproduct">
        {
          date && date.map((val) => {
            return (
              <div className='productcon' key={val._id} onClick={() => navigate('/product', { state: { productid: val.productid } })}>
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
      <div className="viewbtn">
        <div className="overbtn">
          <div className="leftbtn">
            <p>VIEW ALL PRODUCTS</p>
          </div>
          <div className="rightbtn">
            <i className="fa-solid arrow fa-arrow-right" ></i>
          </div>
        </div>
      </div>
      <div className="express">
        <div className='heading'>
          <h2>Express Yourself in Style</h2>
        </div>
        <p>
          Unleash Your Creativity with Our Printed Shirts Collection
        </p>
        <div className='expressline'></div>
      </div>
      <div className="spotlight">
        <div className="spotimg" data-aos="zoom-in" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="true"
          data-aos-anchor-placement="top-center">
          <img src={kurta} alt="" />
        </div>
      </div>
      <div className="people">
        <div className="peoplebox">
          <h2>People with Us</h2>
          <p>Our Exclusive collection is loved & worn by men all over the country.</p>
          <div className="peopleline">

          </div>
        </div>
      </div>
      <div className="peoplegrp">
        <div className="peoplecon">
          <div>
            <img src={p1} alt="" />
          </div>
          <div>
            <img src={p2} alt="" />
          </div>
          <div>
            <img src={p3} alt="" />
          </div>
          <div>
            <img src={p4} alt="" />
          </div>
          <div>
            <img src="http://res.cloudinary.com/dw4wbtjju/image/upload/v1696091591/pgvoghrc7injswv6p1lu.webp" alt="" />
          </div>
          <div>
            <img src="http://res.cloudinary.com/dw4wbtjju/image/upload/v1696091643/guvwtvjf5cikty5pwuv6.webp" alt="" />
          </div>
        </div>
      </div>
      <div className="storecon">
        <div className="innercon"  data-aos="zoom-in"   data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="true"
          data-aos-anchor-placement="top-center"  >
          <img src={map} alt="" />
        </div>
      </div>
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

export default Home
