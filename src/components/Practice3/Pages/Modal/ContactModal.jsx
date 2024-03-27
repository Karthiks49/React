import axios from "axios";
import { useMutation, useQuery } from "react-query";
import FormModal from "./FormModal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Layouts/Header/Header";

const ContactModal = () => {
    const [isPageLoading, setIsPageLoading] = useState(false);
    var {id} = useParams();
    var {action} = useParams();
    var isView = false;
    var isDelete = false;
    var isNewContact = false;

    switch(action) {
        case ('view') :
            isView = true;
            break;
        case ('delete'):
            isView = true;
            isDelete = true;
            break;
        case ('create'):
            isNewContact = true;    
    }

    useEffect(() => {
        if(!isNewContact) {
            setIsPageLoading(true)
            const timer = setTimeout(() => {
                setIsPageLoading(false);
            }, 750);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <>
            <Header />
            {isPageLoading && <div className="blur-background">
                <div className="load-img load-rotate">
                    <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                        <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"></path>
                    </svg>
                </div>
            </div>}
            <div className={isView ? 'popup-content view-popup-content' : 'popup-content'}>
                {isView ?
                    <span className="modal-heading">{isDelete ? 'Confirm to delete the contact' : 'Contact Details'}</span> :
                    <span className="modal-heading">{!isNewContact ? 'Update contact' : 'Add new contact'}</span>
                }
                <FormModal isView={isView} id={id} isDelete={isDelete} isNewContact={isNewContact} />
            </div>
        </>

    );
}

export default ContactModal;