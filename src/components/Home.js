import React from 'react'
import './home.css'
import Product from './Product'
import { useState } from 'react';
import { useStateValue } from './StateProvider';

function Home({ searchVal }) {

  const [{productLists},dispatch]=useStateValue('')


  // filter products based on search
  const filteredProducts = productLists.filter((product) =>
    product.title.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div className='home'>
      <div className='home_container'>
        <img
          className='home_image'
          src='/images/banner21.png' alt='home banner'
        />

        {/* <div className="home_row">
          {productList.map((item) => (
            <Product
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
              rating={item.rating}
            />
          ))}
        </div> */}
        
         <div className="home_row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div className='grid_gap'>
              <Product
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                rating={item.rating}
              />
              </div>
            ))
          ) : (
            <p style={{ padding: "20px" }}>No products found 😢</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
