import react from "react";
import { useState } from "react";
import { useStateValue } from "./StateProvider";
import './home.css'
import Product from './Product'
import Header from "./Header";
import Home from "./Home";
import './productData.css';

function ProductData() {


  const [{ productLists, maxQuantity, flag }, dispatch] = useStateValue('');

  const [formData, setFormData] = useState({
    description: '',
    id: '',
    rating: '',
    price: '',
    image: '',
    quantityLimit: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Form Data:', formData);
    dispatch({
      type: 'ADD_ITEM',
      item: {
        // id: formData.id,
        // title: formData.description,
        // price: formData.price,
        // image: formData.image,
        // rating: formData.rating,
        // maxQuantity:formData.quantityLimit
        id: formData.id,
        title: formData.description,
        price: Number(formData.price),
        image: formData.image,
        rating: Number(formData.rating), // 👈 convert to number
        maxQuantity: Number(formData.quantityLimit)
      },
    })
    //setSubmissionMessage(`Item Saved Successfully`);
    setFormData('');
  };

  return (
    <div className="Product_Adding">
      <h1>Become a Seller on shopify</h1>
      <h4>Add the item here to let users buy it </h4>
      <form className="Product_Form" onSubmit={handleSubmit}>
        <label>Id</label>
        <input type="number"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />
        <label>Decription</label>
        <input type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <label>Price</label>
        <input type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <label>Rating</label>
        <input type="number"
          name="rating"
          min="1" max="5"
          value={formData.rating}
          onChange={handleChange}
        />
        <label>Image</label>
        <input type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
        <label>Quantity Available</label>
        <input type="number"
          name="quantityLimit"
          min="1"
          value={formData.quantityLimit}
          onChange={handleChange}
        />

        <button className="Form_Button" type="submit">Submit</button>

      </form>

    </div>
  )
}

export default ProductData;
