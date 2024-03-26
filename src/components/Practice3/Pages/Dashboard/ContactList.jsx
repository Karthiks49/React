import Contact from "./Contact";

const ContactList = ({ contactList, handleProfileDelete, handleEdit, handleView }) => {
    return (
        <div className="grid-container">
            {contactList &&
                contactList.map((person, index) => {
                    return (
                        <div key={index} className="grid-item">
                            <Contact item={person} handleDelete={handleProfileDelete} handleUpdate={handleEdit} handleViewContact={handleView} />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default ContactList;