import { useState } from "react";
import styles from "./App.module.css";

//Importing components
import Button from "./Components/Button/Button";
import Modal from "./Components/Modal/Modal";
import ExpensesList from "./Components/Expenses/ExpensesList";
import ExpenseTotal from "./Components/ExpenseTotal/ExpenseTotal";

function App() {
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [isRendering, setIsRendering] = useState(false);

  const openCloseAddModal = () => {
    if (isAddingExpense) {
      setIsAddingExpense(false);
    } else {
      setIsAddingExpense(true);
    }
  };
  return (
    <div className={styles.rootContainer}>
      <div className={styles.appContainer}>
        <section className={styles.totalExpensesContainer}>
          <ExpenseTotal></ExpenseTotal>
        </section>
        <section className={styles.individualExpensesContainer}>
          <ExpensesList isRendering={isRendering}></ExpensesList>
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
