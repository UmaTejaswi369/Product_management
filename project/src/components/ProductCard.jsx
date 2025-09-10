import React, { useState } from 'react';
import { Trash2, Edit, Tag } from 'lucide-react';

const ProductCard = ({ product, onDelete, onEdit }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(product._id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const truncateDescription = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };


  return (
    <>
      <div className="card card-hover animate-fade-in group">
        <div className="flex flex-col h-full">
          {/* Product Image */}
          {product.mainImage && (
            <div className="mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 relative">
              <img
                src={product.mainImage}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          )}

          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1 mr-2 group-hover:text-indigo-600 transition-colors duration-300">
              {product.name}
            </h3>
            <div className="flex space-x-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              {onEdit && (
                <button
                  onClick={() => onEdit(product)}
                  className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                  title="Edit product"
                >
                  <Edit className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={handleDeleteClick}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                title="Delete product"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center mb-4">
            <Tag className="h-4 w-4 text-indigo-400 mr-2 group-hover:text-indigo-600 transition-colors duration-300" />
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-300">
              {product.category}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-6 flex-1 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
            {truncateDescription(product.description)}
          </p>

          {/* Price */}
          <div className="mt-auto">
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:to-purple-700 transition-all duration-300">
              {formatPrice(product.price)}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-bounce-in border border-gray-100">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Confirm Delete
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Are you sure you want to delete <span className="font-semibold text-gray-900">"{product.name}"</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="btn-secondary flex-1 sm:flex-none"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="btn-danger flex items-center justify-center flex-1 sm:flex-none"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Product
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;