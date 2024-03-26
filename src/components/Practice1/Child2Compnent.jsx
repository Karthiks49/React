import { useEffect, useState } from "react";
import ButtonComponent from "../Practice2/ButtonComponent";
import AppButton from "./AppButton";

const Child2Component = ({count}) => {
    const [childCount, setchildCount] = useState(0);
    var handleIncrement = () => {
        setchildCount(childCount+1);
    }
    var handleDecrement = () => {
        setchildCount(childCount>0 ? childCount-1 : childCount);
    }
    useEffect(()=>{
        setchildCount(count);
    },[count]);
    return(
        <>
            <h2>Child2 Count: {childCount}</h2>
            <AppButton increment={handleIncrement} decrement={handleDecrement}/>
        </>
    )
}

export default Child2Component;