// Array for menu items
const menuItems = {
    "Big Wac": {
        ingredients: ["lettuce", "tomato", "pickles", "onions", "cheese", "sauce", "patty", "bun"],
        calories: 550,
        price: 5.99
    },
    "Cheeseburger": {
        ingredients: ["lettuce", "pickles", "cheese", "sauce", "patty", "bun"],
        calories: 350,
        price: 6.49
    },
    "Beef Taco": {
        ingredients: ["lettuce", "tomato", "cheese", "salsa", "beef", "tortilla"],
        calories: 300,
        price: 2.99
    },
    "Double Beef Burrito": {
        ingredients: ["lettuce", "tomato", "cheese", "salsa", "beef", "tortilla", "beans", "rice"],
        calories: 700,
        price: 7.99
    },
    "Fried Chicken": {
        ingredients: ["chicken", "flour", "spices", "oil"],
        calories: 450,
        price: 4.99
    },
    "Chicken Nuggets": {
        ingredients: ["chicken", "bread crumbs", "spices", "oil"],
        calories: 400,
        price: 3.99
    },
    "Grilled Chicken Sandwich": {
        ingredients: ["chicken breast", "lettuce", "tomato", "mayo", "bun"],
        calories: 480,
        price: 5.99
    },
    "Chicken Wrap": {
        ingredients: ["chicken", "lettuce", "tomato", "tortilla"],
        calories: 360,
        price: 6.49
    },
    "Ice Cream Sundae": {
        ingredients: ["vanilla ice cream", "fudge or caramel"],
        calories: 300,
        price: 2.99
    },
    "Apple Pie": {
        ingredients: ["apples", "flour", "sugar", "butter"],
        calories: 250,
        price: 1.99
    },
    "Brownie": {
        ingredients: ["chocolate", "flour", "sugar", "eggs", "butter"],
        calories: 350,
        price: 2.49
    },
    "Cola": {
        ingredients: ["carbonated water", "sugar", "flavoring"],
        calories: 150,
        price: 1.49
    },
    "Iced Tea": {
        ingredients: ["tea", "lemon", "sugar"],
        calories: 120,
        price: 1.99
    },
    "Orange Juice": {
        ingredients: ["orange juice"],
        calories: 110,
        price: 2.49
    },
    "Milkshake": {
        ingredients: ["milk", "ice cream", "flavoring"],
        calories: 420,
        price: 3.99
    },
    "French Fries": {
        ingredients: ["potatoes", "oil", "salt"],
        calories: 320,
        price: 1.99
    },
    "Mozzarella Sticks": {
        ingredients: ["mozzarella cheese", "breadcrumbs", "oil"],
        calories: 400,
        price: 3.49
    },
    "Garden Salad": {
        ingredients: ["lettuce", "tomato", "cucumber", "croutons"],
        calories: 150,
        price: 2.99
    }
};


// Array for cart items
let cartItems = [];


// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Attach event listeners to all menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const itemName = item.getAttribute('data-item-name');
            const itemImg = item.querySelector('img').getAttribute('data-item-img'); // Accessing the child img's data attribute
            const itemDescription = item.querySelector('p[data-item-description]')?.getAttribute('data-item-description');
            
            showPopup(itemName, itemImg, itemDescription); // Pass itemName, itemImg, and itemDescription
        });
    });
});

// Function to show the popup with smooth transition
function showPopup(itemName, itemImg, itemDescription) {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('popup-overlay');
    const body = document.body;

    const popupTitle = document.getElementById('popup-title');
    const popupImage = document.getElementById('popup-image');
    const popupDescription = document.getElementById('popup-description');
    const popupIngredients = document.getElementById('popup-ingredients');

    // Access item details from the updated menuItems structure
    const itemDetails = menuItems[itemName] || {};
    const itemIngredients = itemDetails.ingredients ? itemDetails.ingredients.join(', ') : "Ingredients not available";
    const itemCalories = itemDetails.calories || "Calories not available";
    const itemPrice = itemDetails.price || "Price not available";

    popupTitle.textContent = `You selected: ${itemName}`;
    popupImage.src = itemImg; // Set item image
    popupDescription.textContent = itemDescription || "No description available."; // Set the description
    popupIngredients.innerHTML = `
        <p><strong>Ingredients:</strong> ${itemIngredients}</p>
        <p><strong>Calories:</strong> ${itemCalories} cal</p>
        <p><strong>Price:</strong> $${itemPrice.toFixed(2)}</p>
    `;

    popup.classList.remove('hidden');
    overlay.classList.add('active'); // Show overlay
    body.classList.add('no-scroll', 'no-interaction'); // Disable scrolling and interactions
    setTimeout(() => {
        popup.classList.add('show'); // Add "show" class for smooth visibility
    }, 10); // Short delay ensures transition kicks in
}


