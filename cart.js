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

// Function to show the popup
function showPopup(itemName, itemImg, itemDescription) { 
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupImage = document.getElementById('popup-image');
    const popupDescription = document.getElementById('popup-description');
    const popupIngredients = document.getElementById('popup-ingredients'); // Element for ingredients

    popupTitle.textContent = `You selected: ${itemName}`;
    popupImage.src = itemImg; // Set item image
    popupDescription.textContent = itemDescription || "No description available."; // Set the description or fallback text
    popupIngredients.textContent = ingredients[itemName] ? ingredients[itemName].join(', ') : "Ingredients not available"; // Set ingredients list

    popup.classList.remove('hidden'); // Show the popup
}

// Function to handle "Add to Cart"
function addToCart() {
    alert("Item added to cart!");
    closePopup();
}

// Function to handle "Make a Combo"
function makeCombo() {
    const popup = document.getElementById('popup');
    const comboOptions = document.getElementById('combo-options');
    popup.classList.add('combo-view'); // Expand popup width
    comboOptions.classList.remove('hidden'); // Show combo options
}

// Function to close popup and reset state
function closePopup() {
    const popup = document.getElementById('popup');
    const comboOptions = document.getElementById('combo-options');
    popup.classList.remove('combo-view'); // Reset popup width
    popup.classList.add('hidden');
    comboOptions.classList.add('hidden'); // Hide combo options
}