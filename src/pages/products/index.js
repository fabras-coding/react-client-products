import React from "react";
import './styles.css';
import brandImage from '../../assets/brand.png';
import { Link } from 'react-router-dom';
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi';

export default function Products() {
    return (
        <div className="products-container">
            <header>
                <img src={brandImage} alt="Logo" />
                <span> Welcome, <strong>Fulaninho</strong>!</span>
                <Link className="button" to="/products/new">Add New Product</Link>
                <button type="button">
                    <FiPower size={18} color="#5f37a4" />
                </button>
            </header>

            <h1>Registered Products</h1>
            <ul>
                <li>
                    <strong>Product Name</strong>
                    <p>Product Description</p>

                    <strong>Price:</strong>
                    <p>$100.00</p>

                    <strong>Description: </strong>
                    <p>This is a sample product.</p>

                    <strong>Category:</strong>
                    <p>Electronics</p>

                    <button type="button">
                        <FiEdit size={20} color="#5f37a4" />
                    </button>

                    <button type="button">
                        <FiTrash2 size={20} color="#a83232" />
                    </button>


                </li>



                 <li>
                    <strong>Product Name</strong>
                    <p>Product Description</p>

                    <strong>Price:</strong>
                    <p>$100.00</p>

                    <strong>Description: </strong>
                    <p>This is a sample product.</p>

                    <strong>Category:</strong>
                    <p>Electronics</p>

                    <button type="button">
                        <FiEdit size={20} color="#5f37a4" />
                    </button>

                    <button type="button">
                        <FiTrash2 size={20} color="#a83232" />
                    </button>


                </li>
                


                 <li>
                    <strong>Product Name</strong>
                    <p>Product Description</p>

                    <strong>Price:</strong>
                    <p>$100.00</p>

                    <strong>Description: </strong>
                    <p>This is a sample product.</p>

                    <strong>Category:</strong>
                    <p>Electronics</p>

                    <button type="button">
                        <FiEdit size={20} color="#5f37a4" />
                    </button>

                    <button type="button">
                        <FiTrash2 size={20} color="#a83232" />
                    </button>


                </li>
                


                 <li>
                    <strong>Product Name</strong>
                    <p>Product Description</p>

                    <strong>Price:</strong>
                    <p>$100.00</p>

                    <strong>Description: </strong>
                    <p>This is a sample product.</p>

                    <strong>Category:</strong>
                    <p>Electronics</p>

                    <button type="button">
                        <FiEdit size={20} color="#5f37a4" />
                    </button>

                    <button type="button">
                        <FiTrash2 size={20} color="#a83232" />
                    </button>


                </li>
            </ul>

        </div>
    );
}