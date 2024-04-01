import { useReducer } from "react";
import AppButton from "./AppButton";

const initialState = { input: '' }

const inputReducer = (state, action) => {
    switch (action.type) {
        case "SET_INPUT":
            return { ...state, input: action.payload };
        default:
            return state;
    }
}

const AppSearch = ({onSearch}) => {
    const [state, dispatch] = useReducer(inputReducer, initialState);
    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(state.input);
    }
    return(
        <div className="search-bar-container">
            <input onKeyDown={e => {e.key == 'Enter' && handleSearch(e)}} placeholder="Search User" type="text" className="search-input" onChange={(e) => e.target.value == '' ? onSearch('') : dispatch({ type: 'SET_INPUT', payload: e.target.value })}/>
            <AppButton className="search-btn" handleClick={handleSearch} description="Search"/>
        </div>
    );
}

export default AppSearch;