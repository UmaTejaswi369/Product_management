import React, { useState } from 'react';
import { ArrowLeft, Save, X, Upload, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductForm = ({ onSubmit, initialData = {}, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    price: initialData.price || '',
    category: initialData.category || '',
    description: initialData.description || '',
    mainImage: initialData.mainImage || '',
    images: initialData.images || []
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Product name must be at least 2 characters long';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Product name cannot exceed 100 characters';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    } else if (parseFloat(formData.price) > 10000000) {
      newErrors.price = 'Price cannot exceed ₹1,00,00,000';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    } else if (formData.description.trim().length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const productData = {
        ...formData,
        price: parseFloat(formData.price)
      };
      onSubmit(productData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      price: '',
      category: '',
      description: '',
      mainImage: '',
      images: []
    });
    setErrors({});
  };


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, mainImage: 'Image size must be less than 5MB' }));
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, mainImage: 'Please select a valid image file' }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          mainImage: event.target.result
        }));
        if (errors.mainImage) {
          setErrors(prev => ({ ...prev, mainImage: '' }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, mainImage: '' }));
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="card glass-effect">
        <div className="flex items-center mb-8">
          <Link
            to="/"
            className="mr-4 p-3 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h2 className="text-3xl font-bold gradient-text">
            {initialData._id ? 'Edit Product' : 'Add New Product'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Name */}
          <div className="animate-slide-up">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className={`input-field ${errors.name ? 'border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-50' : 'focus:ring-indigo-400'}`}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-500 animate-fade-in flex items-center">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                {errors.name}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
            <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-3">
              Price (INR) *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                className={`input-field pl-8 ${errors.price ? 'border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-50' : 'focus:ring-indigo-400'}`}
              />
            </div>
            {errors.price && (
              <p className="mt-2 text-sm text-red-500 animate-fade-in flex items-center">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                {errors.price}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-3">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`input-field ${errors.category ? 'border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-50' : 'focus:ring-indigo-400'}`}
            >
              <option value="">Select a category</option>
              <option value="Electronics">📱 Electronics</option>
              <option value="Kitchen">🍳 Kitchen</option>
              <option value="Furniture">🪑 Furniture</option>
              <option value="Clothing">👕 Clothing</option>
              <option value="Books">📚 Books</option>
              <option value="Sports">⚽ Sports</option>
              <option value="Beauty">💄 Beauty</option>
              <option value="Other">📦 Other</option>
            </select>
            {errors.category && (
              <p className="mt-2 text-sm text-red-500 animate-fade-in flex items-center">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                {errors.category}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter product description"
              className={`input-field resize-none ${errors.description ? 'border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-50' : 'focus:ring-indigo-400'}`}
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-500 animate-fade-in flex items-center">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                {errors.description}
              </p>
            )}
          </div>

          {/* Product Image */}
          <div className="animate-slide-up" style={{animationDelay: '0.4s'}}>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Product Image
            </label>
            
            {formData.mainImage ? (
              <div className="relative group">
                <img
                  src={formData.mainImage}
                  alt="Product preview"
                  className="w-full h-56 object-cover rounded-2xl border-2 border-gray-200 shadow-lg group-hover:shadow-xl transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100"
                  title="Remove image"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-indigo-200 rounded-2xl p-8 text-center hover:border-indigo-300 hover:bg-indigo-50/30 transition-all duration-300 group cursor-pointer">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  <Upload className="h-12 w-12 text-indigo-400 mx-auto mb-4 group-hover:text-indigo-600 transition-colors duration-300" />
                  <p className="text-lg font-semibold text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors duration-300">Upload a product image</p>
                  <p className="text-sm text-gray-500 mb-4">Drag and drop or click to browse</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Image
                </label>
                <p className="text-xs text-gray-400 mt-3">PNG, JPG, GIF up to 5MB</p>
              </div>
            )}
            
            {errors.mainImage && (
              <p className="mt-2 text-sm text-red-500 animate-fade-in flex items-center">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                {errors.mainImage}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 animate-slide-up" style={{animationDelay: '0.5s'}}>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex-1 sm:flex-none flex items-center justify-center text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  {initialData._id ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-3" />
                  {initialData._id ? 'Update Product' : 'Save Product'}
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              className="btn-secondary flex-1 sm:flex-none flex items-center justify-center text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <X className="h-5 w-5 mr-3" />
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;