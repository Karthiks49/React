import { useState } from "react";
import InputAmount from "./InputAmount";
import ButtonComponent from "./ButtonComponent";

const Transactions = () => {
    const [input, setInput] = useState('');
    const [balance, setBalance] = useState(0);
    const [transactionHistory, setTransactionHistory] = useState([]);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    }

    const handleCredit = () => {
        if(parseInt(input)) {
            const creditAmount = parseInt(input);
            setBalance(prevBalance => prevBalance + creditAmount);
            setInput('');
            updateTransactionHistory(`Rs.${creditAmount} credited to the account - Balance: ${balance + creditAmount}`);
        } else {
            alert('Invalid Amount');
        }
    }

    const handleDebit = () => {
        if(parseInt(input)) {
            const debitAmount = parseInt(input);
            const newBalance = balance - debitAmount;
            if (newBalance >= 0) {
                setBalance(newBalance);
                setInput('');
                updateTransactionHistory(`Rs.${debitAmount} debited from the account - Balance: ${newBalance}`);
            } else {
                alert('Insufficient Balance');
            }
        } else {
            alert('Invalid Amount');
        }
    }

    const updateTransactionHistory = (message) => {
        setTransactionHistory(prevArray => [...prevArray, message]);
    }

    return (
        <div className="transaction-body">
            <div className="transaction-input-container">
                <h1>Balance: {balance}</h1>
                <InputAmount input={input} onChange={handleInputChange} />
                <ButtonComponent credit={handleCredit} debit={handleDebit} />
            </div>
            <div className="transaction-history">
                <h2>Transaction History</h2>
                <div>
                    {transactionHistory.map((item, index) => (
                        <h3 key={index}>{item}</h3>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Transactions;
