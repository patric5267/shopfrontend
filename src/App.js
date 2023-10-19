import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Shirt from "./components/Shirt";
import Tshirt from "./components/Tshirt";
import Jacket from "./components/Jacket";
import Coords from "./components/Coords";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Paymentpage from "./components/Paymentpage";
import Order from "./components/Order";
import Wishlist from "./components/Wishlist";
import Errorpage from "./components/Errorpage";
import { BrowserRouter as Router , Routes , Route  } from "react-router-dom";

function App() {
  return (
   <Router>
    <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/shirt' element={<Shirt/>}/>
      <Route path='/tshirt' element={<Tshirt/>}/>
      <Route path='/jacket' element={<Jacket/>}/>
      <Route path='/coords' element={<Coords/>}/>
      <Route path='/product/:proid2' element={<Product/>}/>
      <Route path='/cart/:email' element={<Cart/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/payment/:id' element={<Paymentpage/>}/>
      <Route path='/order/:email' element={<Order/>}/>
      <Route path='/wishlist/:email' element={<Wishlist/>}/>
      <Route path='*' element={<Errorpage/>}/>
     </Routes>
   </Router>
  );
}

export default App;
