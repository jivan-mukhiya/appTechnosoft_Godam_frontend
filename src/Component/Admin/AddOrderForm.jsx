import { useState, useEffect } from "react";
import axios from "axios";

const AddOrderForm = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    productId: "",
    quantity: 1,
    shippingAddress: "",
  });

  // Load products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const result = await axios.get("http://localhost:9000/product/list", {
          validateStatus: (status) => status >= 200 && status <= 400,
        });

        if (result.status === 200) {
          setProducts(Array.isArray(result.data) ? result.data : []);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    loadProducts();
  }, []);

  // Get selected product details
  const selectedProduct = products.find(
    (p) => p.id === Number(formData.productId)
  );

  // Calculate total price
  const calculateTotal = () => {
    if (!selectedProduct) return 0;
    return (selectedProduct.price * formData.quantity).toFixed(2);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      ...formData,
      productId: Number(formData.productId),
      total: calculateTotal(),
      orderDate: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        "http://localhost:9000/order/create",
        orderData
      );
      
      if (response.status === 201) {
        alert("Order created successfully!");
        // Reset form
        setFormData({
          customerName: "",
          customerEmail: "",
          productId: "",
          quantity: 1,
          shippingAddress: "",
        });
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error creating order. Please try again.");
    }
  };

  return (
    <section className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Order</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Product Selection */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Product</label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Choose a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - ${product.price} (Stock: {product.stockQuantity})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity (Max: {selectedProduct?.stockQuantity || 0})
                </label>
                <input
                  type="number"
                  min="1"
                  max={selectedProduct?.stockQuantity || 1}
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Math.max(1, e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
            <textarea
              value={formData.shippingAddress}
              onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows="3"
              required
            />
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
            <div className="grid grid-cols-2 gap-2">
              <p>Product:</p>
              <p>{selectedProduct?.name || "-"}</p>
              
              <p>Unit Price:</p>
              <p>${selectedProduct?.price?.toFixed(2) || "0.00"}</p>
              
              <p>Quantity:</p>
              <p>{formData.quantity}</p>
              
              <p className="font-semibold">Total:</p>
              <p className="font-semibold">${calculateTotal()}</p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            Place Order
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddOrderForm;