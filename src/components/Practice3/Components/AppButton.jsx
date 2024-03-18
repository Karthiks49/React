const AppButton = (props) => {
    return(
        <div>
            <button className={props.className} onClick={props.handleClick} type={props.btnType} disabled={props.isDisable}>
                {props.icon}
                {props.description}
            </button>
        </div>
    )
}

export default AppButton;