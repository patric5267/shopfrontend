export const gettshirt = (category) => async (dispatch) => {
  try {
    dispatch({
      type: 'gettshirtpending'
    })
    const data = await fetch(`https://gentle-plum-wrap.cyclic.app/getproduct/${category}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
    const res = await data.json()
    if (res) {
      dispatch({
        type: 'gettshirtsucess',
        payload: res
      })
    }
  } catch (error) {
    dispatch({
      type: 'gettshirterror'
    })
  }
}


export const getitembycategory = (data2) => async (dispatch) => {
  try {
    // console.log(data2);
    const { category, colorcode, min, max, sizevalue, sort } = data2
    dispatch({
      type: 'gettshirtpending'
    })
    const data = await fetch('https://gentle-plum-wrap.cyclic.app/getitem', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        category, colorcode, min, max, sizevalue, sort
      })
    })
    const res = await data.json()
    if (res) {
      dispatch({
        type: 'gettshirtsucess',
        payload: res
      })
    }
  } catch (error) {
    dispatch({
      type: 'gettshirterror'
    })
  }
}

export const getitembyid = (productid) => async (dispatch) => {
  try {
    dispatch({
      type: 'getitempending'
    })
    const data = await fetch('https://gentle-plum-wrap.cyclic.app/getitembyproductid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productid
      })
    })
    const res = await data.json()
    if (res) {
      // console.log(res);
      dispatch({
        type: 'getitemsuccess',
        payload: res
      })
    }
  } catch (error) {
    dispatch({
      type: 'getitemerror'
    })
  }
}

export const signonoff = (data2) => async (dispatch) => {
  dispatch({
    type: "signonoff",
    payload: data2
  })
}


export const additem = (data2) => async (dispatch) => {
  try {
    dispatch({
      type: "additempending"
    })
    const { email, pname, img, price, original, discount, pid, size, quan, oldp } = data2
    const data = await fetch('https://gentle-plum-wrap.cyclic.app/additem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, pname, img, price, original, discount, pid, size, quan, oldp
      })
    })
    const res = await data.json()
    if (res) {
      // console.log(res);
      dispatch({
        type: "additemsuccess",
        payload: res.message
      })
    }
  } catch (error) {
    dispatch({
      type: 'additemerror'
    })
  }
}

export const msgnull = () => (dispatch) => {
  dispatch({
    type: 'clearmessage'
  })
}

export const getcartitem = (email) => async (dispatch) => {
  try {
    dispatch({
      type: 'getcartitempending'
    })
    const data = await fetch(`https://gentle-plum-wrap.cyclic.app/getcartitem/${email}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const res = await data.json()
    if (res) {
      // console.log(res);
      dispatch({
        type: 'getcartitemsuccess',
        payload: res
      })
    }
  } catch (error) {
    dispatch({
      type: 'getcartitemerror'
    })
  }
}

export const removecartitem = (id) => async (dispatch) => {
  try {
    const data = await fetch(`https://gentle-plum-wrap.cyclic.app/removecartitem/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const res = await data.json()
    if (res) {
      // console.log(res);
      dispatch({
        type: 'removeitemsuccess',
        payload: res.message
      })
    }
  } catch (error) {
    console.log(error);
  }
}

export const addminus = (data2) => async (dispatch) => {
  try {
    const { quant, mprice, id } = data2
    const data = await fetch('https://gentle-plum-wrap.cyclic.app/indec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quant, mprice, id
      })
    })
    const res = await data.json()
    if (res) {
      // console.log(res);
      dispatch({
        type: 'addminussuccess',
        payload: res.message
      })
    }
  } catch (error) {
    console.log(error);
  }
}

export const payment = (data2) => async (dispatch) => {
  try {
    const { checkout, cartitem, email } = data2
    const datap = await fetch('https://gentle-plum-wrap.cyclic.app/key', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const resp = await datap.json()
    if (resp) {
      // console.log(checkout);
      const data = await fetch(`https://gentle-plum-wrap.cyclic.app/price/${checkout}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const res = await data.json()
      if (res) {
        const options = {
          key: resp.key, // Enter the Key ID generated from the Dashboard
          amount: res.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Acme Corp", //your business name
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: res.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: async function (response) {
            const payment = response.razorpay_payment_id
            const order = response.razorpay_order_id
            const sign = response.razorpay_signature
            const datat = await fetch('https://gentle-plum-wrap.cyclic.app/payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                payment, order, sign
              })
            })
            const res = await datat.json()
            if (res.message === 'payment successful') {


              // console.log(res.paymentid);
              dispatch({
                type: 'paymentclearsuccess',
                payload: res.paymentid
              })
              const datar = await fetch('https://gentle-plum-wrap.cyclic.app/order', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  email, cartitem
                })
              })
              const resr = await datar.json()
              if (resr) {
                // console.log(resr);
              }
              // console.log(res);
            }
          },
          prefill: {
            "name": "Gaurav Kumar", //your customer's name
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000"
          },
          notes: {
            "address": "Razorpay Corporate Office"
          },
          theme: {
            "color": "#3399cc"
          }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
    }


  } catch (error) {
    console.log(error);
  }
}


