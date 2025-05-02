import expenseListStyles from "./ExpensesList.module.css";
import Button from "../Button/Button";
import Expense from "../Expense/Expense";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { useEffect, useState } from "react";

const ExpensesList = ({
  setTotalExpenses,
  isAddingExpense,
  setIsAddingExpense,
  isDeletingExpense,
  setIsDeletingExpense,
}) => {
  // Fetching from database
  const [dataFromDatabase, setDataFromDatabase] = useState([]);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, "expenses"));
      const expenseData = querySnapshot.docs.map((expense) => ({
        id: expense.id,
        ...expense.data(),
      }));
      setDataFromDatabase(expenseData);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Adding total expenses from database
  const expensesArray = [];
  let sum = 0;
  const fetchTotalExpenses = () => {
    dataFromDatabase.map((expense) => {
      expensesArray.push(parseFloat(expense.amount));
    });
    sum = expensesArray.reduce((a, b) => a + b, 0);
    setTotalExpenses(sum);
  };

  // Deleting from database
  const deleteExpense = async (id) => {
    setIsAddingExpense(false);
    setIsDeletingExpense(true);
    try {
      const docRef = doc(database, "expenses", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsDeletingExpense(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTotalExpenses();
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
            deleteExpense={() => {
              deleteExpense(expenseItem.id);
            }}
          />
        );
      })}
    </ul>
  );
};

export default ExpensesList;
