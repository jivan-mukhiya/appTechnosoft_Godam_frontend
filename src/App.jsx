import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SideBar from "./Component/Common/SideBar";
import Home from "./Component/Admin/Home";
import TopSideBar from "./Component/Common/TopSideBar";
import LoginForm from "./Component/Admin/LoginForm";
import { useState } from "react";
import Category from "./Component/Admin/Category";
import Product from "./Component/Admin/Product";
import EmployeeList from "./Component/Employee/EmployeeList";

function App() {
  const [loginState, setLoginState] = useState(false); // False by default, user is not logged in

  const loginChange = () => {
    setLoginState(true); // Update login state to true upon successful login
  };

  const handleLogout = () => {
    setLoginState(false); // Set loginState to false when logging out
  };

  return (
    <Router>
      {loginState ? (
        // Authenticated Layout
        <aside className="flex bg-stone-200 h-screen">
          {/* Sidebar */}
          <SideBar />

          {/* Main Content */}
          <div className="p-0.5 flex-1 h-screen overflow-y-auto">
            {/* Top Bar */}
            <TopSideBar loginState={loginState} onLogout={handleLogout} />

            {/* Routes */}
            <Routes>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/category" element={<Category />} />
              <Route exact path="/product" element={<Product />} />
              <Route exact path="/employee/add" element={<EmployeeList />} />
              <Route path="/logout" element={<Navigate to="/login" replace />} /> {/* Redirect to login on logout */}
              <Route path="*" element={<Navigate to="/home" />} /> {/* Redirect unknown paths */}
            </Routes>
          </div>
        </aside>
      ) : (
        // Login Page Layout (No Sidebar or Top Bar)
        <Routes>
          <Route
            exact
            path="/login"
            element={<LoginForm onLoginSuccess={loginChange} />}
          />
          <Route path="*" element={<Navigate to="/login"/>} /> {/* Redirect unknown paths */}
        </Routes>
      )}
    </Router>
  );
}

export default App;
