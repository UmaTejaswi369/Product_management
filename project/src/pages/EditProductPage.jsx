import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { getProduct, updateProduct } from '../apis/productApi';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getProduct(id);
      setProduct(data);
    } catch (err) {
      setError('Failed to load product. Please try again.');
      console.error('Error loading product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (productData) => {
    try {
      setUpdating(true);
      setError('');
      await updateProduct(id, productData);
      navigate('/', { 
        state: { 
          message: 'Product updated successfully!',
          type: 'success'
        }
      });
    } catch (err) {
      setError(err.message || 'Failed to update product. Please try again.');
      console.error('Error updating product:', err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Product</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadProduct}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <ProductForm
        onSubmit={handleUpdateProduct}
        initialData={product}
        isLoading={updating}
      />
    </div>
  );
};

export default EditProductPage;
