import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./components.scss";
import Login from "./Components/Login/Login";
import Signup from "./Components/SignUp/Signup";
import Dashboard from "./Components/Dashboard/Dashboard";
import Savings from "./Components/Dashboard/Savings";
import AccountManagement from "./Components/Dashboard/AccountManagement";
import FundTransfers from "./Components/Dashboard/FundTransfers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-savings-account" element={<Savings />} />
        <Route path="/account-management" element={<AccountManagement />} />
        <Route path="/fund-transfer" element={<FundTransfers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
