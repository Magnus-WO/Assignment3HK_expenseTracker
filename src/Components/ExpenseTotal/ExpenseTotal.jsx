import totalStyles from "./ExpenseTotal.module.css";

const ExpenseTotal = ({ totalExpenses }) => {
  return (
    <section className={totalStyles.totalExpenseContainer}>
      <div className={totalStyles.expenseHeaderContainer}>
        <p className={totalStyles.totalExpensesHeader}>Total expenses</p>
      </div>
      <div className={totalStyles.totalExpenseAmountContainer}>
        <h1
          className={totalStyles.totalExpenseHeader}
        >{`${totalExpenses} kr`}</h1>
      </div>
    </section>
  );
};

export default ExpenseTotal;
