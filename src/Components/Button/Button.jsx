import buttonStyles from "./Button.module.css";

const Button = ({ children, type, className, onClick, ariaLabel }) => {
  return (
    <button
      className={`${buttonStyles.button} ${className}`}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
