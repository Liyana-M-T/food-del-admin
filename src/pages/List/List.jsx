import React, { useState , useEffect } from 'react'
import './List.css'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from "sweetalert2";
import { CiCircleRemove } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";

const List = ({url}) => {

  const [list,setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    
    if(response.data.success) {
      setList(response.data.data)
    }
    else
    {
      toast.error("Error")
    }
  }

  const removeFood = async (foodId) => {

    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove this food item? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
          if (response.data.success) {
            toast.success(response.data.message);
            await fetchList(); 
          } else {
            toast.error("Error deleting food item");
          }
        } catch (error) {
          toast.error("An error occurred while deleting the food item");
        }
      }
    });
  };

  useEffect(() => {
   fetchList()
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
           <b>Image</b>
           <b>Name</b>
           <b>Category</b>
           <b>Price</b>
           <b>Action</b>
        </div>
        {list.map((item,index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>Rs.{item.price}</p>
              <p >
              <FaEdit className='edit-icons' onClick={() => navigate(`/edit/${item._id}`, { state: { item } })}/>
              <CiCircleRemove onClick={()=> removeFood(item._id)} className='edit-icons' /> 
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List;
