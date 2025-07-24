// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./views/Dashboard";
import Leads from "./views/Leads";
import Accounts from "./views/Accounts";
import Opportunities from "./views/Opportunities";
import Renewals from "./views/Renewals";
import Forecast from "./views/Forecast";
import Settings from "./views/Settings";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/renewals" element={<Renewals />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}