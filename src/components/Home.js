import React from 'react'
import './home.css'
import Product from './Product'

function Home() {
  return (
    <div className='home'>
      <div className='home_container'>
        <img 
           className='home_image' 
           src='/images/banner21.png' alt='home banner'
        />
        
        <div className='home_row'>
          <Product 
            id="495630040"
            title='Art Forms in Nature by Ernst Haeckel .The Kindle Edition' 
            price={1499} 
            image="https://m.media-amazon.com/images/I/81YJl7eRp+L._AC_UY327_FMwebp_QL65_.jpg" 
            rating={5}/>
          <Product 
            id="455630041"
            title='Amazon Echo Dot (5th Gen) | Smart speaker with Bigger sound, Motion Detection, Temperature Sensor, Alexa and Bluetooth|Blue' 
            price={5499}
            image="https://m.media-amazon.com/images/I/81lGxS2ZisL._AC_UY327_FMwebp_QL65_.jpg"
            rating={4} />
        </div>

        <div className='home_row'>
          
          <Product 
            id="23564982157"
            title='AKLAM Women Embroidery Lace & Sequence Embroidery Chiffon Saree'
            price={2149}
            image="https://m.media-amazon.com/images/I/71ENdVjP63L._SY550_.jpg"
            rating={3}/>
          <Product 
            id="23564982144"
            title='Apple iPad Air 11″ with M3 chip: Liquid Retina Display, 256GB, 12MP Camera — '
            price={67990}
            image="https://m.media-amazon.com/images/I/71jWCM3KVYL._SX425_.jpg"
            rating={5}/>
          <Product 
            id="23564982144"
            title='Venzina® Mens Lightweight Athletic Jacket Stylish Full Zip Hoodie , Waterproof'
            price={1999}
            image="https://m.media-amazon.com/images/I/51Ko2vfkW1L._AC_UL480_FMwebp_QL65_.jpg"
            rating={5}/>
        </div>

        <div className='home_row'>
          <Product 
            id="23564982145"
            title='American Tourister Liftoff+ with TSA Lock & 8 Wheel, 79 CM Large Hard PP Check-in Suitcase for Travel/Trolley Bag for Travel/Travel Bag with Double Wheel for Women & Men - Seafoam Blue'
            price={3799}
            image="https://m.media-amazon.com/images/I/41bAQ3Gg--L._AC_UL480_FMwebp_QL65_.jpg"
            rating={5}/>
          <Product 
            id="23564982167"
            title='ASICS Mens Gel-Contend B+ Lake Drive/Pure Silver Running Shoes - 6 UK (1011B140.403)'
            price={2149}
            image="https://m.media-amazon.com/images/G/31/img21/shoes/February/SS21/SPW/Iconic/5._SS400_QL85_.jpg"
            rating={4}/>
          
        </div>
        <div className='home_row'>
          <Product 
            id="4954386850"
            title='VW 101 cm (40 inches) Playwall Frameless Series Full HD Android Smart LED TV VW40F2 (Black)'
            price={11999}
            image="https://m.media-amazon.com/images/I/81kcbyP-SXL._AC_UY327_FMwebp_QL65_.jpg"
            rating={4}/>
        </div>

      </div>
    </div>
  )
}

export default Home
