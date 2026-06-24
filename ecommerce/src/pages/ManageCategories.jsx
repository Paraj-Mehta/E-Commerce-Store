import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import axiosInstance from '../service/axiosInstance.js';

const ManageCategories = () => {
  const [category, setCategory] = useState([]);
  const [editId, setEditId] = useState("");
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    categoryName: "",
    image: null
  });

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/category/list-category");
      setCategory(response.data.category);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("categoryName", formData.categoryName); 
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (editId) {
        const response = await axiosInstance.put(`/category/edit-category/${editId}`, data);
        alert(response.data.message);
        setEditId("");
      } else {
        const response = await axiosInstance.post("/category/add-category", data);
        alert(response.data.message);
      }

      // Reset form
      setFormData({
        categoryName: "",
        image: null
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }

      fetchData();

    } catch (error) {
      alert("Error processing category");
      console.error("Error details:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/category/delete-category/${id}`);
      alert(response.data.message);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (categoryItem) => {
    setEditId(categoryItem._id);
    
    setFormData({
      categoryName: categoryItem.categoryName,
      image: null,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="container-fluid my-5">
        <h1>Manage Category</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <label>Category Name:</label>
          
          <input 
            className="form-control" 
            value={formData.categoryName} 
            type="text" 
            name="categoryName"
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} 
          />
          <br />

          <label>Image:</label>
          <input 
            className="form-control" 
            type="file" 
            name="image" 
            ref={fileInputRef}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.files[0] })} 
          />
          <br />

          <button className="btn btn-primary" type="submit">
            {editId ? "Update Category" : "Add Category"}
          </button>
        </form>

        <table className='table mt-5'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Category Name</th>
              <th scope='col'>Image</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {category.map((item, index) => {
              return (
                <tr key={item._id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{item.categoryName}</td>
                  <td>
                    <div style={{ width: '150px', height: '150px' }}>
                      {item.image && (
                         <img 
                           src={`${item.image}`} 
                           alt={item.categoryName}
                           className='w-100 h-100 object-fit-cover thumbnail' 
                         />
                      )}
                    </div>
                  </td>
                  <td>
                    <button className='btn btn-sm btn-warning me-2' onClick={() => handleEdit(item)}>Edit</button>
                    <button className='btn btn-sm btn-danger' onClick={() => handleDelete(item._id)}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ManageCategories;