import React, { useEffect, useState } from "react";
import _ from "lodash";
import { db } from "../../config/firebase";
import { getDocs, addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function AccountManagement() {
  const navigate = useNavigate();

  const accountsListRef = collection(db, "saving-accounts");
  const [accountsList, setAccountsList] = useState([]);
  const [accountsBySearch, setAccountsBySearch] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (event) => {
    let { value } = event.target;
    console.log({ value, accountsList });
    let filter = accountsList.filter(
      (account) =>
        account.firstName.includes(value) ||
        account.lastName.includes(value) ||
        String(account.accNo).includes(value) ||
        String(account.amount).includes(value)
    );
    setSearchInput(value);
    setAccountsBySearch(filter);
  };

  const redirect2 = (type, id) => {
    console.log("Click");
    switch (type) {
      case "transactions":
        navigate("/transactions/" + id);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const getUserList = async () => {
      // Read the user list
      try {
        let data = await getDocs(accountsListRef);
        data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log(data);
        setAccountsList(data);
      } catch (err) {
        console.error(err);
      }
    };
    getUserList();
  }, []);
  return (
    <div id="account-management">
      <div className="contain">
        <div className="heading">
          <h1>Accounts Listing</h1>
        </div>
        <div className="d-flex flex-column mt-5 gap-2">
          <label htmlFor="search">Search</label>
          <input
            className="form-control searchbox"
            type="text"
            name="search"
            id="search"
            placeholder="Search by name, account number, or balance"
            onChange={handleSearch}
          />
        </div>
        <div className="accountsTable">
          <table className="table">
            <thead>
              <tr>
                <th>Account Number</th>
                <th>Name</th>
                <th>Balance</th>
                <th>DOB</th>
                <th>Address</th>
                <th>Account Status</th>
                <th>Transactions</th>
              </tr>
            </thead>
            <tbody>
              {searchInput.length === 0 &&
                accountsList.map((account, key) => {
                  return (
                    <tr key={key}>
                      <td>{account.accNo}</td>
                      <td>{account.firstName + " " + account.lastName}</td>
                      <td>{account.amount}</td>
                      <td>{account.dob}</td>
                      <td>{account.address}</td>
                      <td>{account.accountStatus}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => redirect2("transactions", account.accNo)}
                        >
                          View Transactions
                        </button>
                      </td>
                    </tr>
                  );
                })}
              {searchInput.length > 0 &&
                accountsBySearch.map((account, key) => {
                  return (
                    <tr key={key}>
                      <td>{account.accNo}</td>
                      <td>{account.firstName + " " + account.lastName}</td>
                      <td>{account.amount}</td>
                      <td>{account.dob}</td>
                      <td>{account.address}</td>
                      <td>{account.accountStatus}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => redirect2("transactions", account.accNo)}
                        >
                          View Transactions
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AccountManagement;
