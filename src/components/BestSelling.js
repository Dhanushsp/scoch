import React from 'react';
import { useNavigate } from 'react-router-dom';

const BestSelling = () => {
  const navigate = useNavigate();
  
  const bestSellingProducts = [
    {
      id: 1,
      name: "Classic White Blouse",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1564257631407-3deb5d241d45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
      category: "Clothes"
    },
    {
      id: 2,
      name: "Luxury Fragrance Set",
      price: "$149.99",
      image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      category: "Perfumes"
    }
  ];

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="py-16 bg-soft-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Best Selling</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {bestSellingProducts.map((product) => (
            <div key={product.id} className="product-card group">
              <div className="relative overflow-hidden cursor-pointer" onClick={() => handleProductClick(product.id)}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                  <span className="bg-primary text-soft-white px-3 py-1 rounded-xl text-sm font-medium">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text-dark mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {product.price}
                  </span>
                  <span className="text-sm text-text-light">
                    Free Shipping
                  </span>
                </div>
                <div className="flex gap-3">
                  <button className="btn-primary flex-1">
                    Add to Cart
                  </button>
                  <button className="btn-secondary flex-1">
                    Quick View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSelling;
