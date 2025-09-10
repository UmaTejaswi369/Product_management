import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Package } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SortAndSearchBar from '../components/SortAndSearchBar';
import { getProducts, deleteProduct } from '../apis/productApi';

const ProductListPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(prev => prev.filter(product => product._id !== productId));
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err; // Re-throw to let the ProductCard handle the error display
    }
  };

  const handleEditProduct = (product) => {
    navigate(`/edit-product/${product._id}`);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        // No sorting
        break;
    }

    return filtered;
  }, [products, searchQuery, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 mx-auto mb-6"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="text-xl font-semibold gradient-text animate-pulse-slow">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-12 animate-slide-up">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-3">Product Inventory</h1>
            <p className="text-lg text-gray-600">
              Manage your product catalog with ease
            </p>
          </div>
          <Link
            to="/add-product"
            className="btn-primary flex items-center whitespace-nowrap text-lg py-4 px-8"
          >
            <Plus className="h-5 w-5 mr-3" />
            Add Product
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl shadow-lg animate-bounce-in">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-red-100 rounded-full mr-3">
              <Package className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
          <button
            onClick={loadProducts}
            className="btn-secondary text-red-600 hover:text-red-800 border-red-200 hover:border-red-300"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Search and Sort */}
      <SortAndSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Products Grid */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="animate-bounce-in">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {searchQuery ? 'No products found' : 'No products available'}
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              {searchQuery
                ? `No products match "${searchQuery}". Try adjusting your search.`
                : 'Get started by adding your first product to the inventory.'
              }
            </p>
            {!searchQuery && (
              <Link to="/add-product" className="btn-primary inline-flex items-center text-lg py-4 px-8">
                <Plus className="h-6 w-6 mr-3" />
                Add Your First Product
              </Link>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {filteredAndSortedProducts.map((product, index) => (
              <div
                key={product._id}
                className="animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <ProductCard
                  product={product}
                  onDelete={handleDeleteProduct}
                  onEdit={handleEditProduct}
                />
              </div>
            ))}
          </div>

          {/* Results Summary */}
          <div className="text-center text-gray-600 animate-fade-in bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-lg font-medium">
              Showing <span className="font-bold text-indigo-600">{filteredAndSortedProducts.length}</span> of <span className="font-bold text-indigo-600">{products.length}</span> products
              {searchQuery && (
                <span> for <span className="font-semibold text-gray-900">"{searchQuery}"</span></span>
              )}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductListPage;