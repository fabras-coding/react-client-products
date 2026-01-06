import React, {useState, useEffect} from "react";
import './styles.css';
import brandImage from '../../assets/brand.png';
import { Link , useNavigate} from 'react-router-dom';
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

export default function Products() {
    
    const[products, setProducts] = useState([]);

    const userName = localStorage.getItem('userName');
    const accessToken = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        api.get('api/Products', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }).then(response => {
            setProducts(response.data);
        }).catch(error => {
            console.error('Error fetching products:', error);
        });
    }, [accessToken]);

    async function deleteProduct(id) {
        try {
            const response = await api.delete(`api/Products/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            if(response.status >= 200 && response.status < 300)
            {
                alert('Product deleted successfully!');
                setProducts(products.filter(product => product.id !== id));
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    //no calls to /api/Logout implemented, so just clear local storage and navigate to home
    async function logout(){
        localStorage.clear();
        navigate('/');
    }

    
    return (
        <div className="products-container">
            <header>
                <img src={brandImage} alt="Logo" />
                <span> Welcome, <strong>{userName.toUpperCase()}</strong>!</span>
                <Link className="button" to="/products/new">Add New Product</Link>
                <button onClick={logout} type="button">
                    <FiPower size={18} color="#5f37a4" />
                </button>
            </header>

            <h1>Registered Products</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>

                    <strong>Product Name</strong>
                    <p>{product.name}</p>

                    <strong>Price:</strong>
                    <p>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}</p>

                    <strong>Description: </strong>
                    <p>{product.description}</p>

                    <strong>Category:</strong>
                    <p>{product.categoryId}</p>

                    <button type="button">
                        <FiEdit size={20} color="#5f37a4" />
                    </button>

                    <button onClick={() => deleteProduct(product.id)} type="button">
                        <FiTrash2 size={20} color="#a83232" />
                    </button>


                </li>
                    
                ))}
            </ul>

        </div>
    );
}