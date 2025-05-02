import totalStyles from "./ExpenseTotal.module.css";

const ExpenseTotal = () => {
  return (
    <section className={totalStyles.totalExpenseContainer}>
      <div className={totalStyles.expenseHeaderContainer}>
        <p className={totalStyles.totalExpensesHeader}>Total expenses</p>
      </div>
      <div className={totalStyles.totalExpenseAmountContainer}>
        <h1 className={totalStyles.totalExpenseHeader}>10000 kr</h1>
      </div>
    </section>
  );
};

export default ExpenseTotal;
