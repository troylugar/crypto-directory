import classNames from 'classnames';
import styles from './Button.module.scss';

export default function Button({ onClick, className, children }) {
  return (
    <button onClick={onClick} className={classNames(styles.button, className)}>
      {children}
    </button>
  );
}
