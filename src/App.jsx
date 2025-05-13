import { useRef, useState } from "react";
import styles from "./App.module.css";

//Importing components
import Button from "./Components/Button/Button";
import Modal from "./Components/Modal/Modal";
import ExpensesList from "./Components/Expenses/ExpensesList";
import ExpenseTotal from "./Components/ExpenseTotal/ExpenseTotal";
import Filter from "./Components/Filter/Filter";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "./firebaseConfig";

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

  const [dataFromDatabase, setDataFromDatabase] = useState([]);

  // Filtering state
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [filteredExpenses, setFilteredExpenses] = useState([]);

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
  // Fetching from database
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
    filteredExpenses.map((expense) => {
      expensesArray.push(parseFloat(expense.amount));
    });
    sum = expensesArray.reduce((a, b) => a + b, 0);
    setTotalExpenses(sum);
  };

  // Fetching value from filter element
  const handleFiltering = (e) => {
    const monthFilter = parseInt(e.target.value);

    if (isNaN(monthFilter)) {
      setSelectedMonth(null);
    } else {
      setSelectedMonth(monthFilter);
    }
  };

  // Filtering based on month
  const filterByMonth = (dataFromDatabase, selectedMonth) => {
    return dataFromDatabase.filter((expense) => {
      const date = new Date(expense.date);
      if (isNaN(date)) return false;

      const month = date.getMonth();
      return month === selectedMonth;
    });
  };
  // Getting data from database
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [isAddingExpense, isDeletingExpense, isEditingExpense]);

  // getting total expenses
  useEffect(() => {
    fetchTotalExpenses();
  }, [filteredExpenses]);

  // Displaying based on filtering
  useEffect(() => {
    if (selectedMonth !== null) {
      const filtered = filterByMonth(dataFromDatabase, selectedMonth);
      setFilteredExpenses(filtered);
    } else {
      setFilteredExpenses(dataFromDatabase);
    }
  }, [selectedMonth, dataFromDatabase]);

  return (
    <div className={styles.rootContainer}>
      <div className={styles.appContainer}>
        <section className={styles.totalExpensesContainer}>
          <ExpenseTotal totalExpenses={totalExpenses}></ExpenseTotal>
        </section>
        <section className={styles.filterContainer}>
          <Filter handleFiltering={handleFiltering}></Filter>
        </section>
        <section className={styles.individualExpensesContainer}>
          <ExpensesList
            setTotalExpenses={setTotalExpenses}
            setIsAddingExpense={setIsAddingExpense}
            setIsDeletingExpense={setIsDeletingExpense}
            setIsEditingExpense={setIsEditingExpense}
            setExpenseToEdit={setExpenseToEdit}
            expenseToEdit={expenseToEdit}
            dataFromDatabase={filteredExpenses}
            setDataFromDatabase={setDataFromDatabase}
            selectedMonth={selectedMonth}
            isEditing={isEditingExpense}
            isAddingExpense={isAddingExpense}
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
