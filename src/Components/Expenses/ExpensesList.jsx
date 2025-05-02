import expenseListStyles from "./ExpensesList.module.css";
import Button from "../Button/Button";
import Expense from "../Expense/Expense";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { useEffect, useState } from "react";

const ExpensesList = ({ isRendering }) => {
  // Fetching from database
  const [dataFromDatabase, setDataFromDatabase] = useState([]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(database, "expenses"));
    const expenseData = querySnapshot.docs.map((expense) => ({
      id: expense.id,
      ...expense.data(),
    }));

    setDataFromDatabase(expenseData);
  };

  useEffect(() => {
    fetchData();
    console.log("i am rendering");
  }, [isRendering]);
  return (
    <ul className={expenseListStyles.expenseList}>
      {dataFromDatabase.map((expenseItem) => {
        return (
          <Expense
            title={expenseItem.title}
            amount={expenseItem.amount}
            date={expenseItem.date}
            description={expenseItem.description}
            key={expenseItem.id}
          />
        );
      })}
    </ul>
  );
};

export default ExpensesList;
