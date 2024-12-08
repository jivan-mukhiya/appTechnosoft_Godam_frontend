import Search from "../Common/Search";
import axios from "axios";
import { useEffect, useState } from "react";

function Product() {
  const [products, setProducts] = useState([]); // renamed 'product' to 'products' for clarity
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const result = await axios.get("http://localhost:9000/product/list", {
        validateStatus: (status) => status >= 200 && status <= 400,
      });

      if (result.status === 200) {
        // Ensure the response is an array before setting the state
        setProducts(Array.isArray(result.data) ? result.data : []);
      } else if (result.status === 302) {
        console.warn("Redirect detected. Check the server configuration.");
      } else {
        console.error("Unexpected status:", result.status);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    (product.name.toLowerCase().includes(search.toLowerCase())) ||
    (product.categoryName.toLowerCase().includes(search.toLowerCase())) ||
    (String(product.price).toLowerCase().includes(search.toLowerCase())) // Convert price to string
  );
  

  return (
    <section>
      <div className="container mx-auto p-6">
        {/* Search Bar */}
        <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-gray-800 ml-8 ">Product List</h1>
          <Search
            search={search}
            setSearch={setSearch}
            name="Find"
            placeholder="Search product..."
            className="w-40 px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            buttonStyle="bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded-md flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg md">
            <thead>
              <tr className="bg-gradient-to-r from-purple-600 to-blue-600 text-white uppercase text-sm tracking-wider">
                <th className="text-left py-3 px-4 border-b border-gray-300">SN</th>
                <th className="text-left py-3 px-4 border-b border-gray-300">Name</th>
                <th className="text-left py-3 px-4 border-b border-gray-300">Price(per)</th>
                <th className="text-left py-3 px-4 border-b border-gray-300">Stock Quantity</th>
                <th className="text-left py-3 px-4 border-b border-gray-300">Category</th>
                <th className="text-left py-3 px-4 border-b border-gray-300">description</th>
                <th className="text-left py-3 px-4 border-b border-gray-300">Total</th>
                
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-100 even:bg-gray-50 odd:bg-white"
                  >
                    <td className="py-3 px-4 border-b border-gray-300">{index + 1}</td>
                    <td className="py-3 px-4 border-b border-gray-300">{product.name}</td>
                    <td className="py-3 px-4 border-b border-gray-300">{product.price}</td>
                    <td className="py-3 px-4 border-b border-gray-300">{product.stockQuantity}</td>
                    <td className="py-3 px-4 border-b border-gray-300">{product.categoryName}</td>
                    <td className="py-3 px-4 border-b border-gray-300">{product.description}</td>
                    <td className="py-3 px-4 border-b border-gray-300">{product.price*product.stockQuantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4 px-4 text-gray-500 border-b"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Product;
