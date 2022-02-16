import PropTypes from 'prop-types';
import styles from './button.module.css'


const Button = ({onClick}) => {
    return (
        <button onClick={onClick} className={styles.button} type='click'>Load more</button>
    )
}
export default Button;

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}