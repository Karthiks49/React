import { useState } from "react";
import Child1Component from "./Child1Component";
import Child2Component from "./Child2Compnent";
import AppButton from "./AppButton";

const ParentComponent = () => {
    const [parentCount, setParentCount] = useState(0);
    var handleIncrement = () => {
        setParentCount(parentCount + 1);
    }
    var handleDecrement = () => {
        setParentCount(parentCount>0 ? parentCount - 1 : parentCount);
    }

    return (
        <div className="parent-main-page">
            <h1>Count: {parentCount}</h1>
            <AppButton increment={handleIncrement} decrement={handleDecrement} />
            <Child1Component count={parentCount}/>
            <Child2Component count={parentCount}/>
        </div>
    );
}

export default ParentComponent;