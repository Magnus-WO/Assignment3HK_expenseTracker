import modalStyles from "./Modal.module.css";
import Button from "../Button/Button";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { useState } from "react";
import useValidateForm from "../../Hooks/useValidateForm";

const Modal = ({
  closeModal,
  expenseToEdit,
  isEditingExpense,
  setIsEditingExpense,
  setExpenseToEdit,
}) => {
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
    if (!isEditingExpense) {
      const { name, value } = e.target;
      setExpenseInfo((prev) => ({ ...prev, [name]: value }));
    } else {
      const { name, value } = e.target;
      setExpenseToEdit((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Destructuring form validation
  const { validateForm, formErrors } = useValidateForm();

  // Saving to firestore
  const saveToFirestore = async (expenseInfo) => {
    try {
      const docRef = await addDoc(
        collection(database, "expenses"),
        expenseInfo
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  // Updating expense
  const updateExpense = async (id) => {
    const updatedExpense = {
      title: expenseToEdit.title,
      amount: expenseToEdit.amount,
      date: expenseToEdit.date,
      category: expenseToEdit.category,
      description: expenseToEdit.description,
      id: expenseToEdit.id,
    };

    const docRef = doc(database, "expenses", id);
    await updateDoc(docRef, updatedExpense);
  };

  // Handling form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(expenseInfo)) {
      console.log("form not valid");
      return;
    }
    if (!isEditingExpense) {
      try {
        await saveToFirestore(expenseInfo);
        console.log("expense data:", expenseInfo);
        closeModal();
      } catch (error) {
        console.log(error.message);
      }
    } else if (isEditingExpense) {
      try {
        await updateExpense(expenseToEdit.id);
        setIsEditingExpense(false);
      } catch (error) {
        console.log(error);
        console.log(error.message);
      }
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
            maxLength={10}
            className={modalStyles.input}
            placeholder="Name of the expense"
            value={isEditingExpense ? expenseToEdit.title : expenseInfo.title}
            onChange={handleChange}
          />
          {formErrors && (
            <p className={modalStyles.errorMessage}>{formErrors.title}</p>
          )}
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
            maxLength={10}
            className={modalStyles.input}
            placeholder=""
            value={isEditingExpense ? expenseToEdit.amount : expenseInfo.amount}
            onChange={handleChange}
          />
          {formErrors && (
            <p className={modalStyles.errorMessage}>{formErrors.amount}</p>
          )}
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
            value={isEditingExpense ? expenseToEdit.date : expenseInfo.date}
            onChange={handleChange}
          />
          {formErrors && (
            <p className={modalStyles.errorMessage}>{formErrors.date}</p>
          )}
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
            value={
              isEditingExpense ? expenseToEdit.category : expenseInfo.category
            }
          >
            <option value="">Select:</option>
            <option value="utilities">Utilities</option>
            <option value="housing">Housing</option>
            <option value="grocery">Grocery</option>
            <option value="transport">Transport</option>
            <option value="clothing">Clothing</option>
          </select>
          {formErrors && (
            <p className={modalStyles.errorMessage}>{formErrors.category}</p>
          )}
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
            value={
              isEditingExpense
                ? expenseToEdit.description
                : expenseInfo.description
            }
            onChange={handleChange}
          ></textarea>
        </div>
        <Button className={modalStyles.submitButton} type="submit">
          {isEditingExpense ? "Confirm edit" : "Add expense"}
        </Button>

        <Button
          type="button"
          onClick={() => {
            closeModal();
            setIsEditingExpense(false);
          }}
          className={modalStyles.closeModalButton}
        >
          Close
        </Button>
      </form>
    </div>
  );
};

export default Modal;
