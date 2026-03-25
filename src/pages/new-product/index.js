import React, { useRef, useState } from 'react';
import './styles.css';
import api from '../../services/api';
import brandImage from '../../assets/brand.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useModal } from '../../contexts/ModalContext';
import { fetchCategories } from '../../services/categories';

export default function NewProduct() {



    const { success, mError } = useModal();
    const isSubmitting = useRef(false);
    

    const navigate = useNavigate();

    const [Name, setProductName] = useState('');
    const [Description, setProductDescription] = useState('');
    const [Price, setPrice] = useState('');
    const [Stock, setStock] = useState('');
    const [CategoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);

    categories.length === 0 && fetchCategories().then(setCategories).catch(error => {
        console.error('Error fetching categories:', error);
        mError('Failed to fetch categories. Please try again.');
    });
    

    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    

    async function saveProduct(e) {
        e.preventDefault();

        if (isSubmitting.current) return;
        isSubmitting.current = true;

        const data = {
            Name,
            Description,
            Price,
            Stock,
            CategoryId,
            Image: ""

        }

        try {


            const response = await api.post('api/Products', data, authorization);

            if (response && response.status >= 200 && response.status < 300) {

                success('Product created successfully!', () => {
                    isSubmitting.current = false;
                    navigate('/products');
                });
                return;
            }
            isSubmitting.current = false;


            mError('Unexpected response from server.');


        } catch (error) {
            isSubmitting.current = false;

            // Axios error guard
            const isAxiosError = error && error.isAxiosError;

            // status (se existir)
            const status = isAxiosError ? error.response?.status : null;
            const serverMessage = isAxiosError ? error.response?.data : null;

            console.error('Full error object:', error);
            console.error('Axios response (if any):', error?.response);

            if (status === 401) {
                mError('Unauthorized. Please log in again.');
                navigate('/');
                return;
            }

            if (status === 400) {
                mError('Bad Request. Please check the entered data.');
                return;
            }

            // caso de erro de rede (sem resposta)
            if (isAxiosError && !error.response) {
                mError('Network error. Please check your connection and try again.');
                return;
            }

            // fallback genérico
            mError('Error creating new product, try again.');
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
                <form onSubmit={saveProduct}>
                    <input placeholder="Product Name" value={Name} onChange={e => setProductName(e.target.value)} />
                    <input placeholder="Product Description" value={Description} onChange={e => setProductDescription(e.target.value)} />
                    <input placeholder="Price" value={Price} onChange={e => setPrice(e.target.value)} />
                    <input placeholder="Stock" value={Stock} onChange={e => setStock(e.target.value)} />
                    {/* <input placeholder="Category" value={CategoryId} onChange={e => setCategoryId(e.target.value)} /> */}
                    <select placeholder="Select Category" value={CategoryId} onChange={e => setCategoryId(e.target.value)}>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <button className="button" type="submit" disabled={isSubmitting.current} aria-busy={isSubmitting.current}>{isSubmitting.current ? 'Adding...' : 'Add Product'}</button>
                </form>

            </div>
        </div>

    );
}