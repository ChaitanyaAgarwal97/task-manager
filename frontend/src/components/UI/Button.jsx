import buttonClasses from './Button.module.css';

const Button = (props) => {
    const classes = `${buttonClasses["btn"]} ${props.className ? props.className : ""}`;

    return <button type={props.type} onClick={props.onClick} className={classes}>{props.children}</button>
}

export default Button;