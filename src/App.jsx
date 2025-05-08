import { useRef, useState } from "react";
import styles from "./App.module.css";

//Importing components
import Button from "./Components/Button/Button";
import Modal from "./Components/Modal/Modal";
import ExpensesList from "./Components/Expenses/ExpensesList";
import ExpenseTotal from "./Components/ExpenseTotal/ExpenseTotal";

function App() {
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [isDeletingExpense, setIsDeletingExpense] = useState(false);
  const [isEditingExpense, setIsEditingExpense] = useState(false);

  const [expenseInfo, setExpenseInfo] = useState({
    title: "",
    amount: 0,
    date: "",
    category: "",
    description: "",
  });
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expenseToEdit, setExpenseToEdit] = useState({
    title: "",
    amount: 0,
    date: "",
    category: "",
    description: "",
    id: "",
  });

  const openCloseAddModal = () => {
    if (isAddingExpense) {
      setIsAddingExpense(false);
      setIsEditingExpense(false);
    } else {
      setIsAddingExpense(true);
    }
  };
  const openCloseEditModal = () => {
    if (isEditingExpense) {
      setIsEditingExpense(false);
    } else {
      setIsEditingExpense(true);
    }
  };
  return (
    <div className={styles.rootContainer}>
      <div className={styles.appContainer}>
        <section className={styles.totalExpensesContainer}>
          <ExpenseTotal totalExpenses={totalExpenses}></ExpenseTotal>
        </section>
        <section className={styles.individualExpensesContainer}>
          <ExpensesList
            setTotalExpenses={setTotalExpenses}
            setIsAddingExpense={setIsAddingExpense}
            setIsDeletingExpense={setIsDeletingExpense}
            setIsEditingExpense={setIsEditingExpense}
            setExpenseToEdit={setExpenseToEdit}
            expenseToEdit={expenseToEdit}
          ></ExpensesList>
        </section>
        <Button
          onClick={openCloseAddModal}
          className={styles.openAddModalButton}
        >
          Add
        </Button>
        {isAddingExpense && (
          <Modal
            closeModal={openCloseAddModal}
            setExpenseInfo={setExpenseInfo}
            expenseInfo={expenseInfo}
            setIsEditingExpense={setIsEditingExpense}
          ></Modal>
        )}
        {isEditingExpense && (
          <Modal
            closeModal={openCloseEditModal}
            expenseToEdit={expenseToEdit}
            isEditingExpense={isEditingExpense}
            setIsEditingExpense={setIsEditingExpense}
            setExpenseToEdit={setExpenseToEdit}
          ></Modal>
        )}
      </div>
    </div>
  );
}

export default App;
