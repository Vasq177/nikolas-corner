/**
 * Nikola's Corner - Shopping Cart Functionality
 * Copyright (c) 2024 Nikola's Corner
 * Licensed under MIT License - see LICENSE file for details
 */

// Cart state
let cart = [];

// Load cart from localStorage if exists
const loadCart = () => {
    const savedCart = localStorage.getItem('bakeryCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
};

// Save cart to localStorage
const saveCart = () => {
    localStorage.setItem('bakeryCart', JSON.stringify(cart));
    updateCartCount();
};

// Update cart count in UI
const updateCartCount = () => {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
};

// Add item to cart
const addToCart = (productId, name, price, quantity = 1) => {
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ productId, name, price, quantity });
    }
    
    saveCart();
    
    // Show toast notification
    const toast = document.getElementById('toast');
    toast.textContent = `Added ${quantity} ${name} to cart`;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
};

// Update quantity
const updateQuantity = (productId, newQuantity) => {
    const item = cart.find(item => item.productId === productId);
    if (item) {
        item.quantity = Math.max(0, newQuantity);
        if (item.quantity === 0) {
            cart = cart.filter(i => i.productId !== productId);
        }
        saveCart();
    }
};

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', loadCart); 