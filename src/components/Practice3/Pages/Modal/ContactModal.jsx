import { useState } from "react";
import AppButton from "../../Components/AppButton";
import axios from "axios";
import { useMutation } from "react-query";
import { handleAddContact } from "../../Services/ContactManagerService";
import FormModal from "./FormModal";

const client = axios.create({
    baseURL: "https://reqres.in/api",
    headers: {
        "Content-Type": "application/json",
        timeout: 2000
    }
})

const ContactModal = ({ onSubmit, modalVisible, contactDetails, isView }) => {

    const mutation = useMutation((contact) => {
        return client.post('/users', contact)
            .then(response => response.data)
            .catch(error => {
                console.log('Error in adding contact:', error);
                throw error;
            });
    });

    const handleSubmit = (formData) => {
        mutation.mutate(formData);
    };
    if(mutation.data) {
        
        mutation.data.id = 0;
        console.log('mutation inside IFFFFf---DATA---', mutation.data);
        onSubmit(mutation.data);
    }
    console.log('inside add contact mutation--', mutation);
    console.log('isLoading---', mutation.isLoading);
    console.log('isError--', mutation.isError);
    console.log('error--', mutation.error);


    return (
        <>
            <div className="blur-background"></div>
            <div className={isView ? 'popup-content view-popup-content' : 'popup-content'}>
                {isView ?
                    <span className="modal-heading">Contact Details</span> :
                    <span className="modal-heading">{contactDetails.id ? 'Update contact' : 'Add new contact'}</span>
                }
                <FormModal onSubmit={handleSubmit} modalVisible={modalVisible} contactDetails={contactDetails} isView={isView}/>
            </div>
        </>

    );
}

export default ContactModal;