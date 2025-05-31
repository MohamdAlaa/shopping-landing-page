import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="text-xl font-bold hover:text-blue-200">
            ← Back to Premium Store
          </Link>
        </div>
      </header>

      {/* About Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Premium Store</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6">
            Welcome to Premium Store - your ultimate destination for high-quality products 
            that enhance your lifestyle.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-700 mb-6">
            Founded with a passion for quality and customer satisfaction, Premium Store 
            curates the finest selection of products across multiple categories. From 
            fashion and beauty to electronics and lifestyle accessories, we bring you 
            only the best.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Premium Beauty & Skincare Products</li>
            <li>Fashionable Clothing & Accessories</li>
            <li>High-Quality Electronics & Gadgets</li>
            <li>Sports & Lifestyle Equipment</li>
            <li>Travel & Outdoor Gear</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Promise</h2>
          <p className="text-gray-700 mb-6">
            We are committed to providing exceptional customer service, fast shipping, 
            and products that exceed your expectations. Every item in our store is 
            carefully selected for quality, style, and value.
          </p>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-2">Contact Us</h3>
            <p className="text-blue-800">
              Have questions? We'd love to hear from you!<br />
              Email: info@premiumstore.com<br />
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 