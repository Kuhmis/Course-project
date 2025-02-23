import { Link } from "react-router-dom";
import "../index.css";

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to Form Builder</h1>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;