export const getsearchitem = (search) => async (dispatch) => {
  try {
    dispatch({
      type: 'getsearchitempending'
    })
    const data = await fetch('https://gentle-plum-wrap.cyclic.app/getsearch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        search
      })
    })
    const res = await data.json()
    if (res) {
      // console.log(res);
      dispatch({
        type: 'getsearchitemsuccess',
        payload: res
      })
    }
  } catch (error) {
    dispatch({
      type: 'getsearchitemerror'
    })
  }
}


export const getorder = (email)=>async(dispatch)=>{
  try {
    dispatch({
      type:'getorderitempending'
    })
    const data = await fetch(`https://gentle-plum-wrap.cyclic.app/getorder/${email}`,{
      method:'GET',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      }
    })
    const res = await data.json()
    if(res){
      // console.log(res);
      dispatch({
        type:'getordersuccess',
        payload:res
      })
    }
  } catch (error) {
    dispatch({
      type:'getordererror'
    })
  }
}


export const addtowish = (data2)=>async(dispatch)=>{
  try {
    const{pname , pid , discount , original , price,img,email} = data2
    const data = await fetch('https://gentle-plum-wrap.cyclic.app/wish',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        pname , pid , discount , original , price,img,email
      })
    })
    const res = await data.json()
    if(res){
      // console.log(res);
      dispatch({
        type:'addtowishsuccess',
        payload:res.message
      })
    }
  } catch (error) {
    
  }
}

export const getwish = (email) => async (dispatch) => {
  try {
    // console.log(email);
    dispatch({
      type:'wishlistpending'
    })
    const data = await fetch(`https://gentle-plum-wrap.cyclic.app/getwish/${email}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const res = await data.json()
    if (res) {
      // console.log(res);
      dispatch({
        type:'wishlistsuccess',
        payload:res
      })
    }
  } catch (error) { 
       console.log(error);
  } 
}

export const getwishcount = (email) => async (dispatch) => {
  try {
   
    const data = await fetch(`https://gentle-plum-wrap.cyclic.app/getwishcount/${email}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const res = await data.json()
    if (res) {
      // console.log(res);
      dispatch({
        type:'wishcountsuccess',
        payload:res
      })
     
    }
  } catch (error) { 
       console.log(error);
  } 
}

export const removewish = (id)=>async(dispatch)=>{
   try {
     const data = await fetch(`https://gentle-plum-wrap.cyclic.app/removewish/${id}` , {
      method:'GET',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      }
     })
     const res =await data.json()
     if(res){
      dispatch({
        type:'removewishsucces',
        payload:res.message
      })
     }
   } catch (error) {
      console.log(error);
   }
}