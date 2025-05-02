import expenseListStyles from "./ExpensesList.module.css";
import Button from "../Button/Button";
import Expense from "../Expense/Expense";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { useEffect, useState } from "react";

const ExpensesList = ({ setTotalExpenses }) => {
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

  // Adding total expenses from database
  const expensesArray = [];
  let sum = 0;
  const fetchExpenses = () => {
    dataFromDatabase.map((expense) => {
      expensesArray.push(parseFloat(expense.amount));
    });
    sum = expensesArray.reduce((a, b) => a + b, 0);
    setTotalExpenses(sum);
  };

  // console.log(dataFromDatabase);
  useEffect(() => {
    fetchData();
    fetchExpenses();
  });

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
