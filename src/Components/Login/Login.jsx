import React, { useEffect, useState } from "react";
import "../../components.scss";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { getDocs, addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

function Login() {
  const userRef = collection(db, "users");

  const [activeTab, setActiveTab] = useState("Login");
  const [usersList, setUsersList] = useState([]);
  const [loginDetails, setLoginDetails] = useState({});
  const [signUpDetails, setSignUpDetails] = useState({});

  const navigate = useNavigate();

  const handlePills = (type) => {
    if (type === "Login") {
      setActiveTab("Login");
    } else {
      setActiveTab("SignUp");
    }
    setLoginDetails({});
    setSignUpDetails({});
  };

  const createUser = async (credentials) => await addDoc(userRef, credentials);

  const submitForm = (e, type) => {
    e.preventDefault();
    console.log(type);
    console.log({ loginDetails, signUpDetails });
    if (type === "Login") {
      // Redirect to Dashboard if credentials are present in DB
      let filterData = usersList.filter(
        (user) =>
          user.name === loginDetails.username &&
          user.password === loginDetails.password
      );
      if (filterData.length > 0) {
        navigate("/dashboard");
      } else {
        message.error("Invalid Credentials!");
      }
    } else {
      // Redirect to Login details
      if (signUpDetails.password == signUpDetails.confirmPassword) {
        console.log("userList in else", usersList);
        createUser({
          name: signUpDetails.username,
          password: signUpDetails.password,
          isAdmin: usersList?.length > 0 ? false : true,
        });
        message.success("User Registered Successfully");
        setTimeout(() => {
          handlePills("Login");
        }, 1000);
      } else {
        message.error("Password does not match !");
      }
    }
  };

  useEffect(() => {
    const getUsersList = async () => {
      try {
        let users = await getDocs(userRef);
        let usersData = users.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsersList(usersData);
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    };
    getUsersList();
  }, []);

  return (
    <div id="login" className="fluid-container">
      <div className="Card">
        <div id="pillSelection" className="d-flex justify-content-center">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <a
                class={`nav-link ${activeTab === "Login" ? "active" : ""}`}
                onClick={() => handlePills("Login")}
              >
                Login
              </a>
            </li>
            <li class="nav-item">
              <a
                class={`nav-link ${activeTab === "SignUp" ? "active" : ""}`}
                onClick={() => handlePills("SignUp")}
              >
                SignUp
              </a>
            </li>
          </ul>
        </div>
        {activeTab === "Login" && (
          <div id="LoginForm">
            <form>
              <div class="form-group py-2">
                <label for="exampleInputEmail1" className="text-white fw-bold">
                  Username
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Username"
                  onChange={(e) => {
                    setLoginDetails({
                      ...loginDetails,
                      username: e.target.value,
                    });
                  }}
                />
              </div>
              <div class="form-group py-2">
                <label
                  for="exampleInputPassword1"
                  className="text-white fw-bold"
                >
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  onChange={(e) => {
                    setLoginDetails({
                      ...loginDetails,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="d-flex justify-content-center pt-4">
                <button
                  class="btn btn-primary LoginButton"
                  disabled={
                    loginDetails.username === "" || loginDetails.password === ""
                  }
                  onClick={(e) => submitForm(e, "Login")}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        )}
        {activeTab === "SignUp" && (
          <div id="SignUpForm">
            <form>
              <div class="form-group py-2">
                <label for="exampleInputEmail1" className="text-white fw-bold">
                  Username
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Create Username"
                  onChange={(e) => {
                    setSignUpDetails({
                      ...signUpDetails,
                      username: e.target.value,
                    });
                  }}
                />
              </div>
              <div class="form-group py-2">
                <label
                  for="exampleInputPassword1"
                  className="text-white fw-bold"
                >
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  onChange={(e) => {
                    setSignUpDetails({
                      ...signUpDetails,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
              <div class="form-group py-2">
                <label
                  for="exampleInputPassword1"
                  className="text-white fw-bold"
                >
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    setSignUpDetails({
                      ...signUpDetails,
                      confirmPassword: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="d-flex justify-content-center pt-4">
                <button
                  class="btn btn-primary LoginButton"
                  disabled={
                    signUpDetails.username === "" || signUpDetails.password === "" || signUpDetails.confirmPassword === ""
                  }
                  onClick={(e) => submitForm(e, "SignUp")}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
