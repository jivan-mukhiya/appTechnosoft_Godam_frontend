import axios from "axios";
import { useEffect, useState } from "react";
import Search from "../Common/Search";

function Category() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const result = await axios.get("http://localhost:9000/category/list", {
        validateStatus: (status) => status >= 200 && status < 400,
      });

      if (result.status === 200) {
        setCategories(result.data);
      } else if (result.status === 302) {
        console.warn("Redirect detected. Check the server configuration.");
      } else {
        console.error("Unexpected status:", result.status);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase()) ||
    category.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <div className="container mx-auto p-6">
        {/* Title and Search Bar in the Same Row */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-800 ml-8 ">Category List</h1>
          <Search
            search={search}
            setSearch={setSearch}
            name="Find"
            placeholder="Search category..."
            className="w-40 px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            buttonStyle="bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded-md flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gradient-to-r from-purple-600 to-blue-600 text-white uppercase text-sm tracking-wider">
                <th className="text-left py-3 px-4 border-b border-gray-300">SN</th>
                <th className="text-left py-3 px-4 border-b border-gray-300">Name</th>
                <th className="text-left py-3 px-4 border-b border-gray-300">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
                  <tr
                    key={category.id}
                    className="hover:bg-gray-100 even:bg-gray-50 odd:bg-white"
                  >
                    <td className="py-3 px-4 border-b border-gray-300">{index + 1}</td>
                    <td className="py-3 px-4 border-b border-gray-300">{category.name}</td>
                    <td className="py-3 px-4 border-b border-gray-300">{category.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-4 px-4 text-gray-500 border-b"
                  >
                    No categories found.
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

export default Category;
