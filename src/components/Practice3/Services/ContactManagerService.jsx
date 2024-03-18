import { useMutation } from "react-query";
import axios from "axios";

const client = axios.create({
    baseURL: "https://reqres.in/api",
    headers: {
        "Content-Type": "application/json",
        timeout: 2000
    }
})

const handleAddContact = (contactDetails) => {

    //mutation.mutate(contactDetails);
    return client.post('/users', contactDetails)
    .then(response => {
        return response;
    })
    .catch(error => {
        console.error("Error updating contact:", error);
        throw error;
    });
    // console.log('mutation--', mutation)
    // mutation.then(response => {
    //         return response;
    //     })
    //     .catch(error => {
    //         console.error("Error adding contact:", error);
    //         throw error;
    //     });
    //     // console.log('mutation----',mutation);

    // return mutation;
}

const handleUpdateContact = (contactDetails) => {
    return client.put('/users/' + contactDetails.id, contactDetails)
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error("Error updating contact:", error);
            throw error;
        });
}

const handleDeleteContact = (id) => {
    return client.delete('/users/' + id)
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error("Error deleting contact:", error);
            throw error;
        });
}


export  { handleAddContact, handleUpdateContact, handleDeleteContact};