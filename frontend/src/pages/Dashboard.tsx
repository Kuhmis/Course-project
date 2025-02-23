import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container">
      <h2>Dashboard</h2>
      <Link to="/templates/create">Create New Template</Link>
      {/* Rest of your dashboard code */}
    </div>
  );
};

export default Dashboard;
