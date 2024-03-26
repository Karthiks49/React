import { useEffect, useState } from "react";
import AppButton from "../../Components/AppButton";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

const client = axios.create({
    baseURL: "https://65fd7a619fc4425c65320b76.mockapi.io/api",
    headers: {
        "Content-Type": "application/json",
        timeout: 2000
    }
})


const FormModal = ({ isView, isDelete, isNewContact, id }) => {
    const [contactDetails, setContactDetails] = useState({});
    const navigate = useNavigate();
    const addData = useMutation((newData) => {
        console.log('inside add contact mutate---', newData)
        client.post('/contacts', newData)
            .then(response => {
                navigate('/contact-manager');
                return response;
            })
    });

    const updateData = useMutation((newData) => {
        client.put('/contacts/' + newData.id, newData)
            .then(response => {
                navigate('/contact-manager');
                return response
            })
    });

    const deleteData = useMutation((id) => {
        client.delete('/contacts/' + id)
            .then(response => {
                navigate('/contact-manager');
                return response
            })
    });

    const initialFormData = !isNewContact ? contactDetails : {
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

    const handleDelete = () => {
        deleteData.mutate(contactDetails.id);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('inside FormModal----handleSubmit---', formData);
        if (isNewContact) {
            console.log('inside ADD contact handleSubmit----', formData)
            addData.mutate(formData);
        } else {
            console.log('inside handle FormMODAL ELSEEEEE', formData)
            updateData.mutate(formData);
        }
    };

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

    useEffect(() => {
        if(!isNewContact) {
            setFormData(initialFormData);
        }
    },[initialFormData])

    const { data, isLoading, error } = useQuery('contact', async () => {
        if (id) {
            try {
                console.log('inside contactModal id--', id);
                const response = await client.get(`/contacts/${id}`);
                return response.data;
            } catch (error) {
                console.log('Error in fetching contact: ', error);
            }
        }
    });

    useEffect(() => {
        if (data) {
            console.log('inside contactMODAL useEFFECT<><><><><', data)
            setContactDetails(data);
        }
    }, [data])

    if (isLoading) {
        return <h2>Loading ...</h2>
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
                    (isDelete ?
                        <>
                            <Link onClick={handleDelete}>
                                <div className="form-view-btn"><AppButton className='form-btn' description='Yes' /></div>
                            </Link>
                            <Link to={'/contact-manager'}>
                                <div className="form-view-btn"><AppButton className='form-btn' btnType='button' description='No' /></div>
                            </Link>
                        </> :

                        <Link to={'/contact-manager'} onClick={isDelete && handleDelete}>
                            <div className="form-view-btn"><AppButton className='form-btn' description='OK' /></div>
                        </Link>) :
                    <>
                        <Link to={'/contact-manager'} onClick={handleSubmit}>
                            <AppButton className={(isNameError || isEmailError || isMobileNumberError) ? 'form-btn-disabled' : 'form-btn'} btnType='submit' description='Submit' />
                        </Link>
                        <Link to={'/contact-manager'}>
                            <AppButton className='form-btn' btnType='button' description='Close' />
                        </Link>
                    </>
                }
            </div>
        </form>
    );
}

export default FormModal;