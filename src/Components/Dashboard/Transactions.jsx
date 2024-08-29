import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { getDocs, addDoc, collection } from "firebase/firestore";
import { useLocation, useParams } from "react-router-dom";

function Transactions() {
  const transactionsRef = collection(db, "transactions");

  const [transactionsList, setTransactionsList] = useState([]);
  let params = useParams();
  console.log(params);
  useEffect(() => {
    const getTransactions = async () => {
      try {
        let data = await getDocs(transactionsRef);
        data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log(data);
        let filter = data.filter((doc) => doc.from == params.id);
        console.log(filter)
        setTransactionsList(filter);
      } catch (err) {
        console.log(err);
      }
    };
    getTransactions();
  }, []);
  return (
    <div id="transactions">
      <div className="contain">
        <div className="heading">
          <h1>Transaction History</h1>
        </div>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactionsList.map((docs, key) => {
                return (
                  <tr key={docs.id}>
                    <td>{docs.from}</td>
                    <td>{docs.to}</td>
                    <td>{docs.amount}</td>
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

export default Transactions;
