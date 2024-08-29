import React from 'react'
import { useNavigate } from 'react-router-dom'



function Dashboard() {
  const navigate = useNavigate()

  const redirect2 = (type) => {
    switch (type) {
      case "savings":
        navigate('/create-savings-account')
        break;
      case "account-management":
        navigate('/account-management')
        break;
      case "fund-transfer":
        navigate('/fund-transfer')
        break;
      default:
        break;
    }
  }
  return (
    <div id="dashboard">
      <div className="card" onClick={() => redirect2("savings")}>
        <h2>Create Savings Account</h2>
      </div>
      <div className="card" onClick={() => redirect2("account-management")}>
        <h2>Account Management</h2>
      </div>
      <div className="card" onClick={() => redirect2("fund-transfer")}>
        <h2>Fund Transfers</h2>
      </div>
      <div className="card">
        <h2>More Coming...</h2>
      </div>
    </div>
  )
}

export default Dashboard
