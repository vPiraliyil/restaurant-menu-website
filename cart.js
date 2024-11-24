// Arrays for item ingredients
const ingredients = {
    "Big Wac": ["lettuce", "tomato", "pickles", "onions", "cheese", "sauce", "patty", "bun"],
    "Cheeseburger": ["lettuce", "pickles", "cheese", "sauce", "patty", "bun"],
    "Beef Taco": ["lettuce", "tomato", "cheese", "salsa", "beef", "tortilla"],
    "Double Beef Burrito": ["lettuce", "tomato", "cheese", "salsa", "beef", "tortilla", "beans", "rice"]
};

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
    const popupIngredients = document.getElementById('popup-ingredients'); // Element for ingredients

    popupTitle.textContent = `You selected: ${itemName}`;
    popupImage.src = itemImg; // Set item image
    popupDescription.textContent = itemDescription || "No description available."; // Set the description or fallback text
    popupIngredients.textContent = ingredients[itemName] ? ingredients[itemName].join(', ') : "Ingredients not available"; // Set ingredients list

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
    alert("Combo added to cart!");
    closePopup();
}

function addToCart() {
    alert("Item added to cart!");
    closePopup();
}

// Function to close the popup
function closePopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('popup-overlay');
    const body = document.body;
    const comboOptions = document.getElementById('combo-options');
    const buttons = document.querySelectorAll('.popup-content button:not(#closePopup)'); // Re-select Add to Cart and Make a Combo buttons

    console.log("Closing popup...");

    // Remove all active states
    popup.classList.remove('show'); // Hide popup smoothly
    popup.classList.remove('combo-view'); // Remove expanded width view
    overlay.classList.remove('active'); // Start fading out the overlay
    body.classList.remove('no-scroll', 'no-interaction'); // Re-enable scrolling

    console.log("Classes removed. Starting timeout...");

    // Ensure all states are reset after the transition
    setTimeout(() => {
        console.log("Inside setTimeout callback!");
        popup.classList.add('hidden'); // Fully hide the popup
        comboOptions.classList.add('hidden'); // Hide combo options
        buttons.forEach(button => button.classList.remove('hidden')); // Show Add to Cart and Make a Combo buttons again
        popup.style.width = ""; // Reset any inline width applied to the popup
        console.log("Popup reset complete.");
    }, 400); // Match the CSS transition duration (0.4s)
}

// Cart functionality
document.addEventListener("DOMContentLoaded", function () {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTableBody = document.querySelector("#cart-items tbody");
    const cartTotal = document.getElementById("cart-total");

    function updateCartTable() {
        cartTableBody.innerHTML = "";
        let total = 0;

        cartItems.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button onclick="removeItem(${index})">Remove</button>
                </td>
            `;
            cartTableBody.appendChild(row);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

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
