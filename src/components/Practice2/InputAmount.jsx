import { useState } from "react"

const InputAmount = ({input, onChange}) => {
    return(
        <input className="input-amount" type="text" placeholder="Enter a amount" value={input} onChange={onChange}/>
    );
}

export default InputAmount;