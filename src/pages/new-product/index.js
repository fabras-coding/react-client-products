import React from 'react';
import './styles.css';
import brandImage from '../../assets/brand.png';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function NewProduct() {
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
                <form>
                    <input placeholder="Product Name" />
                    <input placeholder="Product Description" />
                    <input placeholder="Price" />
                    <input placeholder="Category" />
                    
                    <button className="button" type="submit">Add Product</button>
                </form>

            </div>
        </div>

    );
}