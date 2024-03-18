import { useState } from "react";
import ButtonComponent from "../Practice2/ButtonComponent";
import Child1Component from "./Child1Component";
import Child2Component from "./Child2Compnent";

const ParentComponent = () => {
    const [parentCount, setParentCount] = useState(0);
    var handleIncrement = () => {
        setParentCount(parentCount + 1);
    }
    var handleDecrement = () => {
        setParentCount(parentCount>0 ? parentCount - 1 : parentCount);
    }

    return (
        <>
            <h1>Count: {parentCount}</h1>
            <ButtonComponent increment={handleIncrement} decrement={handleDecrement} />
            <Child1Component count={parentCount}/>
            <Child2Component count={parentCount}/>
        </>
    );
}

export default ParentComponent;