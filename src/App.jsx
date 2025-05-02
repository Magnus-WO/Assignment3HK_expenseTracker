import { useState } from "react";
import styles from "./App.module.css";

//Importing components
import Button from "./Components/Button/Button";
import Modal from "./Components/Modal/Modal";
import ExpensesList from "./Components/Expenses/ExpensesList";
import ExpenseTotal from "./Components/ExpenseTotal/ExpenseTotal";

function App() {
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const openCloseAddModal = () => {
    if (isAddingExpense) {
      setIsAddingExpense(false);
      setIsRendering(true);
    } else {
      setIsAddingExpense(true);
      setIsRendering(false);
    }
  };
  return (
    <div className={styles.rootContainer}>
      <div className={styles.appContainer}>
        <section className={styles.totalExpensesContainer}>
          <ExpenseTotal totalExpenses={totalExpenses}></ExpenseTotal>
        </section>
        <section className={styles.individualExpensesContainer}>
          <ExpensesList setTotalExpenses={setTotalExpenses}></ExpensesList>
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
            setIsRendering={setIsRendering}
          ></Modal>
        )}
      </div>
    </div>
  );
}

export default App;
