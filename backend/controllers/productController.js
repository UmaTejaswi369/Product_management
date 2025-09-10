import Product from '../models/Product.js';

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const { search, sortBy, category } = req.query;
    
    // Build query
    let query = {};
    
    // Add search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Add category filter
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Execute query
    let productsQuery = Product.find(query);
    
    // Add sorting
    switch (sortBy) {
      case 'price-low':
        productsQuery = productsQuery.sort({ price: 1 });
        break;
      case 'price-high':
        productsQuery = productsQuery.sort({ price: -1 });
        break;
      case 'name':
        productsQuery = productsQuery.sort({ name: 1 });
        break;
      case 'category':
        productsQuery = productsQuery.sort({ category: 1 });
        break;
      case 'newest':
        productsQuery = productsQuery.sort({ createdAt: -1 });
        break;
      default:
        productsQuery = productsQuery.sort({ createdAt: -1 });
    }
    
    const products = await productsQuery;
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to fetch products',
      error: error.message
    });
  }
};

// Get single product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to fetch product',
      error: error.message
    });
  }
};

// Create new product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, mainImage, images } = req.body;
    
    // Validation
    if (!name || !price || !description || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, price, description, category'
      });
    }
    
    // Create product
    const productData = {
      name: name.trim(),
      price: parseFloat(price),
      description: description.trim(),
      category: category.trim()
    };

    // Add image fields if provided
    if (mainImage) {
      productData.mainImage = mainImage;
    }
    if (images && Array.isArray(images)) {
      productData.images = images;
    }

    const product = await Product.create(productData);
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to create product',
      error: error.message
    });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, category, mainImage, images } = req.body;
    
    // Find product
    let product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Update fields
    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (price !== undefined) updateData.price = parseFloat(price);
    if (description !== undefined) updateData.description = description.trim();
    if (category !== undefined) updateData.category = category.trim();
    if (mainImage !== undefined) updateData.mainImage = mainImage;
    if (images !== undefined && Array.isArray(images)) updateData.images = images;
    
    // Update product
    product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to update product',
      error: error.message
    });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    await Product.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to delete product',
      error: error.message
    });
  }
};
