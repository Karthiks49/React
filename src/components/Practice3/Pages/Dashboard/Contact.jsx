import { Link } from "react-router-dom";

const Contact = ({ item }) => {
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
                <Link to={'/contact-manager/form'} state={{ "id": item.id, "isView": true }}>
                    <button className="action-icon" style={{ backgroundColor: '#F8BF09' }}>
                        <span className="material-symbols-outlined">visibility</span>
                    </button>
                </Link>
                <Link to={'/contact-manager/form'} state={{"id": item.id, "isEdit": true}}>
                    <button className="action-icon" style={{ backgroundColor: '#0B6BF1' }}>
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                </Link>
                <Link to={'/contact-manager/form'} state={{"id": item.id, "isView": true, "isDelete":true}}>
                    <button className="action-icon" style={{ backgroundColor: '#D75564' }}>
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </Link>
            </div>
        </>
    );
}

export default Contact;