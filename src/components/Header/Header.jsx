import { useState, useEffect, useContext } from "react";
import { IoReorderThree } from "react-icons/io5";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home"); // Set initial active link to "Home"
  const location = useLocation();

  useEffect(() => {
    // Update the active link when the location changes
    if (location.pathname === "/") {
      setActiveLink("Home");
    } else if (location.pathname === "/login") {
      setActiveLink("Login");
    } else if (location.pathname === "/register") {
      setActiveLink("Register");
    } else if (location.pathname === "/orders"){
      setActiveLink("Orders");
    } else {
      setActiveLink(""); // No active link for other routes
    }
  }, [location.pathname]);

  const {user, logOut} = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
    .then (()=> {
      console.log("user logged out");
    })
    .catch (error => {
      console.log(error);
    })
  }
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-white mb-3 shadow-xl">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full lg:w-auto lg:static lg:block lg:justify-start">
            <NavLink
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-gray-600"
              to="/"
            >
              <span className="text-sky-600">Funny</span>
              <span className="text-green-500">Auth</span>
              <span className="text-amber-500">React</span>
            </NavLink>
            <button
              className="text-gray-600 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <IoReorderThree></IoReorderThree>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center justify-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto font-bold">
              <li className="lg:mx-4">
                <NavLink
                  to="/"
                  className={`text-gray-600 ${
                    activeLink === "Home" ? "border-b-4 border-red-600" : ""
                  }`}
                >
                  Home
                </NavLink>
              </li>
              <li className="lg:mx-4">
                <NavLink
                  to="/login"
                  className={`text-gray-600  ${
                    activeLink === "Login" ? "border-b-4 border-red-600" : ""
                  }`}
                >
                  Log In
                </NavLink>
              </li>
              <li className="lg:mx-4">
                <NavLink
                  to="/register"
                  className={`text-gray-600  ${
                    activeLink === "Register" ? "border-b-4 border-red-600" : ""
                  }`}
                >
                  Register
                </NavLink>
              </li>
              <li className="lg:mx-4">
                <NavLink
                  to="/orders"
                  className={`text-gray-600  ${
                    activeLink === "Orders" ? "border-b-4 border-red-600" : ""
                  }`}
                >
                  Orders
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="lg:flex-grow"></div>
          
          <div className="lg:ml-4">
          {
              user ? <>
              <span>{user.email}</span> 
              <button
              className="text-gray-600 cursor-pointer text-sm leading-none px-3 py-1 border border-solid  rounded bg-transparent lg:ml-4 font-bold shadow-xl hover:shadow-none outline-none focus:outline-none hover:border-transparent"
              type="button"
              onClick={handleLogOut}
            >
            
              Sign Out
            </button>
              </> 
              : <Link to="/login" className="text-gray-600 cursor-pointer text-sm leading-none px-3 py-1 border border-solid  rounded bg-transparent lg:ml-4 font-bold shadow-xl hover:shadow-none outline-none focus:outline-none hover:border-transparent">Sign In</Link>
                
            }
            
          </div>
        </div>
      </nav>
    </>
  );
}
