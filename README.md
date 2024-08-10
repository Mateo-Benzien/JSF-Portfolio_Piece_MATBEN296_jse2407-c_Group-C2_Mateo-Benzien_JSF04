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

## File Breakdown

- **index.html:** The main HTML file.
- **App.vue:** The root Vue component for the app.
- 
  - **ProductCard:** Displays individual product cards.
  - **ProductDetail:** Shows detailed product information.
  - **ProductList:** Manages the grid of products, including filtering and sorting.
  - **Filter:** Allows filtering products by category.
  - **Sort:** Handles sorting products by price.
  - **styles.css:** Contains global styles for the app.

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
4. **Resetting:** Return to default filter and sorting settings without refreshing the page.
5. **Persistence:** Your filter and sorting choices will be preserved as you navigate between the product grid and detailed views.

## Tech Stack

- **Vue 3:** For building the user interface.
- **Vue Router:** For navigating between product grid and detailed views.
- **Vuex (or Pinia):** For state management.
- **HTML/CSS:** For structuring and styling the app.
