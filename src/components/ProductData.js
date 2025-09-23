import react from "react";
import { useState } from "react";
import { useStateValue } from "./StateProvider";
import './home.css'
import Product from './Product'
import Header from "./Header";
import Home from "./Home";
import './productData.css';

function ProductData() {


  const [{ productLists }, dispatch] = useStateValue('');

  const [submissionMessage, setSubmissionMessage] = useState('');

  // const [description, setdescription] = useState('');
  // const [id, setid] = useState('');
  // const [rating, setrating] = useState('');
  // const [price, setprice] = useState('');

  const [formData, setFormData] = useState({
    description: '',
    id: '',
    rating: '',
    price: '',
    image:'',
    //quantityLimit:''
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
        id: formData.id,
        title: formData.description,
        image: formData.image,
        price: formData.price,
        rating: formData.rating,
        //quantityLimit:formData.quantityLimit
      },
    })
    setSubmissionMessage(`Item Saved Successfully`);
    setFormData('');
  };

  // const addItem = () => {
  //   //dispatching the item into the data layer
  //   dispatch({
  //     type: 'ADD_ITEM',
  //     item: {
  //       id: formData.id,
  //       title: formData.description,
  //       image: formData.image,
  //       price: formData.price,
  //       rating: formData.rating,
  //     },
  //   })
  // }

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
          // value={description} // Binds the input's value to the state variable
          // onChange={(e) => {
          //   setdescription(e.target.value); // Updates the state with the new input value
          //   console.log(e.target.value); // Logs the current input value to the console
          // }}>

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
        <input type="text"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
        <label>Image</label>
        <input type="text"
           name="image"
           value={formData.image}
           onChange={handleChange}
        ></input>
        {/* <label>Quantity Available</label> */}
        {/* <input type="number" 
           name="quantityLimit"
           min="1"
           value={formData.quantityLimit}
           onChange={handleChange}
        /> */}

        <button className="Form_Button" type="submit">Submit</button>
       
      </form>
      
    </div>
  )
}

export default ProductData;
