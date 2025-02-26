import React, { useState, useEffect } from 'react';
import axios from './axiosConfig'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './UserManagement.css'; // Create a CSS file for styling

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('/api/users', newUser);
      console.log("User created:", response.data);
      fetchUsers();
      setNewUser({ name: '', email: '', password: '' });
      setErrors({}); // Clear errors on successful creation
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error creating user:', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleUpdateUser = async (user) => {
    try {
      const response = await axios.put(`/api/users/${user.id}`, user);
      console.log("User updated:", response.data);
      fetchUsers();
      setEditingUser(null);
      setErrors({}); // Clear errors on successful update
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error updating user:', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`/api/users/${userId}`);
      console.log("User deleted:", response.data);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="user-management">
      <h1>User Management</h1>
      <button onClick={() => navigate(-1)}>Back</button> {/* Add Back button */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => setEditingUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingUser ? (
        <div>
          <h2>Edit User</h2>
          <input
            type="text"
            value={editingUser.name}
            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <input
            type="email"
            value={editingUser.email}
            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <button onClick={() => handleUpdateUser(editingUser)}>Update</button>
        </div>
      ) : (
        <div>
          <h2>Create User</h2>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <button onClick={handleCreateUser}>Create</button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;