import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Edit = ({ url }) => {
  const { state } = useLocation();
  const { id } = useParams();
  const { item } = state; 
  const navigate = useNavigate();
  const [image, setImage] = useState(item.image); 
  const [data, setData] = useState({
    name: item.name,
    description: item.description,
    price: item.price,
    category: item.category,
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault(); 
    const formData = new FormData();
    formData.append("id", id); 
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    console.log(formData.get("id"),"11");
    
    if (image && typeof image !== 'string') {
      formData.append("image", image); 
    } else if (image && typeof image === 'string') {
      formData.append("image", image); 
    }
    try {
      const response = await axios.put(`${url}/api/food/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/list"); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating the food item");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={
                image && typeof image !== 'string' 
                  ? URL.createObjectURL(image)  
                  : `${url}/images/${item.image}`  
              }
              alt="Product"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])} 
            type="file"
            id="image"
            hidden
          />
        </div>
        <div className="add-product-name">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              name="category"
              value={data.category}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default Edit;
