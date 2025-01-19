import s from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
  return (
    <>
      <p className={s.errorMessage}>{message}</p>
    </>
  );
};

export default ErrorMessage;