import { useState } from "react";

const useValidateForm = () => {
  const [formErrors, setFormErrors] = useState({});

  const validateForm = (expenseValues) => {
    let newErrors = {};
    if (!expenseValues.title.trim()) {
      newErrors.title = "Name of expense is required";
    }
    if (!expenseValues.amount) {
      newErrors.amount = "Expense amount is required";
    }
    if (!expenseValues.date.trim()) {
      newErrors.date = "The date for the expense is required";
    }
    if (!expenseValues.category) {
      newErrors.category = "Expense category is required";
    }
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return { validateForm, formErrors };
};

export default useValidateForm;
