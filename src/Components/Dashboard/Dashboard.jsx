import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  const redirect2savings = () => {
    navigate('/create-savings-account')
  }
  return (
    <div id="dashboard">
      <div className="card" onClick={redirect2savings}>
        <h2>Create Savings Account</h2>
      </div>
      <div className="card">
        <h2>More coming...</h2>
      </div>
    </div>
  )
}

export default Dashboard
