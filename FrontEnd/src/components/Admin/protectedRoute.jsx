const { use, useEffect } = require("react");
const { Navigate } = require("react-router-dom");

const PotectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        if (user ===null || user.role !== "admin") {
            Navigate("/");
        }
    }, [user]);
    return children;
}
export default PotectedRoute;