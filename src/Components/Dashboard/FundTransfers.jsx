import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { getDocs, addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { message } from "antd";

function FundTransfers() {
  const userListRefference = collection(db, "saving-accounts");
  const transactionsRef = collection(db, "transactions");
  const [userDetails, setUserDetails] = useState([]);
  const [fromUser, setFromUser] = useState({});
  const [toUser, setToUser] = useState({});
  const [transactionDetails, setTransactionDetails] = useState({
    from: "",
    to: "",
    amount: "",
  });

  const handleTransactionDetails = (event) => {
    const { name, value } = event.target;
    if(name === "from"){
        setFromUser(userDetails.find((user) => user.accNo == value));
    }
    if(name === "to"){
        setToUser(userDetails.find((user) => user.accNo == value));
    }


    setTransactionDetails({
      ...transactionDetails,
      [event.target.name]: event.target.value,
    });
  };

  const transferFunds = async (input) => {
      try {
        let fromIndex = userDetails.findIndex(user => user.accNo == fromUser.accNo);
        let toIndex = userDetails.findIndex(user => user.accNo == toUser.accNo);
        let temp = [...userDetails]
        temp[fromIndex].amount -= parseInt(input.amount);
        temp[toIndex].amount += parseInt(input.amount);
        console.log(temp)
        const docRefFrom = doc(db, "saving-accounts", temp[fromIndex].id);
        const docRefTo = doc(db, "saving-accounts", temp[toIndex].id);
        await updateDoc(docRefFrom,{amount:temp[fromIndex].amount});
        await updateDoc(docRefTo,{amount:temp[toIndex].amount});
        await addDoc(transactionsRef, input);
        message.success("Transaction successfully")
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getUserList = async () => {
      // Read the user list
      try {
        let userList = await getDocs(userListRefference);
        userList = userList.docs.map((doc) => ({ ...doc.data(), id: doc.id}));
        setUserDetails(userList);
      } catch (err) {
        console.error(err);
      }
    };
    getUserList();
  }, []);

  return (
    <div id="fund-transfer">
      <div className="contain">
        <div className="heading">
          <h1>Transfer Funds</h1>
        </div>
        <div className="form d-flex flex-column">
          <div className="form-group d-flex flex-column gap-2 my-1">
            <label htmlFor="transfer-to">Transfer From:</label>
            <input
              type="text"
              id="transfer-from"
              className="form-control"
              placeholder="Enter Account Number"
              name="from"
              onChange={handleTransactionDetails}
            />
          </div>
          <div className="form-group d-flex flex-column gap-2 my-1">
            <label htmlFor="transfer-to">Transfer To:</label>
            <input
              type="text"
              id="transfer-to"
              className="form-control"
              placeholder="Enter Account Number"
              name="to"
              onChange={handleTransactionDetails}
            />
          </div>
          <div className="form-group d-flex flex-column gap-2 my-1">
            <label htmlFor="transfer-amount">Transfer Amount:</label>
            <input
              type="number"
              id="transfer-amount"
              className="form-control"
              placeholder="Enter Amount"
              name="amount"
              onChange={handleTransactionDetails}
            />
            {fromUser?.amount<transactionDetails?.amount &&<small className="text-danger">{"Amount Exceeded the limit"}</small>}
          </div>
          <div className="form-group d-flex flex-row justify-content-center mt-5">
            <button
              className="btn btn-primary"
              disabled={fromUser?.amount<transactionDetails?.amount}
              onClick={() => transferFunds(transactionDetails)}
            >
              Transfer Funds
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FundTransfers;
