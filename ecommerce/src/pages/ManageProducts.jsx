import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import axiosInstance from '../service/axiosInstance.js';


const ManageProducts = () => {
  
  const fetchData = async () => {
    try {
      const respose = await axiosInstance.get("/products/list-products")
      
      // console.log(respose.data.products);
      setProducts(respose.data.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  const fetchCategory = async () => {
    try {
      const response = await axiosInstance.get("/category/list-category");
      setCategory(response.data.category);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  // fetch product list
  useEffect(() => {
    
    fetchData();
    
  }, []);
  
  // fetch category details 
  useEffect(() => {
    fetchCategory();
  }, []);
  

  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);

  // useRef to handle image field in the form
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categories:"",
    price: 0,
    image: null
  });

  const [editId, setEditId] = useState();


const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    
    // One final safety check before appending to FormData
    const categoryToSave = typeof formData.categories === 'object' 
        ? formData.categories._id 
        : formData.categories;
        
    data.append("categories", categoryToSave);
    data.append("price", formData.price);
    
    if (formData.image) {
       data.append("image", formData.image);
    }

    try {
      if (editId) {
        const response = await axiosInstance.put(`/products/edit-product/${editId}`, data);
        alert(response.data.message);
        setEditId("");
      } else {
        const response = await axiosInstance.post("/products/add-product", data);
        alert(response.data.message);
      }

      setFormData({
        name: "",
        description: "",
        categories: "",
        price: 0,
        image: null
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }

      fetchData();

    } catch (error) {
      alert("Error processing product");
      console.error("Error:", error);
    }
  };
  

  const handleDelete = async (id) => {
    try {

      const respose = await axiosInstance.delete(`/products/delete-product/${id}`)

      alert(respose.data.message);

      fetchData();


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleEdit = (product) => {

    setEditId(product._id);
    let categoryId = "";
    if (product.categories) {
       categoryId = typeof product.categories === 'object' ? product.categories._id : product.categories;
    }

    setFormData({
      name: product.productName,
      image: null,
      categories : categoryId,
      description: product.description,
      price: product.price
    })

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }


  }


  return (
    <>
      <div className="container-fluid my-5">
        <h1>Manage Products</h1>
        <br />
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <label>
            Product Name:
          </label>
          <input className="form-control" value={formData.name} type="text" name="name"
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />

          <br />

          {/* Select Category */}
          <label>Selete Category</label>
          <select className='form-control' 
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} 
          name='categories'
          value={formData.categories}>
            <option>Select Category</option>

            {
              category?.map((item)=>(
                <option value={item?._id} key={item?._id}> {item?.categoryName}</option>
              ))
            }

          </select>

          <br />

          {/* product Image */}
          <label>            
            Image:
          </label>
          <input className="form-control" type="file" name="image" ref={fileInputRef}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.files[0] })} />

          <br />

          {/* Product Description */}
          <label>
            Product Description:
          </label>
          <textarea className="form-control" name="description" value={formData.description}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />

          <br />

          {/* Product Price */}
          <label>
            Price:
          </label>
          <input className="form-control" type="number" name="price" value={formData.price}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
          <br />

          <button className="btn btn-primary" type="submit">{editId ? "Update product" : "Add product"}</button>
        </form>



        <table className='table mt-5'>

          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Product Name</th>
              <th scope='col'>Image</th>
              <th scope='col'>Category</th>
              <th scope='col'>Description</th>
              <th scope='col'>Price</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {
              products?.map((product, index) => {
                return (
                  <tr key={product?._id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{product?.productName}</td>
                    <td>
                      <div style={{ width: '150px', height: '150px' }}>
                        <img src={`${product?.image}`} alt={product?.name}
                          className='w-100 h-100 object-fit-cover thumbnail' />
                      </div>
                    </td>
                    <td>{product?.categories.categoryName}</td>
                    <td>{product?.description}</td>
                    <td>{product?.price}</td>

                    <td>
                      <button className='btn btn me-2 sm btn-warning' onClick={() => handleEdit(product)}>Edit</button>
                      <button className='btn btn sm btn-danger' onClick={() => handleDelete(product?._id)}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>


        </table>

      </div>

    </>
  )
}

export default ManageProducts