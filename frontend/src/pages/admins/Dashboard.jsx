import React, { useEffect, useState } from "react";
import Navbar from "../../components/admin/Navbar";
import StatsCard from "../../components/admin/StatsCard";
import { getAdminProfile } from "../../api/auth";
import { getStats } from "../../api/product";

const Dashboard = () => {
  const [admin, setAdmin] = useState({});
  const [stats, setStats] = useState({ customers: 0, products: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const profile = await getAdminProfile();
      setAdmin(profile.message);

      const counts = await getStats();
      setStats(counts);
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    // call logout API and redirect to login page
  };

  return (
    <div>
      <Navbar adminName={admin.fullName} onLogout={handleLogout} />
      <div className="p-4 grid grid-cols-2 gap-4">
        <StatsCard title="Total Customers" count={stats.customers} />
        <StatsCard title="Total Products" count={stats.products} />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Products</h2>
        {/* Product add/search/edit/delete components here */}
      </div>
    </div>
  );
};

export default Dashboard;
