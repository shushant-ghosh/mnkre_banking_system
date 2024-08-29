import { message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Savings() {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({amount:10000, currency:"USD"});
    
    const handleFormData = (e) => {
        const {name, value} = e.target;
        setUserDetails({...userDetails, [name]: value});
    }

    const submitForm = (e) => {
        e.preventDefault();
        // Send form data to server
        console.log(userDetails);
        message.success("Successfully created new Savings account")
        navigate("/dashboard");

    }
    // FirstName, LastName, Date of Birth, and Address
  return (
    <div id="savings">
      <div className="contain">
        <div className="heading">
          <h1>Create Savings Account</h1>
        </div>
        <div className="form">
        <form>
              <div class="form-group py-3">
                <label for="exampleInputEmail1" className=" fw-bold">
                First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  class="form-control"
                  placeholder="Enter your first name"
                  onChange={(e) => {
                  handleFormData(e)  
                  }}
                />
              </div>
              <div class="form-group py-3">
                <label for="exampleInputEmail1" className=" fw-bold">
                Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  class="form-control"
                  placeholder="Enter your last name"
                  onChange={(e) => {
                  handleFormData(e)  
                  }}
                />
              </div>
              <div class="form-group py-3">
                <label for="exampleInputEmail1" className=" fw-bold">
                Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  class="form-control"
                  placeholder="Enter your DOB"
                  onChange={(e) => {
                  handleFormData(e)  
                  }}
                />
              </div>
              <div class="form-group py-3">
                <label for="exampleInputEmail1" className=" fw-bold">
                Address
                </label>
                <textarea
                  type="text"
                  name="address"
                  cols={6}
                  class="form-control"
                  placeholder="Enter your Address"
                  onChange={(e) => {
                  handleFormData(e)  
                  }}
                />
              </div>
          
              <div className="d-flex justify-content-center mt-5 pt-4">
                <button
                  class="btn btn-primary LoginButton"
                  onClick={(e) => submitForm(e, "Create")}
                >
                  {"Create Savings Account"}
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
}

export default Savings;
