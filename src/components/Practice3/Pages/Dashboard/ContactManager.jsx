import { useEffect, useState } from "react";
import AppButton from "../../Components/AppButton";
import ContactModal from "../Modal/ContactModal";
import ContactList from "./ContactList";
import AppSearch from "../../Components/AppSearch";
import Loader from "../../Components/Loader";
import {handleAddContact, handleUpdateContact, handleDeleteContact} from "../../Services/ContactManagerService"

const ContactManager = () => {
    const [isContactModal, setIsContactModal] = useState(false);
    const [contactList, setContactList] = useState([]);
    const [searchContactList, setSearchContactList] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [contact, setContact] = useState({});
    const [isView, setIsView] = useState(false);
    const [apiContactList, setApiContactList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    var contactArray = [];

    useEffect(() => {
        setApiContactList(contactList);
    }, [contactList])

    const handleContactModal = () => {
        setContact({});
        setIsContactModal(true);
    }

    const handleSubmit = (contactDetails) => {
        console.log('inside handleSubmit---', contactDetails);
        if (validateExistingContact(contactDetails)) {
            if (contactDetails.id) {
                setIsContactModal(false);
                setIsLoading(true);
                
                // handleUpdateContact(contactDetails)
                //     .then(response => {
                //         if (response.status == 200) {
                //             setContactList(contactList.map((contact, index) => {
                //                 if (contact.id == response.data.id) {
                //                     return response.data;
                //                 } else {
                //                     return contact;
                //                 }
                //             }));
                //         }
                //         setIsLoading(false);
                //     })
                //     .catch(error => {
                //         alert(error.message);
                //         setIsLoading(false);
                //     })

            } else {
                setIsContactModal(false);
                contactDetails.id = contactList.length + 1;
                setIsLoading(true);
                // handleAddContact(contactDetails)
                //     .then(response => {
                //         if (response.status == 201) {
                //             setContactList([...contactList, response.data]);
                //         }
                //         setIsLoading(false);
                //     })
                //     .catch(error => {
                //         alert(error.message);
                //         setIsLoading(false);
                //     })
            }
        }
    }

    const validateExistingContact = (contactDetails) => {
        for (let contact of contactList) {
            if ((contact.id != contactDetails.id) && (contactDetails.mobileNumber == contact.mobileNumber)) {
                alert('Mobile number already exist !!!');
                return false;
            } else if ((contact.id != contactDetails.id) && (contactDetails.email == contact.email)) {
                alert('Email already exist !!!');
                return false;
            }
        }
        return true;
    }

    const handleSearch = (search) => {
        if (search && contactList.length > 0) {
            setIsSearch(true);
            contactArray = contactList.filter((contact) => contact.name.toLowerCase().startsWith(search.toLowerCase()));
            if (!contactArray.length) {
                contactArray = contactList.filter((contact) => contact.email.startsWith(search));
            }
            setSearchContactList(contactArray);
        } else {
            setIsSearch(false);
            setSearchContactList([]);
        }
    }

    const handleDelete = (id) => {
        setIsLoading(true);
        handleDeleteContact(id)
            .then(response => {
                if (response.status == 204) {
                    setContactList(contactList.filter((person) => person.id !== id));
                }
                setIsLoading(false);
                mutaiosn
            })
            .catch(error => {
                alert(error.message);
                setIsLoading(false);
            })
    }

    const handleUpdate = (id) => {
        setContact(contactList.find(item => item.id == id));
        setIsContactModal(true);
    }

    const handleView = (id) => {
        setIsContactModal(true);
        setIsView(true);
        setContact(contactList.find(item => item.id == id));
    }

    const handleCloseModal = () => {
        setIsContactModal(false);
        setIsView(false);
        setIsSearch(false);
    }

    return (
        <>
            { isLoading ? <div className="loading-effect"><Loader classList='spinner' /></div> : '' }
            <div className="bg-clr-1">
                <div className="ds-flex">
                    <div className="contact-title">Contacts</div>
                    <div className="add-contacts-container">
                        <div className="add-contact-button">
                            <AppButton className="add-contact-btn" icon={<span className="material-symbols-outlined">add_circle</span>} description={<span style={{ padding: '0 4px' }} >New</span>} handleClick={handleContactModal} />
                            {isContactModal && <ContactModal onSubmit={handleSubmit} modalVisible={handleCloseModal} contactDetails={contact} isView={isView} />}
                        </div>
                    </div>
                </div>
                <div className="search-container">
                    <AppSearch onSearch={handleSearch} />
                </div>
                <div className="contacts-manager-body">
                    {(apiContactList.length == 0) ? <div className="body-status"><span>Add new contact</span></div> : ''}
                    {(isSearch && searchContactList.length == 0) ? <div className="body-status"><span>No records found </span></div> : ''}
                    <div className="contact-details-body">
                        <ContactList contactList={isSearch ? searchContactList : apiContactList} handleProfileDelete={handleDelete} handleEdit={handleUpdate} handleView={handleView} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactManager;