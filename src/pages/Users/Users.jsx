import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "./Users.css";

const Users = ({ url }) => {
  const [list, setList] = useState([]);
  const [editUser, setEditUser] = useState(null); // State for user being edited
  const [formData, setFormData] = useState({ name: "", password: "" }); // Form data for editing

  // Fetch all users
  const fetchUsers = async () => {
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

  // Start editing a user
  const startEditUser = (user) => {
    setEditUser(user._id);
    setFormData({ name: user.name, password: "" }); // Prefill name, leave password blank
  };

  // Save edited user
  const saveUser = async () => {
    try {
      const response = await axios.put(`${url}/api/user/update/${editUser}`, formData);
      if (response.data.success) {
        toast.success("User updated successfully");
        setEditUser(null);
        fetchUsers(); 
      } else {
        toast.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-container">
      {list.length > 0 ? (
        <table className="user-table table-bordered">
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
                <td>
                  {editUser === user._id ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>{user.email}</td>
                <td>
                  {editUser === user._id ? (
                    <>
                      <input
                        type="password"
                        placeholder="New Password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                      <button
                        className="user-save-btn"
                        onClick={saveUser}
                      >
                        Save
                      </button>
                      <button
                        className="user-cancel-btn"
                        onClick={() => setEditUser(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="user-edit-btn"
                        onClick={() => startEditUser(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="user-delete-btn"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="user-info">No users found</p>
      )}
    </div>
  );
};

export default Users;
