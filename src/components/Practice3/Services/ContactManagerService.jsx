import { useMutation, useQuery } from "react-query";
import axios from "axios";

const client = axios.create({
    baseURL: "https://65fd7a619fc4425c65320b76.mockapi.io/api",
    headers: {
        "Content-Type": "application/json",
        timeout: 2000
    }
})


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
    console.log('inside handleDelete----', id)
    return client.delete('/contacts/' + id)
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error("Error deleting contact:", error);
            throw error;
        });
}
