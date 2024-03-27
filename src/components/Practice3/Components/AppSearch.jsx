import { useState } from "react";
import AppButton from "./AppButton";

const AppSearch = ({onSearch}) => {
    const [input, setInput] = useState('');
    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(input);
    }
    return(
        <div className="search-bar-container">
            <input onKeyDown={e => {e.key == 'Enter' && handleSearch(e)}} placeholder="Search User" type="text" className="search-input" onChange={(e) => e.target.value == '' ? onSearch('') : setInput(e.target.value)}/>
            <AppButton className="search-btn" handleClick={handleSearch} description="Search"/>
        </div>
    );
}

export default AppSearch;