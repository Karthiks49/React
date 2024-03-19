import { useMutation, useQuery } from "react-query";
import axios from "axios";

const client = axios.create({
    baseURL: "https://reqres.in/api",
    headers: {
        "Content-Type": "application/json",
        timeout: 2000
    }
})




export const handleAddContact= (contactDetails) => {
    addMutation.mutate(contactDetails);
    console.log('inside add contact mutation--',mutation);
} 


export const handleUpdateContact = (contactDetails) => {
    return client.put('/users/' + contactDetails.id, contactDetails)
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error("Error updating contact:", error);
            throw error;
        });
}

export const handleDeleteContact = (id) => {
    return client.delete('/users/' + id)
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error("Error deleting contact:", error);
            throw error;
        });
}


// export { handleAddContact, handleUpdateContact, handleDeleteContact };