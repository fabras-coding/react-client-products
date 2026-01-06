import React, { useState } from 'react';
import './styles.css';
import api from '../../services/api';
import brandImage from '../../assets/brand.png';
import { Link,useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function NewProduct() {
    
    const navigate = useNavigate();

    const [Name, setProductName] = useState('');
    const [Description, setProductDescription] = useState('');
    const [Price, setPrice] = useState('');
    const [Stock, setStock] = useState('');
    const [CategoryId, setCategoryId] = useState('');
    
    async function createNewProduct(e) {
        e.preventDefault();
        const data = {
            Name,
            Description,
            Price,
            Stock,
            CategoryId,
            Image: ""

        }

        console.log(data);

        const token = localStorage.getItem('token');
        try {
            const response = await api.post('api/Products', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if(response.status >= 200 && response.status < 300)
            {
                alert('Product created successfully!');
                navigate('/products');
            }

        } catch (error) {
            alert('Error creating new product, try again.');
            console.error(error);
        }
    }

    return (
        <div className="new-product-container">
            <div className="content">
                <section className="form">
                    <img src={brandImage} alt="Logo" />
                    <h1>Add New Product</h1>
                    <p>Enter the product details.</p>
                    <Link className="back-link" to="/products">
                        <FiArrowLeft size={16} color="#5f37a4" />
                        Back to products
                    
                    </Link>

                </section>
                <form onSubmit={createNewProduct}>
                    <input placeholder="Product Name" value={Name} onChange={e=> setProductName(e.target.value)} />
                    <input placeholder="Product Description" value={Description} onChange={e =>setProductDescription(e.target.value)}  />
                    <input placeholder="Price" value={Price} onChange={e => setPrice(e.target.value)} />
                    <input placeholder="Stock" value={Stock} onChange={e => setStock(e.target.value)} />
                    <input placeholder="Category" value={CategoryId} onChange={e => setCategoryId(e.target.value)} />

                    <button className="button" type="submit">Add Product</button>
                </form>

            </div>
        </div>

    );
}