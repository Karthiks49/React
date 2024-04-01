import { useContext } from "react";
import { Link } from "react-router-dom";
import { ContactItemContext } from "../../assets/AppContext";

const Contact = () => {
    const item = useContext(ContactItemContext);
    return (
        <>
            <div className="grid-item-profile">
                <img src={item.profilePic ? item.profilePic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}></img>
            </div>
            <div className="grid-item-detail">
                <div className="item-detail">Name:  {item.name}</div>
                <div className="item-detail">Email:  {item.email}</div>
                <div className="item-detail">Mobile:  {item.mobileNumber}</div>
            </div>
            <div className="grid-item-options">
                <Link to={`/contact-manager/contact/view/${item.id}`}>
                    <button className="view-action-icon action-icon">
                        <span className="material-symbols-outlined">visibility</span>
                    </button>
                </Link>
                <Link to={`/contact-manager/contact/edit/${item.id}`}>
                    <button className="edit-action-icon action-icon">
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                </Link>
                <Link to={`/contact-manager/contact/delete/${item.id}`}>
                    <button className="delete-action-icon action-icon">
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </Link>
            </div>
        </>
    );
}

export default Contact;