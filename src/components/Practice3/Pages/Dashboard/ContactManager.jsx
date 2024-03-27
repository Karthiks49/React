import { useEffect, useState } from "react";
import AppButton from "../../Components/AppButton";
import ContactList from "./ContactList";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import AppSearch from "../../Components/AppSearch";


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

const ContactManager = () => {
    const [apiContactList, setApiContactList] = useState([]);
    const [searchContactList, setSearchContactList] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const { data, isLoading, error } = useQuery('contacts', fetchData);
    const [isPageLoading, setIsPageLoading] = useState(false);
    var contactArray = [];

    useEffect(() => {
        if (data) {
            setApiContactList(data);
        }
    }, [data])

    useEffect(() => {
        setIsPageLoading(true)
        const timer = setTimeout(() => {
            setIsPageLoading(false);
        }, 750);
        return () => clearTimeout(timer);
    }, []);

    const handleSearch = (search) => {
        if (search && apiContactList.length > 0) {
            setIsSearch(true);
            contactArray = apiContactList.filter(contact =>
                contact.name.toLowerCase().includes(search.toLowerCase()) ||
                contact.email.includes(search) ||
                contact.mobileNumber.includes(search)
            );
            setSearchContactList(contactArray);
        }
        else {
            setIsSearch(false);
            setSearchContactList([]);
        }
    }

    return (
        <>
            {isPageLoading && <div className="blur-background">
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
                    {apiContactList.length ? <span >Total contacts: {apiContactList.length}</span> : ''}
                </div>
                <div className="contacts-manager-body">
                    {(apiContactList.length == 0) ? <div className="body-status"><span>Add new contact</span></div> : ''}
                    {(isSearch && searchContactList.length == 0) ? <div className="body-status"><span>No records found </span></div> : ''}
                    <div className="contact-details-body">
                        <ContactList contactList={isSearch ? searchContactList : apiContactList} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactManager;