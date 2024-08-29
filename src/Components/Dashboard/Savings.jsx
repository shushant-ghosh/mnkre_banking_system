import { message } from "antd";
import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { getDocs, addDoc, collection } from "firebase/firestore";
// import db from "../../db.json";

function Savings() {
  const navigate = useNavigate();
  const userListRefference = collection(db, "saving-accounts");
  const [userDetails, setUserDetails] = useState([]);
  const [formFields, setFormFields] = useState({
    amount: 10000,
    currency: "USD",
    accountStatus: "active",
  });

  useEffect(() => {
    const getUserList = async () => {
      // Read the user list
      try {
        let userList = await getDocs(userListRefference);
        userList = userList.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log(userList);
        setUserDetails(userList);
      } catch (err) {
        console.error(err);
      }
    };
    getUserList();
  }, []);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const generateUID = () => {
    try {
      return parseInt(userDetails[0].accNo) + 1;
    } catch (err) {
      console.error(err);
      return "10010000001";
    }
  };

  const createNewUser = async (newData) => {
    try {
      await addDoc(userListRefference, newData);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const submitForm = (e) => {
    e.preventDefault();
    try {
      let UID = generateUID();
      let newData = { ...formFields, accNo: UID };
      console.log(newData);
      createNewUser(newData);

      message.success("Successfully created new Savings account");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error(error);
      message.error("Failed to create new Savings account");
    }
  };
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
                  handleFormData(e);
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
                  handleFormData(e);
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
                  handleFormData(e);
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
                  handleFormData(e);
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
