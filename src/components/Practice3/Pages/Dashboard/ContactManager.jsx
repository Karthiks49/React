import { useEffect, useState } from "react";
import AppButton from "../../Components/AppButton";
import ContactList from "./ContactList";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";


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
    const { data, isLoading, error } = useQuery('contacts', fetchData);

    console.log('fakeAPI----data', data)
    console.log('data.json   apiCotactList---', apiContactList)

    useEffect(() => {
        console.log('inside useEffect of apiContactList----', isLoading);
        if (data) {
            setApiContactList(data);
        }
    }, [data])

    if (isLoading) {
        return <h2>Loading ...</h2>
    }

    return (
        <>
            <div className="bg-clr-1">
                <div className="ds-flex">
                    <div className="contact-title">Contacts</div>
                    <div className="add-contacts-container">
                        <div className="add-contact-button">
                            <Link to={'/contact-manager/form'} state={{ "isNewContact": true }}>
                                <AppButton className="add-contact-btn" icon={<span className="material-symbols-outlined">add_circle</span>} description={<span style={{ padding: '0 4px' }} >New</span>} />
                            </Link>
                        </div>
                    </div>
                </div>
                {/* <div className="search-container">
                    <AppSearch onSearch={handleSearch} />
                </div> */}
                <div className="contacts-manager-body">
                    {(apiContactList.length == 0) ? <div className="body-status"><span>Add new contact</span></div> : ''}
                    {/* {(isSearch && searchContactList.length == 0) ? <div className="body-status"><span>No records found </span></div> : ''} */}
                    <div className="contact-details-body">
                        {/* <ContactList contactList={isSearch ? searchContactList : apiContactList} handleEdit={handleUpdate} /> */}
                        <ContactList contactList={apiContactList} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactManager;