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

// Function to close the popup
function closePopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('popup-overlay');
    const body = document.body;

    popup.classList.remove('show'); // Hide popup smoothly
    popup.classList.remove('combo-view'); // Remove combo view
    overlay.classList.remove('active'); // Start fading out the overlay

    // Re-enable scrolling and interactions after the fade-out
    setTimeout(() => {
        overlay.style.pointerEvents = "none"; // Ensure no interactions during fade-out
        body.classList.remove('no-scroll', 'no-interaction'); // Re-enable scrolling
        popup.classList.add('hidden'); // Fully hide the popup
    }, 400); // Match the CSS transition duration (0.4s)
}


// Function to handle "Add to Cart"
function addToCart() {
    alert("Item added to cart!");
    closePopup();
}

// Function to handle "Make a Combo"
function makeCombo() {
    const popup = document.getElementById('popup');
    popup.classList.add('combo-view'); // Expand popup width
}