// Function to handle "Make a Combo"
function makeCombo() {
    const popup = document.getElementById('popup');
    const comboOptions = document.getElementById('combo-options');
    const buttons = document.querySelectorAll('.popup-content button:not(#closePopup)'); // Select Add to Cart and Make a Combo buttons

    popup.classList.add('combo-view'); // Expand the popup width
    comboOptions.classList.remove('hidden'); // Show combo options

    // Hide the "Add to Cart" and "Make a Combo" buttons
    buttons.forEach(button => button.classList.add('hidden'));
}

// Function to add the combo to the cart
function addComboToCart() {
    const itemName = document.getElementById('popup-title').textContent.replace('You selected: ', '').trim();
    const comboSide = document.querySelector('input[name="side"]:checked')?.value;
    const comboDrink = document.querySelector('input[name="drink"]:checked')?.value;

    if (!comboSide || !comboDrink) {
        alert('Please select a side and a drink to complete your combo!');
        return;
    }

    const itemDescription = document.getElementById('popup-description').textContent.trim();
    const itemImage = document.getElementById('popup-image').src;

    // Access item details from the updated ingredients structure
    const itemDetails = menuItems[itemName] || {};
    const itemPrice = itemDetails.price || 0;

    // Calculate the combo price (base price + fixed combo addition, e.g., $2.00)
    const comboPrice = itemPrice + 2.00; // Adjust this as needed for combo pricing

    // Define the new cart item with combo details
    const newItem = {
        name: itemName,
        description: itemDescription,
        image: itemImage,
        quantity: 1,
        price: comboPrice,
        combo: {
            side: comboSide,
            drink: comboDrink
        }
    };

    // Retrieve the cart from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item with the same combo already exists in the cart
    const existingItem = cartItems.find(item => item.name === newItem.name && item.combo?.side === comboSide && item.combo?.drink === comboDrink);
    if (existingItem) {
        // If it exists, increase the quantity
        existingItem.quantity += 1;
    } else {
        // Otherwise, add the new item
        cartItems.push(newItem);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Display a confirmation message
    alert(`${itemName} combo with ${comboSide} and ${comboDrink} has been added to your cart!`);

    // Close the popup
    closePopup();
}


function addToCart() {
    const itemName = document.getElementById('popup-title').textContent.replace('You selected: ', '').trim();
    const itemDescription = document.getElementById('popup-description').textContent.trim();
    const itemImage = document.getElementById('popup-image').src;

    // Access item details from the updated ingredients structure
    const itemDetails = menuItems[itemName] || {};
    const itemPrice = itemDetails.price || 0;

    // Define the new cart item
    const newItem = {
        name: itemName,
        description: itemDescription,
        image: itemImage,
        quantity: 1, // Default quantity
        price: itemPrice
    };

    // Retrieve the cart from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item already exists in the cart
    const existingItem = cartItems.find(item => item.name === newItem.name);
    if (existingItem) {
        // If it exists, increase the quantity
        existingItem.quantity += 1;
    } else {
        // Otherwise, add the new item
        cartItems.push(newItem);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Display a confirmation message
    alert(`${itemName} has been added to your cart!`);

    // Close the popup
    closePopup();
}



// Function to close the popup
function closePopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('popup-overlay');
    const body = document.body;
    const comboOptions = document.getElementById('combo-options');
    const buttons = document.querySelectorAll('.popup-content button:not(#closePopup)'); // Re-select Add to Cart and Make a Combo buttons

    console.log("Closing popup..."); // For debugging purposes

    // Remove all active states
    popup.classList.remove('show'); // Hide popup smoothly
    popup.classList.remove('combo-view'); // Remove expanded width view
    overlay.classList.remove('active'); // Start fading out the overlay
    body.classList.remove('no-scroll', 'no-interaction'); // Re-enable scrolling

    console.log("Classes removed. Starting timeout..."); // For debugging purposes

    // Ensure all states are reset after the transition
    setTimeout(() => {
        console.log("Inside setTimeout callback!"); // For debugging purposes
        popup.classList.add('hidden'); // Fully hide the popup
        comboOptions.classList.add('hidden'); // Hide combo options
        buttons.forEach(button => button.classList.remove('hidden')); // Show Add to Cart and Make a Combo buttons again
        popup.style.width = ""; // Reset any inline width applied to the popup
        console.log("Popup reset complete."); // For debugging purposes
    }, 400); // Match the CSS transition duration (0.4s)
}

// Cart functionality
document.addEventListener("DOMContentLoaded", function () {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTableBody = document.querySelector("#cart-items tbody");
    const cartTotal = document.getElementById("cart-total");

    function updateCartTable() {
        const cartTableBody = document.querySelector("#cart-items tbody");
        const cartSubtotalElement = document.getElementById("cart-subtotal");
        const cartHstElement = document.getElementById("cart-hst");
        const cartTotalElement = document.getElementById("cart-total");
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        let subtotal = 0;
    
        cartTableBody.innerHTML = ""; // Clear existing rows
    
        cartItems.forEach((item, index) => {
            const comboDetails = item.combo
                ? `<p><strong>Side:</strong> ${item.combo.side}</p>
                   <p><strong>Drink:</strong> ${item.combo.drink}</p>`
                : `<p>No Combo</p>`;
    
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    <div style="display: flex; align-items: center;">
                        <img src="${item.image || 'placeholder.jpg'}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px; border-radius: 5px;">
                        <div>
                            <p><strong>${item.name}</strong></p>
                            ${comboDetails}
                        </div>
                    </div>
                </td>
                <td>
                    <button class="btn-quantity" onclick="decreaseQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn-quantity" onclick="increaseQuantity(${index})">+</button>
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button onclick="removeItem(${index})" class="btn-remove">Remove</button>
                </td>
            `;
            cartTableBody.appendChild(row);
    
            subtotal += item.price * item.quantity;
        });
    
        // Calculate HST and Total
        const hst = subtotal * 0.13; // 13% HST
        const total = subtotal + hst;
    
        // Update DOM elements
        cartSubtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        cartHstElement.textContent = `$${hst.toFixed(2)}`;
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    
    
    // Function to increase quantity
    window.increaseQuantity = function (index) {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        cartItems[index].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cartItems));
        updateCartTable();
    };
    
    // Function to decrease quantity
    window.decreaseQuantity = function (index) {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity -= 1;
            localStorage.setItem("cart", JSON.stringify(cartItems));
            updateCartTable();
        } else {
            removeItem(index);
        }
    };
    
    
    
    

    window.removeItem = function (index) {
        cartItems.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        updateCartTable();
    };

    window.checkout = function () {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        alert("Proceeding to checkout!");
        localStorage.removeItem("cart");
        updateCartTable();
    };

    updateCartTable();
});

function addDealToCart(dealName) {
    const dealDetails = {
        "Big Wac Meal Combo": {
            description: "Enjoy our signature Big Wac with fries and a drink for just $6.99!",
            price: 6.99,
            quantity: 1,
            combo: {
                side: "Fries",
                drink: "Iced Tea"
            }
        },
        "Family Feast": {
            description: "A meal for the whole family, including burgers, sides, and drinks for $19.99!",
            price: 19.99,
            quantity: 1
        },
        "Sweet Treat Combo": {
            description: "Two desserts and a drink for only $4.99!",
            price: 4.99,
            quantity: 1
        }
    };

    const selectedDeal = dealDetails[dealName];

    if (!selectedDeal) {
        alert("Error: Deal not found!");
        return;
    }

    // Retrieve cart from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the deal with the same combo already exists in the cart
    const existingDeal = cartItems.find(
        item =>
            item.name === dealName &&
            item.combo?.side === selectedDeal.combo?.side &&
            item.combo?.drink === selectedDeal.combo?.drink
    );

    if (existingDeal) {
        existingDeal.quantity += 1;
    } else {
        cartItems.push({
            name: dealName,
            description: selectedDeal.description,
            price: selectedDeal.price,
            quantity: selectedDeal.quantity,
            combo: selectedDeal.combo || null
        });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));

    alert(`${dealName} has been added to your cart with ${selectedDeal.combo?.side} and ${selectedDeal.combo?.drink || "no drink"}!`);
}
// Function to add the BigWac Combo to the cart
function addBigWacCombo() {
    const comboItem = {
        name: "BigWac Meal Combo",
        description: "The ultimate burger with fries and iced tea.",
        price: 6.99,
        quantity: 1,
        combo: {
            side: "Fries",
            drink: "Iced Tea"
        },
        image: "Images/BigWac.jpg"
    };

    // Retrieve cart from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the item already exists
    const existingCombo = cartItems.find(
        item => item.name === comboItem.name &&
                item.combo?.side === comboItem.combo.side &&
                item.combo?.drink === comboItem.combo.drink
    );

    if (existingCombo) {
        existingCombo.quantity += 1;
    } else {
        cartItems.push(comboItem);
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));

    alert("BigWac Combo has been added to your cart!");
}

// Function to add Fries to the cart
function addFriesToCart() {
    const friesItem = {
        name: "French Fries",
        description: "Perfectly crispy fries with a touch of W.",
        price: 1.99,
        quantity: 1,
        image: "Images/fries.jpg"
    };

    // Retrieve cart from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the item already exists
    const existingFries = cartItems.find(item => item.name === friesItem.name);

    if (existingFries) {
        existingFries.quantity += 1;
    } else {
        cartItems.push(friesItem);
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));

    alert("Fries have been added to your cart!");
}

// Function to redirect to the Drinks page
function redirectToDrinks() {
    window.location.href = "drinks.html";
}
