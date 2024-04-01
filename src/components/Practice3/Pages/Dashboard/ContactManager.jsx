import { useEffect, useReducer } from "react";
import AppButton from "../../Components/AppButton";
import ContactList from "./ContactList";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import AppSearch from "../../Components/AppSearch";
import { ContactListContext } from "../../assets/AppContext";


const client = axios.create({
    baseURL: "https://65fd7a619fc4425c65320b76.mockapi.io/api",
    headers: {
        "Content-Type": "application/json",
        timeout: 2000
    }
})

const fetchData = () => {
    return client.get('/contacts')
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log('Error in getting contacts', error);
        })
};

const initialValue = {
    apiContactList: [],
    searchContactList: [],
    isSearch: false,
    isPageLoading: false
}

const contactManagerReducer = (state, action) => {
    switch (action.type) {
        case "setApiContactList":
            return { ...state, apiContactList: action.payload }
        case "setSearchContactList":
            return { ...state, searchContactList: action.payload }
        case "setIsSearch":
            return { ...state, isSearch: action.payload }
        case "setIsPageLoading":
            return { ...state, isPageLoading: action.payload }
        default :
            return state;
    }
}

const ContactManager = () => {
    const { data } = useQuery('contacts', fetchData);
    var contactArray = [];

    const [ state, dispatch ] = useReducer(contactManagerReducer, initialValue)

    useEffect(() => {
        if (data) {
            dispatch({type: 'setApiContactList', payload: data})
        }
    }, [data])

    useEffect(() => {
        dispatch({type: 'setIsPageLoading', payload: true});
        const timer = setTimeout(() => {
            dispatch({type: 'setIsPageLoading', payload: false});
        }, 750);
        return () => clearTimeout(timer);
    }, []);

    const handleSearch = (search) => {
        if (search && state.apiContactList.length > 0) {
            dispatch({type: 'setIsSearch', payload: true});
            contactArray = state.apiContactList.filter(contact =>
                contact.name.toLowerCase().includes(search.toLowerCase()) ||
                contact.email.includes(search) ||
                contact.mobileNumber.includes(search)
            );
            dispatch({type: 'setSearchContactList', payload: contactArray});
        }
        else {
            dispatch({type: 'setIsSearch', payload: false});
            dispatch({type: 'setSearchContactList', payload: []})
        }
    }

    return (
        <>
            {state.isPageLoading && <div className="blur-background">
                <div className="load-img load-rotate">
                    <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                        <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"></path>
                    </svg>
                </div>
            </div>}
            <div className="bg-clr-1">
                <div className="ds-flex">
                    <div className="contact-title">Contacts</div>
                    <div className="add-contacts-container">
                        <div className="add-contact-button">
                            <Link to={'/contact-manager/contact/create'}>
                                <AppButton className="add-contact-btn" icon={<span className="material-symbols-outlined">add_circle</span>} description={<span style={{ padding: '0 4px' }} >New</span>} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="search-container">
                    <AppSearch onSearch={handleSearch} />
                </div>
                <div className="contact-lenght-display">
                    {state.apiContactList.length ? <span >Total contacts: {state.apiContactList.length}</span> : ''}
                </div>
                <div className="contacts-manager-body">
                    {(state.apiContactList.length == 0) ? <div className="body-status"><span>Add new contact</span></div> : ''}
                    {(state.isSearch && state.searchContactList.length == 0) ? <div className="body-status"><span>No records found </span></div> : ''}
                    <div className="contact-details-body">
                        <ContactListContext.Provider value={state.isSearch ? state.searchContactList : state.apiContactList}>
                            <ContactList />
                        </ContactListContext.Provider>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactManager;