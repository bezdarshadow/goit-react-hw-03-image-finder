import PropTypes from 'prop-types';
import styles from './button.module.css'


const Button = ({onClick, text}) => {
    return (
        <button onClick={onClick} className={styles.button} type='click'>{text}</button>
    )
}
export default Button;

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}