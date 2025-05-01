import modalStyles from "./Modal.module.css";
import Button from "../Button/Button";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { useState } from "react";

const Modal = ({ closeModal }) => {
  // Fetching expense info and storing in an object
  const [expenseInfo, setExpenseInfo] = useState({
    title: "",
    amount: 0,
    date: "",
    category: "",
    description: "",
  });

  // Retrieving form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Saving to firestore
  const saveToFirestore = async (expense) => {
    try {
      const docRef = await addDoc(collection(database, "expenses"), expense);
      console.log(
        `expense has been added to firestore with the id ${docRef.id}`
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handling form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveToFirestore(expenseInfo);
      console.log("expense data:", expenseInfo);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={modalStyles.modal}>
      <form className={modalStyles.form} onSubmit={handleSubmit}>
        <h1 className={modalStyles.formTitle}>Enter your expense</h1>
        {/* Title */}
        <div className={modalStyles.inputContainer}>
          <label htmlFor="title" className={modalStyles.label}>
            Expense title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className={modalStyles.input}
            placeholder="Name of the expense"
            onChange={handleChange}
          />
        </div>
        {/* Amount */}
        <div className={modalStyles.inputContainer}>
          <label htmlFor="amount" className={modalStyles.label}>
            {`Expense amount (kr)`}
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            className={modalStyles.input}
            placeholder=""
            onChange={handleChange}
          />
        </div>
        {/* Date */}
        <div className={modalStyles.inputContainer}>
          <label htmlFor="date" className={modalStyles.label}>
            Expense date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className={modalStyles.input}
            placeholder="Date of the expense"
            onChange={handleChange}
          />
        </div>
        {/* Category */}
        <div className={modalStyles.inputContainer}>
          <label htmlFor="category" className={modalStyles.label}>
            Expense category
          </label>
          <select
            name="category"
            id="category"
            className={modalStyles.input}
            onChange={handleChange}
          >
            <option value="">Select:</option>
            <option value="utilities">Utilities</option>
            <option value="housing">Housing</option>
            <option value="grocery">Grocery</option>
            <option value="transport">Transport</option>
            <option value="clothing">Clothing</option>
          </select>
        </div>
        {/* Description */}
        <div className={modalStyles.inputContainer}>
          <label htmlFor="description" className={modalStyles.label}>
            Expense description
          </label>
          <textarea
            name="description"
            id="description"
            rows={5}
            className={`${modalStyles.input} ${modalStyles.textarea}`}
            placeholder="Optional"
            onChange={handleChange}
          ></textarea>
        </div>
        <Button className={modalStyles.submitButton}>Add expense</Button>

        <Button
          type="button"
          onClick={closeModal}
          className={modalStyles.closeModalButton}
        >
          Close
        </Button>
      </form>
    </div>
  );
};

export default Modal;
