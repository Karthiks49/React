import { useContext } from "react";
import Contact from "./Contact";
import { ContactItemContext, ContactListContext } from "../../assets/AppContext";

const ContactList = () => {
    const contactList = useContext(ContactListContext);
    return (
        <div className="grid-container">
            {contactList &&
                contactList.map((person, index) => {
                    return (
                        <div key={index} className="grid-item">
                            <ContactItemContext.Provider value={person}>
                                <Contact/>
                            </ContactItemContext.Provider>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default ContactList;