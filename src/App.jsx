import { useState } from "react";
import styles from "./App.module.css";

//Importing components
import Button from "./Components/Button/Button";
import Modal from "./Components/Modal/Modal";

function App() {
  const [isAddingExpense, setIsAddingExpense] = useState(false);

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
          How much did I spend?
        </section>
        <section className={styles.individualExpensesContainer}>
          What did I spend it on?
        </section>
        <Button
          onClick={openCloseAddModal}
          className={styles.openAddModalButton}
        >
          Add
        </Button>
        {isAddingExpense && <Modal closeModal={openCloseAddModal}></Modal>}
      </div>
    </div>
  );
}

export default App;
