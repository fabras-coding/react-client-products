import React, { useState, useEffect, useMemo } from "react";
import './styles.css';
import brandImage from '../../assets/brand.png';
import { Link, useNavigate } from 'react-router-dom';
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useModal } from '../../contexts/ModalContext';

import api from '../../services/api';


export default function Products() {


    const {confirm, success, mError} = useModal();

    
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const PAGE_SIZE = 10;

    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    useEffect(() => {
        api.get('api/Products', authorization
        ).then(response => {
            setProducts(response.data);
        }).catch(error => {
            console.error('Error fetching products:', error);
            mError('Failed to fetch products. Please try again.');
        });
    }, [token]);


    const paginatedProducts = useMemo(() => {

        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;

        return products.slice(startIndex, endIndex)

    }, [products, currentPage]);

    const totalPages = Math.ceil(products.length / PAGE_SIZE);

    function nextPage() {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    function previousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }


    async function confirmDelete(productId) {

        confirm({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this product?',
            onConfirm: () => deleteProduct(productId)
        })
      

    }



    async function deleteProduct(id) {
        try {
            const response = await api.delete(`api/Products/${id}`, authorization);

            if (response.status >= 200 && response.status < 300) {
                success('Product deleted successfully.');
                setProducts(products.filter(product => product.id !== id));
            }

        } catch (error) {
            mError('Failed to delete product. Please try again.');
            console.error('Error deleting product:', error);
        }
    }

    async function editProduct(id) {
        try {
            navigate(`/products/update/${id}`);
        } catch (error) {
            console.error('Error updating product:', error);
            mError('Failed to navigate to edit product. Please try again.');
        }
    }

    //no calls to /api/Logout implemented, so just clear local storage and navigate to home
    async function logout() {
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
                {paginatedProducts.map(product => (
                    <li key={product.id}>

                        <strong>Product Name</strong>
                        <p>{product.name}</p>

                        <strong>Price:</strong>
                        <p>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}</p>

                        <strong>Description: </strong>
                        <p>{product.description}</p>

                        <strong>Category:</strong>
                        <p>{product.categoryId}</p>

                        <button onClick={() => editProduct(product.id)} type="button">
                            <FiEdit size={20} color="#5f37a4" />
                        </button>

                        <button onClick={() => confirmDelete(product.id)} type="button">
                            <FiTrash2 size={20} color="#a83232" />
                        </button>


                    </li>

                ))}
            </ul>
            <div className="pagination">
                <button onClick={previousPage} disabled={currentPage === 1} type="button">
                    Previous
                </button>

                <span>
                    Page {currentPage} of {totalPages}
                </span>

                <button onClick={nextPage} disabled={currentPage === totalPages} type="button">
                    Next
                </button>
            </div>

                
        </div>
    );
}