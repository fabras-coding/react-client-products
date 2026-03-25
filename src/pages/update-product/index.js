import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import api from '../../services/api';
import brandImage from '../../assets/brand.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useModal } from '../../contexts/ModalContext';
import { fetchCategories } from '../../services/categories';

export default function UpdateProduct() {



    const { success, mError } = useModal();
    const isSubmitting = useRef(false);

    const navigate = useNavigate();
    const { productId } = useParams();
    const [id, setId] = useState(null);

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

    useEffect(() => {
        if (productId === '0') return;
        else loadProduct();

    }, productId);

    async function loadProduct() {
        try {
            const response = await api.get(`api/Products/${productId}`, authorization);

            setId(response.data.id);
            setProductName(response.data.name);
            setProductDescription(response.data.description);
            setPrice(response.data.price);
            setStock(response.data.stock);
            setCategoryId(response.data.categoryId);

        } catch (error) {
            mError('Failed to load product data. Please try again.');
            console.error(error);
            navigate('/products');
        }
    }


    async function saveOrUpdate(e) {
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

        try {

            data.id = id;
            const response = await api.put(`api/Products/${productId}`, data, authorization);

            if (response.status >= 200 && response.status < 300) {
                success('Product updated successfully!', () => {
                    navigate('/products');
                });
            }


        } catch (error) {

            mError('Error updating product, try again.');
            console.error(error);
        }
    }

    return (
        <div className="new-product-container">
            <div className="content">
                <section className="form">
                    <img src={brandImage} alt="Logo" />
                    <h1>{productId === '0' ? 'Add New Product' : 'Update Product'}</h1>
                    <p>Enter the product details.</p>
                    <Link className="back-link" to="/products">
                        <FiArrowLeft size={16} color="#5f37a4" />
                        Back to products

                    </Link>

                </section>
                <form onSubmit={saveOrUpdate}>
                    <input placeholder="Product Name" value={Name} onChange={e => setProductName(e.target.value)} />
                    <input placeholder="Product Description" value={Description} onChange={e => setProductDescription(e.target.value)} />
                    <input placeholder="Price" value={Price} onChange={e => setPrice(e.target.value)} />
                    <input placeholder="Stock" value={Stock} onChange={e => setStock(e.target.value)} />
                    <select placeholder="Select Category" value={CategoryId} onChange={e => setCategoryId(e.target.value)}>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <button className="button" type="submit">Update Product</button>
                </form>

            </div>
        </div>

    );
}