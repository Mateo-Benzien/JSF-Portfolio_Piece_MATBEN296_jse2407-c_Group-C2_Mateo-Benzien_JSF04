# Vue 3 E-Commerce Project

## What’s This About?

Hey there! This is an e-commerce web app built with Vue 3. It lets you browse products, view detailed information, and filter/sort the product list. All data is fetched from an API, and the app is crafted to look and perform well on any device.

## What’s Included

- **Product Grid:** View a grid of product cards featuring images, titles, prices, and categories.
- **Product Details Page:** Navigate to a detailed page for each product to see the title, description, image, price, category, rating, and reviews.
- **Filtering:** Filter products by category effortlessly.
- **Sorting:** Sort products by price (lowest to highest or highest to lowest).
- **Loading States:** Visual loading indicators while data is being fetched.
- **Persistence:** Your filters and sorting settings persist even when navigating between product details and the main grid.
- **Shopping Cart:** Add products to your cart, view, update, and remove items, and see the total cost.
- **Wishlist:** Save products to a wishlist for future reference.
- **Comparison List:** Compare products side-by-side.
- **Discounted Products:** View products on sale with discount percentages and end dates.
- **User Authentication:** Log in and out, and manage user sessions.
- **Checkout & Confirmation:** Complete purchases with PayPal and view confirmation details.

## File Breakdown

- **index.html:** The main HTML file.
- **App.vue:** The root Vue component for the app.
- **main.js:** The main entry point for the Vue application.
- **styles.css:** Contains global styles for the app.

### Pages

- **src/Pages/Cart.vue:** Manages the shopping cart functionality.
- **src/Pages/Checkout.vue:** Handles the checkout process.
- **src/Pages/ComparisonPage.vue:** Displays products for comparison.
- **src/Pages/Confirmation.vue:** Shows confirmation after a successful purchase.
- **src/Pages/DiscountProducts.vue:** Shows products with discounts in a carousel.
- **src/Pages/Home.vue:** The homepage with a grid of products and featured sections.
- **src/Pages/Login.vue:** Manages user login functionality.
- **src/Pages/ProductDetailView.vue:** Displays detailed information about a selected product.
- **src/Pages/Wishlist.vue:** Manages the user's wishlist of products.

- **src/router/index.js:** Contains the Vue Router setup and route definitions.

## Getting Started

1. **Clone the Repo:**

   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd your-repository
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Run the Development Server:**

   ```bash
   npm run dev
   ```

5. **Open Your Browser:**

   Navigate to `http://localhost:3000` (or the port specified) to see the app in action.

## How to Use It

1. **Filtering:** Select a category in the filter component to view products from that category.
2. **Sorting:** Use the sort component to arrange products by price.
3. **Product Details:** Click on a product card to view detailed information on a separate page.
4. **Shopping Cart:** Add items to your cart, update quantities, remove items, and view the total cost.
5. **Wishlist:** Save products to your wishlist for future reference.
6. **Comparison List:** Compare products by viewing them side-by-side.
7. **Discounted Products:** View discounted products in a carousel on the homepage and check details on a separate page.
8. **Login:** Log in to access protected features and manage your account.
9. **Checkout:** Complete purchases using PayPal and view confirmation details.
10. **Persistence:** Your filter and sorting choices, as well as cart and wishlist contents, will be preserved as you navigate through the app.

## Tech Stack

- **Vue 3:** For building the user interface.
- **Vue Router:** For navigating between pages and managing routes.
- **HTML/CSS:** For structuring and styling the app.
- **AI Assistance:** Portions of the code and content in this project were generated with the help of ChatGPT

## App Currently Deployed

The app is currently deployed using Vercel at this [link](https://jsf-portfolio-piece-matben-296-jse2407-c-group-c2-7z15066gb.vercel.app).

