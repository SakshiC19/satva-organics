# Satva Organics - E-Commerce Platform

A modern, full-featured e-commerce platform for organic agricultural products built with React JS and Firebase.

![Version](https://img.shields.io/badge/version-1.0.0-green)
![React](https://img.shields.io/badge/React-18.x-blue)
![Firebase](https://img.shields.io/badge/Firebase-Latest-orange)

## 🌿 Overview

Satva Organics is a comprehensive e-commerce platform that connects certified organic farmers with customers who value chemical-free, sustainably grown agricultural products. The platform features a beautiful green-themed design, complete shopping experience, admin dashboard for product management, and seamless order processing.

## ✨ Features

### Customer Features
- 🏠 **Beautiful Homepage** with hero banner, category showcase, and trust badges
- 🔍 **Product Catalog** with filters, sorting, and search
- 🛒 **Shopping Cart** with quantity management and price calculations
- 💳 **Checkout Process** with address management and payment integration
- 📦 **Order Tracking** with real-time status updates
- 👤 **User Profile** with saved addresses and order history
- ⭐ **Reviews & Ratings** for verified purchases
- 📱 **Fully Responsive** design for all devices

### Admin Features
- 📊 **Dashboard** with sales analytics and insights
- 🏗️ **Product Management** (Create, Read, Update, Delete)
- 📋 **Order Management** with status updates
- 👥 **Customer Management**
- 💰 **Coupon & Discount** management
- 🖼️ **Banner Management** for homepage
- 📦 **Inventory Tracking**

## 🚀 Tech Stack

- **Frontend**: React 18.x
- **Routing**: React Router DOM v6
- **Backend**: Firebase
  - Authentication (Email, Phone OTP, Google)
  - Firestore Database
  - Cloud Storage
- **Icons**: React Icons
- **Forms**: React Hook Form
- **Carousel**: Swiper
- **Payment**: Razorpay Integration
- **Styling**: Custom CSS with CSS Variables

## 📁 Project Structure

```
satva-organics/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components (Button, Input, Card, Badge)
│   │   ├── layout/          # Layout components (Header, Footer)
│   │   ├── product/         # Product-specific components
│   │   └── cart/            # Cart components
│   ├── pages/
│   │   ├── Home/            # Homepage
│   │   ├── Products/        # Product listing
│   │   ├── ProductDetail/   # Single product page
│   │   ├── Cart/            # Shopping cart
│   │   ├── Checkout/        # Checkout process
│   │   ├── Orders/          # Order history
│   │   ├── Profile/         # User profile
│   │   └── Auth/            # Login/Register
│   ├── context/             # React Context for state management
│   ├── services/            # Firebase and API services
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Helper functions
│   ├── styles/              # Global styles and variables
│   ├── App.js
│   └── index.js
├── FIREBASE_SETUP.md        # Firebase configuration guide
├── .env.example             # Environment variables template
└── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- Razorpay account (for payment integration)

### Step 1: Clone and Install

```bash
cd satva-organics
npm install
```

### Step 2: Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password, Phone, Google)
3. Create a Firestore database
4. Enable Firebase Storage
5. Copy your Firebase configuration

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed instructions.

### Step 3: Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Fill in your Firebase and Razorpay credentials:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key
```

### Step 4: Run the Application

```bash
npm start
```

The application will open at `http://localhost:3000`

### Step 5: Build for Production

```bash
npm run build
```

## 🎨 Design System

### Color Palette
- **Primary Green**: `#22c55e` - Organic and natural
- **Earth Tones**: `#eab308` - Supporting colors
- **Neutral Grays**: For text and backgrounds

### Typography
- **Headings**: Poppins
- **Body**: Inter

### Components
All UI components follow a consistent design system with:
- Customizable variants (primary, secondary, outline)
- Multiple sizes (sm, md, lg)
- Loading states
- Hover animations
- Responsive design

## 🔐 Security

- Firebase Security Rules configured for data protection
- Environment variables for sensitive data
- Input validation and sanitization
- Secure payment processing via Razorpay
- HTTPS enforced in production

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktop (1024px and up)
- 🖥️ Large screens (1280px and up)

## 🤝 Firebase Collections

### Products
```javascript
{
  id, name, description, category, price, images[],
  stock, weights[], certifications[], nutrition{},
  farmerProfile{}, deliveryTime, usage, rating, reviewCount
}
```

### Orders
```javascript
{
  id, userId, items[], totalAmount, discount, deliveryCharge,
  tax, finalAmount, shippingAddress{}, paymentMethod,
  paymentStatus, orderStatus, trackingId, timestamps
}
```

### Users
```javascript
{
  uid, email, phone, name, role, addresses[],
  wishlist[], createdAt
}
```

## 📄 Legal Pages

All mandatory legal pages included:
- Privacy Policy
- Refund & Return Policy
- Terms & Conditions
- Shipping Policy
- FSSAI & GST Information

## 🚀 Deployment

### Firebase Hosting

```bash
npm run build
firebase login
firebase init hosting
firebase deploy
```

### Other Platforms
- Vercel: `vercel --prod`
- Netlify: Connect GitHub repo
- AWS S3: Upload build folder

## 🐛 Troubleshooting

### App won't start
- Check Node.js version: `node --version`
- Clear cache: `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`

### Firebase errors
- Verify `.env` file has correct credentials
- Check Firebase Security Rules
- Ensure required services are enabled in Firebase Console

## 📦 NPM Scripts

```bash
npm start          # Start development server
npm run build      # Create production build
npm test           # Run tests
npm run eject      # Eject from Create React App
```

## 🤝 Contributing

This is a private project for Satva Organics. For questions or support, contact the development team.

## 📞 Support

For any issues or questions:
- Email: info@satvaorganics.com
- Phone: +91 98765 43210

## 📝 License

© 2025 Satva Organics. All rights reserved.

---

**Built with ❤️ for a healthier, organic future**

🌱 Satva Organics - Farm Fresh & Pure
