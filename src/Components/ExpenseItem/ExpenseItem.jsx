import expenseStyle from "./ExpenseItem.module.css";
import Button from "../Button/Button";

const ExpenseItem = ({
  title,
  amount,
  date,
  description,
  deleteExpense,
  populateEditForm,
  id,
}) => {
  return (
    <li className={expenseStyle.expenseItem}>
      <div className={expenseStyle.infoContainer}>
        <h3 className={expenseStyle.header}>Name</h3>
        <p className={expenseStyle.info}>{title}</p>
      </div>
      <div className={expenseStyle.infoContainer}>
        <h3 className={expenseStyle.header}>Amount</h3>
        <p className={expenseStyle.info}>{`${amount} kr`}</p>
      </div>
      <div className={expenseStyle.infoContainer}>
        <h3 className={expenseStyle.header}>Date</h3>
        <p className={expenseStyle.info}>{date}</p>
      </div>
      <div className={expenseStyle.infoContainer}>
        <h3 className={expenseStyle.header}>Description</h3>
        <p className={`${expenseStyle.info} ${expenseStyle.decription}`}>
          {description}
        </p>
      </div>
      <div className={expenseStyle.buttonsContainer}>
        <Button
          className={`${expenseStyle.button} ${expenseStyle.editButton}`}
          onClick={populateEditForm}
        >
          Edit
        </Button>
        <Button
          className={`${expenseStyle.button} ${expenseStyle.deleteButton}`}
          onClick={deleteExpense}
        >
          Delete
        </Button>
      </div>
    </li>
  );
};

export default ExpenseItem;
