import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './Users.css'
import Swal from "sweetalert2";


const Users = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/user/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  // Delete a user
  
  const deleteUser = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${url}/api/user/remove/${userId}`);
          if (response.data.success) {
            Swal.fire("Deleted!", "The user has been deleted.", "success");
            fetchUsers(); // Refresh user list
          } else {
            Swal.fire("Error", "Failed to delete the user.", "error");
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire("Error", "An error occurred while deleting the user.", "error");
        }
      }
    });
  };
  
  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  return (
    <div className="user-container">
      <h2>User Management</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : list.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default Users;
