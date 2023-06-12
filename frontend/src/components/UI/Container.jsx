import containerClasses from './Container.module.css'

const Container = props => {
    const classes = `${containerClasses.container} ${props.className ? props.className : ''}`;

    return (
        <div className={classes}>
            {props.children}
        </div>
    )
}

export default Container