
const Contact = ({ item, handleDelete, handleUpdate, handleViewContact }) => {
    const handleDeleteClick = (event) => {
        event.preventDefault();
        handleDelete(item.id);
    }
    const handleEdit = (event) => {
        event.preventDefault();
        handleUpdate(item.id);
    }
    const handleView = (event) => {
        event.preventDefault();
        handleViewContact(item.id);
    }
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
                <button className="action-icon" onClick={handleView} style={{ backgroundColor: '#F8BF09' }}>
                    <span className="material-symbols-outlined">visibility</span>
                </button>
                <button className="action-icon" onClick={handleEdit} style={{ backgroundColor: '#0B6BF1' }}>
                    <span className="material-symbols-outlined">edit</span>
                </button>
                <button className="action-icon" onClick={handleDeleteClick} style={{ backgroundColor: '#D75564' }}>
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </div>
        </>
    );
}

export default Contact;