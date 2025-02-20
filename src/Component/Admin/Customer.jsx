import Search from "../Common/Search";
import axios from "axios";
import { useEffect, useState } from "react";



function Customer() {
    const [customers, setCustomer] = useState([]); // renamed 'product' to 'products' for clarity
    const [search, setSearch] = useState("");
  
    useEffect(() => {
      loadCustomer();
    }, []);
  
    const loadCustomer = async () => {
      try {
        const result = await axios.get("http://localhost:9000/customers/list", {
          validateStatus: (status) => status >= 200 && status <= 400,
        });
  
        if (result.status === 200) {
          // Ensure the response is an array before setting the state
          setCustomer(Array.isArray(result.data) ? result.data : []);
        } else if (result.status === 302) {
          console.warn("Redirect detected. Check the server configuration.");
        } else {
          console.error("Unexpected status:", result.status);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    const filteredCustomers = customers.filter((customer) =>
      (customer.firstName.toLowerCase().includes(search.toLowerCase())) ||
      (customer.lastName.toLowerCase().includes(search.toLowerCase())) ||
      (customer.email).toLowerCase().includes(search.toLowerCase()) // Convert price to string
    ); 
    
  
    return (
      <section>
        <div className="container mx-auto p-6">
          {/* Search Bar */}
          <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-800 ml-8 ">Customer List</h1>
            <Search
              search={search}
              setSearch={setSearch}
              name="Find"
              placeholder="Search Customer..."
              className="w-40 px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              buttonStyle="bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded-md flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
  
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg md">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-blue-600 text-white uppercase text-sm tracking-wider">
                  <th className="text-left py-3 px-4 border-b border-gray-300">SN</th>
                  <th className="text-left py-3 px-4 border-b border-gray-300">FirstName</th>
                  <th className="text-left py-3 px-4 border-b border-gray-300">LastName</th>
                  <th className="text-left py-3 px-4 border-b border-gray-300">Email</th>
                  <th className="text-left py-3 px-4 border-b border-gray-300">PhoneNumber</th>
                  <th className="text-left py-3 px-4 border-b border-gray-300">Username</th>
                  <th className="text-left py-3 px-4 border-b border-gray-300">Password</th>
                  {/* <th className="text-left py-3 px-4 border-b border-gray-300">Role</th> */}
                  
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer, index) => (
                    <tr
                      key={customer.id}
                      className="hover:bg-gray-100 even:bg-gray-50 odd:bg-white"
                    >
                      <td className="py-3 px-4 border-b border-gray-300">{index + 1}</td>
                      <td className="py-3 px-4 border-b border-gray-300">{customer.firstName}</td>
                      <td className="py-3 px-4 border-b border-gray-300">{customer.lastName}</td>
                      <td className="py-3 px-4 border-b border-gray-300">{customer.email}</td>
                      <td className="py-3 px-4 border-b border-gray-300">{customer.phoneNumber}</td>
                      <td className="py-3 px-4 border-b border-gray-300">{customer.username}</td>
                      <td className="py-3 px-4 border-b border-gray-300">{customer.password}</td>
                      {/* <td className="py-3 px-4 border-b border-gray-300">{customer.user.userRole}</td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-4 px-4 text-gray-500 border-b"
                    >
                      No customer found
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
  
  export default Customer;
  