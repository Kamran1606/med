// cart-script.js
document.addEventListener("DOMContentLoaded", () => {
    loadCart();
});

// Helper function to parse price string (e.g., "₹120/kg") into a number
function parsePrice(priceString) {
    if (!priceString) return 0;
    // Remove currency symbols, text, and then convert to a number
    const cleanedString = priceString.replace(/[^0-9.]/g, '');
    return parseFloat(cleanedString) || 0;
}

function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");
    const checkoutFooter = document.querySelector(".checkout-footer");

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p class='empty-cart-message'>Your cart is empty.</p>";
        checkoutFooter.style.display = 'none';
        return;
    }

    checkoutFooter.style.display = 'flex';

    // Group items by a simulated brand name (we'll add a 'brand' property)
    const groupedCart = cart.reduce((acc, item) => {
        // In a real app, your item object would have a 'brand' property.
        // We will simulate it for this example.
        const brand = item.brand || "General"; 
        if (!acc[brand]) {
            acc[brand] = [];
        }
        acc[brand].push(item);
        return acc;
    }, {});
    
    // Find the original index for each item before grouping
    cart.forEach((item, index) => item.originalIndex = index);

    for (const brand in groupedCart) {
        const brandItems = groupedCart[brand];
        const brandGroupEl = document.createElement("div");
        brandGroupEl.className = "brand-group";
        
        let brandHTML = `
            <div class="brand-header">
                <strong>${brand}</strong>
                <a href="#" class="view-brand-link">View brand</a>
            </div>
        `;

        brandItems.forEach(item => {
            const itemCount = cart.filter(cartItem => cartItem.name === item.name).length;
            
            brandHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>${item.price.split('/')[1] || 'Item'}</p> <span class="price">${item.price.split('/')[0]}</span>
                    </div>
                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity(${item.originalIndex})">−</button>
                        <span class="quantity">${itemCount}</span>
                        <button onclick="increaseQuantity(${item.originalIndex})">+</button>
                    </div>
                </div>
            `;
        });
        
        brandGroupEl.innerHTML = brandHTML;
        cartItemsContainer.appendChild(brandGroupEl);
    }
    
    // Remove duplicate items for display
    const uniqueItems = Array.from(new Set(cart.map(item => item.name)))
        .map(name => cart.find(item => item.name === name));
        
    cartItemsContainer.innerHTML = ''; // Clear container before rendering unique items
    
    const groupedUniqueCart = uniqueItems.reduce((acc, item) => {
        const brand = item.brand || "General";
        if (!acc[brand]) {
            acc[brand] = [];
        }
        acc[brand].push(item);
        return acc;
    }, {});

    for (const brand in groupedUniqueCart) {
        let brandHTML = `<div class="brand-group"><div class="brand-header"><strong>${brand}</strong><a href="#" class="view-brand-link">View brand</a></div>`;
        groupedUniqueCart[brand].forEach(item => {
            const itemCount = cart.filter(cartItem => cartItem.name === item.name).length;
            brandHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>${item.price.split('/')[1] || 'Item'}</p>
                        <span class="price">${item.price.split('/')[0]}</span>
                    </div>
                    <div class="quantity-controls">
                        <button onclick="decreaseQuantityByName('${item.name}')">−</button>
                        <span class="quantity">${itemCount}</span>
                        <button onclick="increaseQuantityByName('${item.name}')">+</button>
                    </div>
                </div>
            `;
        });
        brandHTML += `</div>`;
        cartItemsContainer.innerHTML += brandHTML;
    }


    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + parsePrice(item.price), 0);
    totalPriceEl.textContent = `₹${totalPrice.toFixed(2)}`;
}

function increaseQuantityByName(itemName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemToAdd = cart.find(item => item.name === itemName);
    if (itemToAdd) {
        cart.push(itemToAdd);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }
}

function decreaseQuantityByName(itemName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndexToRemove = cart.findIndex(item => item.name === itemName);
    if (itemIndexToRemove > -1) {
        cart.splice(itemIndexToRemove, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }
}

function clearCart() {
    if (confirm("Are you sure you want to clear the entire cart?")) {
        localStorage.removeItem("cart");
        loadCart();
    }
}

function goToPayment() {
    window.location.href = "payment.html"; // Make sure you have a payment.html page
}