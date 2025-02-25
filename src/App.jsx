import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SideBar from "./Component/Common/SideBar";
import Home from "./Component/Admin/Home";
import TopSideBar from "./Component/Common/TopSideBar";
import LoginForm from "./Component/Admin/LoginForm";
import { useEffect, useState } from "react";
import Category from "./Component/Admin/Category";
import Product from "./Component/Admin/Product";
import Customer from "./Component/Admin/Customer";
import Order from "./Component/Admin/Order";
import AddOrderForm from "./Component/Admin/AddOrderForm";
import SalesDashboard from "./Component/Sales/SalesDashboard";
import EmployeeDashboard from "./Component/Employee/EmployeeDashboard";
import AddEmployee from "./Component/Employee/AddEmployee";

function App() {
  const [loginState, setLoginState] = useState(false); // False by default, user is not logged in
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole) {
      setUserRole(userRole);
      setLoginState(true);
    }
  }, []);
  

  
  const loginChange = (userRole) => {
    setUserRole(userRole);
    setLoginState(true);
  };

  const handleLogout = () => {
    setLoginState(false);
    setUserRole(null);
    localStorage.removeItem("role");
  };
  return (
    <Router>
      {loginState ? (
        <aside className="flex bg-stone-200 h-screen ">
          {/* Sidebar with dynamic menu based on userRole */}
          <SideBar userRole={userRole} />

          <div className="p-0.5 flex-1 h-screen overflow-y-auto">
            {/* Top Navigation Bar */}
            <TopSideBar loginState={loginState} onLogout={handleLogout} />

            {/* Role-based routing */}
            <Routes>
              {/* Common Dashboard Route */}
              <Route
                exact
                path="/dashboard"
                element={
                  userRole === "ADMIN" ? <Home /> :
                  userRole === "SALES" ? <SalesDashboard /> :
                  userRole === "EMPLOYEE" ? <EmployeeDashboard /> :
                  <Navigate to="/login" />
                }
              />

              {/* Admin Routes */}
              {userRole === "ADMIN" && (
                <>
                  <Route exact path="/category" element={<Category />} />
                  <Route exact path="/product" element={<Product />} />
                  <Route exact path="/customer" element={<Customer />} />
                  <Route exact path="/order" element={<Order />} />
                  <Route exact path="/addorder" element={<AddOrderForm />} />
                  <Route exact path="/employee/add" element={<AddEmployee />} />
                </>
              )}

              {/* Sales Routes */}
              {userRole === "SALES" && (
                <>
                  <Route exact path="/order" element={<Order />} />
                  <Route exact path="/addorder" element={<AddOrderForm />} />
                </>
              )}

              {/* Employee Routes */}
              {userRole === "EMPLOYEE" && (
                <>
                  <Route exact path="/profile" element={<EmployeeDashboard />} />
                </>
              )}

              {/* Default redirect based on role */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </aside>
      ) : (
        // Login Page
        <Routes>
          <Route exact path="/login" element={<LoginForm onLoginSuccess={loginChange} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
