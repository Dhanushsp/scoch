# ELEGANCE - Premium Fashion E-commerce Website

A modern, responsive e-commerce website inspired by ZARA's elegant design, built with React and Tailwind CSS.

## 🎨 Design Features

- **Color Scheme**: Primary color #373D1C (deep olive green) with soft white contrast
- **Typography**: Combination of Inter (sans-serif) and Playfair Display (serif) fonts
- **Layout**: Clean, minimalist design inspired by premium fashion brands
- **Responsive**: Fully responsive design optimized for all devices

## ✨ Features

### Header
- Logo in top left corner
- Navigation menu with categories (Clothes, Perfumes, Accessories)
- Shopping cart icon in top right
- Mobile side navigation with slide-out panel
- Primary color background (#373D1C)

### Main Content
- **Hero Banner**: Clean white background with primary color text (#373D1C)
- **Featured Products**: Two product cards showcasing premium items
- **Best Selling**: Product section with pricing and action buttons
- **Customer Reviews**: Auto-scrolling reviews section with star ratings
- **Return Policy**: Information section with policy highlights

### Footer
- Brand information and social media links
- Quick navigation links
- Contact information
- Legal links (Privacy Policy, Terms of Service)

## 🚀 Technologies Used

- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing for SPA navigation
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Google Fonts** - Inter and Playfair Display

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zara-inspired-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📦 Build for Production

```bash
npm run build
```

## 🎯 Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation and logo with cart functionality
│   ├── Banner.js          # Hero section
│   ├── FeaturedProducts.js # Featured products grid with navigation
│   ├── BestSelling.js     # Best selling products with navigation
│   ├── ProductDetail.js   # Individual product detail page
│   ├── CartPanel.js       # Side cart panel with toggle functionality
│   ├── Checkout.js        # Checkout form and order summary
│   ├── Reviews.js         # Customer reviews carousel
│   ├── ReturnPolicy.js    # Return policy information
│   └── Footer.js          # Footer with contact info
├── App.js                 # Main application with routing and cart state
├── index.js              # React entry point
└── index.css             # Global styles and Tailwind imports
```

## 🎨 Customization

### Colors
The primary color scheme can be modified in `tailwind.config.js`:
```javascript
colors: {
  primary: '#373D1C',        // Main brand color
  'primary-light': '#4a5224', // Lighter variant
  'primary-dark': '#2a2f15',  // Darker variant
  'soft-white': '#fafafa',    // Background color
}
```

### Fonts
Custom fonts are configured in `tailwind.config.js` and imported from Google Fonts in `public/index.html`.

## 📱 Mobile Optimization

- Responsive navigation menu
- Touch-friendly buttons and interactions
- Optimized image loading
- Mobile-first CSS approach

## 🌟 Key Features

- **Complete E-commerce Functionality**: Product detail pages, shopping cart, and checkout system
- **Side Cart Panel**: Toggleable side navigation cart panel for immediate access
- **Mobile Side Navigation**: Slide-out side navigation for mobile devices with toggle functionality
- **Product Navigation**: Click on product images to view detailed product pages
- **Shopping Cart**: Add products with size selection and quantity management
- **Cart Icon Badge**: Real-time cart item count display in header
- **Dynamic Cart Updates**: Immediate cart updates when adding, removing, or modifying items
- **Checkout Process**: Complete customer information form with order summary
- **Auto-scrolling Reviews**: Smooth horizontal scroll animation
- **Hover Effects**: Interactive product cards with hover animations
- **Rounded Design**: Modern rounded corners on buttons, cards, and UI elements
- **Icon Integration**: Lucide React icons for consistent visual language
- **Accessibility**: Semantic HTML and proper contrast ratios

## 🔧 Development

The project uses Create React App with Tailwind CSS. To modify styles:

1. Edit `src/index.css` for global styles
2. Use Tailwind utility classes in components
3. Customize `tailwind.config.js` for theme changes

## 📄 License

This project is created for demonstration purposes. Feel free to use and modify as needed.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ using React and Tailwind CSS
