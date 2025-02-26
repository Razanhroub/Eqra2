import React, { useState, useEffect } from 'react';
import axios from './axiosConfig'; 
import NavBar from './NavBar'; 
import './UserManagement.css'; 

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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
      setErrors({});
      setShowModal(false); // Close the modal on successful creation
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error creating user:', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(`/api/users/${editingUser.id}`, editingUser);
      console.log("User updated:", response.data);
      fetchUsers();
      setEditingUser(null);
      setErrors({});
      setShowEditModal(false); // Close the modal on successful update
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
    <div>
      <NavBar /> 
      <div className="user-management">
        <div className="user-management-header">
          <h1>User Management</h1>
          <button onClick={() => setShowModal(true)} className="btn-create">Create User</button>
        </div>
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
                  <button onClick={() => { setEditingUser(user); setShowEditModal(true); }} style={{ marginRight: '10px' }}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)} style={{ marginRight: '10px' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
              <h2  style={{ color: 'black' }}>Create User</h2>
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
              <button onClick={handleCreateUser} className="btn" style={{ marginRight: '10px' }}>Create</button>
              <button onClick={() => setShowModal(false)} className="btn btn-cancel" style={{ marginRight: '10px' }}>Cancel</button>
            </div>
          </div>
        )}
        {showEditModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowEditModal(false)}>&times;</span>
              <h2 style={{ color: 'black' }}>Edit User</h2>
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
              <button onClick={handleUpdateUser} className="btn" style={{ marginRight: '10px' }}>Update</button>
              <button onClick={() => setShowEditModal(false)} className="btn btn-cancel" style={{ marginRight: '10px' }}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;