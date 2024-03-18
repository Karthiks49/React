import Header from "../Header/Header";
import ContactManager from "../../Pages/Dashboard/ContactManager";


const ContactsLayout = () => {
    return (
        <div className="contacts-manager">
            <Header />
            <ContactManager/>
        </div>
    );
}

export default ContactsLayout;