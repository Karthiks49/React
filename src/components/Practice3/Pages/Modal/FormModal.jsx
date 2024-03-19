import { useState } from "react";
import AppButton from "../../Components/AppButton";

const FormModal = ({onSubmit, modalVisible, contactDetails, isView}) => {
    const initialFormData = contactDetails?.id ? contactDetails : {
        id: 0,
        name: '',
        email: '',
        mobileNumber: '',
        profilePic: ''
    }
    const [formData, setFormData] = useState(initialFormData);
    const [isNameError, setIsNameError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isMobileNumberError, setIsMobileNumberError] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevStatus => ({
            ...prevStatus, [name]: value
        }))
        if (event.target.name == 'name') {
            setIsNameError(!(/^[a-zA-Z ]+$/.test(event.target.value)));
        } else if (event.target.name == 'email') {
            setIsEmailError(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value)));
        } else if (event.target.name == 'mobileNumber') {
            setIsMobileNumberError(!(/^\d{10}$/.test(event.target.value)));
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    }

    return (
        <form className="add-contact-form" onSubmit={handleSubmit}>
            <div className="form-input">
                <label>Name:</label>
                {isView ?
                    (<span className="view-text">{contactDetails.name}</span>) :
                    (<div className="input-style">
                        <input required type="text" autoComplete="off" value={formData.name} name="name" onChange={handleChange} className={isNameError ? 'input-error' : ''} />
                        {isNameError ? <span>Invalid name</span> : ''}
                    </div>)
                }
            </div>
            <div className="form-input">
                <label>Email:</label>
                {isView ?
                    (<span className="view-text">{contactDetails.email}</span>) :
                    (<div className="input-style">
                        <input required type="email" autoComplete="off" value={formData.email} name="email" onChange={handleChange} className={isEmailError ? 'input-error' : ''} />
                        {isEmailError ? <span>Invalid email</span> : ''}
                    </div>
                    )
                }
            </div>
            <div className="form-input">
                <label>Mobile Number:</label>
                {isView ? (<span className="view-text">{contactDetails.mobileNumber}</span>) :
                    (<div className="input-style">
                        <input required type="text" autoComplete="off" value={formData.mobileNumber} name="mobileNumber" onChange={handleChange} className={isMobileNumberError ? 'input-error' : ''} />
                        {isMobileNumberError ? <span>Invalid mobile number</span> : null}
                    </div>)}
            </div>
            {!isView && <div className="form-input">
                <label>Profile link:</label>
                <div className="input-style">
                    <input type="text" autoComplete="off" placeholder="Optional" value={formData.profilePic} name="profilePic" onChange={handleChange} />
                </div>
            </div>}
            <div className="flex-dir-row">
                {isView ?
                    <div className="form-view-btn"><AppButton className='form-btn' handleClick={modalVisible} description='OK' /></div> :
                    <>
                        <AppButton className={(isNameError || isEmailError || isMobileNumberError) ? 'form-btn-disabled' : 'form-btn'} btnType='submit' description='Submit' />
                        <AppButton className='form-btn' btnType='button' handleClick={modalVisible} description='Close' />
                    </>
                }
            </div>
        </form>
    );
}

export default FormModal;