import expenseListStyles from "./ExpensesList.module.css";
import Button from "../Button/Button";
import ExpenseItem from "../ExpenseItem/ExpenseItem";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { useEffect, useState } from "react";

const ExpensesList = ({
  setIsAddingExpense,
  setIsDeletingExpense,
  setIsEditingExpense,
  setExpenseToEdit,
  dataFromDatabase,
  selectedMonth,
}) => {
  // Deleting from database
  const deleteExpense = async (id) => {
    setIsAddingExpense(false);
    setIsEditingExpense(false);
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

  // Populating edit form
  const populateEditForm = async (id) => {
    setIsAddingExpense(false);
    setIsDeletingExpense(false);
    setIsEditingExpense(true);

    let expenseToEditId = id;

    //
    try {
      const querySnapshot = await getDocs(collection(database, "expenses"));
      const expenseToEdit = querySnapshot.docs.find((doc) => {
        return doc.id === id;
      });
      setExpenseToEdit({ ...expenseToEdit.data(), id: expenseToEditId });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ul className={expenseListStyles.expenseList}>
      {dataFromDatabase.map((expenseItem) => {
        return (
          <ExpenseItem
            title={expenseItem.title}
            amount={expenseItem.amount}
            date={expenseItem.date}
            description={expenseItem.description}
            key={expenseItem.id}
            id={expenseItem.id}
            deleteExpense={() => {
              deleteExpense(expenseItem.id);
            }}
            populateEditForm={() => {
              populateEditForm(expenseItem.id);
            }}
          />
        );
      })}
    </ul>
  );
};

export default ExpensesList;
