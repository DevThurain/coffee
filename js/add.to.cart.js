document.addEventListener("DOMContentLoaded", function() {
    // Initialize cart count and cart items from localStorage if available
    let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Update the cart count on page load
    updateCartCount(cartCount);

    // Handle Add to Cart button click
    const addToCartButtons = document.querySelectorAll(".btn-primary");
    addToCartButtons.forEach(button => {
      button.addEventListener("click", function () {
        // Get the product details
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h4').textContent;
        const productPrice = productCard.querySelector('.font-weight-bold').textContent;

        // Increment the cart count
        cartCount++;

        // Save product details to cart items
        cartItems.push({ name: productName, price: productPrice });

        // Store updated cart count and items in localStorage
        localStorage.setItem("cartCount", cartCount);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        // Update the cart badge
        updateCartCount(cartCount);
      });
    });

    // Function to update the cart count in the shopping cart badge
    function updateCartCount(count) {
      const cartBadge = document.querySelector(".badge-secondary");
      if (cartBadge) {
        cartBadge.textContent = count;
      }
    }

    // Handle shopping cart button click to show cart items in the modal
    const cartButton = document.querySelector('.shopping-cart');
    cartButton.addEventListener('click', function() {
      const cartItemsList = document.getElementById('cartItemsList');
      cartItemsList.innerHTML = ''; // Clear any existing items

      // Display cart items in the modal
      cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `${item.name} - ${item.price}`;
        cartItemsList.appendChild(listItem);
      });

      // Show the modal
      $('#cartModal').modal('show');
    });

    // Handle "Clear Cart" button click inside the modal
    const clearCartBtn = document.getElementById('clearCartBtn');
    clearCartBtn.addEventListener('click', function() {
      // Clear cart items from localStorage
      localStorage.removeItem('cartItems');
      localStorage.removeItem('cartCount');

      // Reset cart items array and count
      cartItems = [];
      cartCount = 0;

      // Update the cart badge
      updateCartCount(cartCount);

      // Clear the cart items list in the modal
      const cartItemsList = document.getElementById('cartItemsList');
      cartItemsList.innerHTML = ''; // Clear the items in the modal
    });
  });

  