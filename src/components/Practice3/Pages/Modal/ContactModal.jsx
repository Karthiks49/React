import axios from "axios";
import { useMutation, useQuery } from "react-query";
import FormModal from "./FormModal";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Layouts/Header/Header";

const client = axios.create({
    baseURL: "https://65fd7a619fc4425c65320b76.mockapi.io/api",
    headers: {
        "Content-Type": "application/json",
        timeout: 2000
    }
})


const ContactModal = () => {
    const { state } = useLocation();
    var isView = state?.isView;
    var id = state?.id;
    var isDelete = state?.isDelete;
    var isNewContact = state?.isNewContact;




    return (
        <>
            <Header />
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