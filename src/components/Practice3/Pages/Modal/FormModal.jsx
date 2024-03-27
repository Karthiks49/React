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

const fetchData = () => {
    return client.get('/contacts')
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log('Error in getting contacts', error);
        })
};

const FormModal = ({ isView, isDelete, isNewContact, id }) => {
    const [allContacts, setAllContacts] = useState([]);
    const contacts = useQuery('contacts', fetchData);
    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        email: '',
        mobileNumber: '',
        profilePic: ''
    });
    const [isNameError, setIsNameError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isMobileNumberError, setIsMobileNumberError] = useState(false);
    const navigate = useNavigate();

    const { data } = useQuery('contact', async () => {
        if (id) {
            return await client.get(`/contacts/${id}`)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    console.log('Error in fetching data', error);
                    throw error;
                })
        }
    });

    useEffect(() => {
        if (contacts.data) {
            setAllContacts(contacts.data);
        }
    }, [contacts])

    const addData = useMutation((newData) => {
        client.post('/contacts', newData)
            .then(response => {
                navigate('/contact-manager');
                return response;
            })
            .catch(error => {
                console.log('Error in adding contact', error);
                throw error;
            })
    });

    const updateData = useMutation((newData) => {
        client.put('/contacts/' + newData.id, newData)
            .then(response => {
                navigate('/contact-manager');
                return response
            })
            .catch(error => {
                console.log('Error in adding contact', error);
                throw error;
            })
    });

    const deleteData = useMutation((id) => {
        client.delete('/contacts/' + id)
            .then(response => {
                navigate('/contact-manager');
                return response
            })
            .catch(error => {
                console.log('Error in adding contact', error);
                throw error;
            })
    }); 

    const handleDelete = () => {
        deleteData.mutate(formData.id);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateExistingContact(formData)) {
            if (isNewContact) {
                addData.mutate(formData);
            } else {
                updateData.mutate(formData);
            }
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
        if (!isNewContact && data) {
            setFormData(data);
        }
    }, [data])

    const validateExistingContact = (contactDetails) => {
        let isValid = true;
        for (let contact of allContacts) {
            if ((contact.id != contactDetails.id) && (contactDetails.mobileNumber == contact.mobileNumber)) {
                alert('Mobile number already exist !!!');
                isValid = false;
                break;
            } else if ((contact.id != contactDetails.id) && (contactDetails.email == contact.email)) {
                alert('Email already exist !!!');
                isValid = false;
                break;
            }
        }
        return isValid;
    }

    return (
        <form className="add-contact-form" onSubmit={handleSubmit}>
            <div className="form-input">
                <label>Name:</label>
                {isView ?
                    (<div className="view-text"><span>{formData.name}</span></div>) :
                    (<div className="input-style">
                        <input onKeyDown={e => { e.key == 'Enter' && handleSubmit(e) }} required type="text" autoComplete="off" value={formData.name} name="name" onChange={handleChange} className={isNameError ? 'input-error' : ''} />
                        {isNameError ? <span>Invalid name</span> : ''}
                    </div>)
                }
            </div>
            <div className="form-input">
                <label>Email:</label>
                {isView ?
                    (<span className="view-text">{formData.email}</span>) :
                    (<div className="input-style">
                        <input onKeyDown={e => { e.key == 'Enter' && handleSubmit(e) }} required type="email" autoComplete="off" value={formData.email} name="email" onChange={handleChange} className={isEmailError ? 'input-error' : ''} />
                        {isEmailError ? <span>Invalid email</span> : ''}
                    </div>
                    )
                }
            </div>
            <div className="form-input">
                <label>Mobile Number:</label>
                {isView ? (<span className="view-text">{formData.mobileNumber}</span>) :
                    (<div className="input-style">
                        <input onKeyDown={e => { e.key == 'Enter' && handleSubmit(e) }} required type="text" autoComplete="off" value={formData.mobileNumber} name="mobileNumber" onChange={handleChange} className={isMobileNumberError ? 'input-error' : ''} />
                        {isMobileNumberError ? <span>Invalid mobile number</span> : null}
                    </div>)}
            </div>
            {!isView && <div className="form-input">
                <label>Profile link:</label>
                <div className="input-style">
                    <input onKeyDown={e => { e.key == 'Enter' && handleSubmit(e) }} type="text" autoComplete="off" placeholder="Optional" value={formData.profilePic} name="profilePic" onChange={handleChange} />
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
                        <Link onClick={handleSubmit}>
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