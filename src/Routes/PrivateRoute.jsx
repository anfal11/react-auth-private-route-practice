import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = ({children}) => {

    const {user} = useContext(AuthContext);
    console.log("user", user);
    // if(user) {
    //     return children;
    // }
    // return <Navigate to="/login" />;
    return user ? children : <Navigate to="/login" />;

};
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };
export default PrivateRoute;