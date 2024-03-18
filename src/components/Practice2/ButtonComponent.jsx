const ButtonComponent = ({credit, debit}) => {
    return(
        <div>
            <button onClick={credit}>Credit</button>
            <button onClick={debit}>Debit</button>
        </div>
    )
}



export default ButtonComponent;