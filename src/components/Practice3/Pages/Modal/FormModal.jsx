import { useContext, useEffect, useReducer } from "react";
import AppButton from "../../Components/AppButton";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { FormDataContext } from "../../assets/AppContext";

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

const initialState = {
    allContacts: [],
    formData: {
        id: 0,
        name: '',
        email: '',
        mobileNumber: '',
        profilePic: ''
    },
    isNameError: false,
    isEmailError: false,
    isMobileNumberError: false
};

const actionTypes = {
    SET_CONTACTS: 'SET_CONTACTS',
    SET_FORM_DATA: 'SET_FORM_DATA',
    SET_ERRORS: 'SET_ERRORS'
};

const FormModal = () => {
    const formConfig = useContext(FormDataContext);
    const navigate = useNavigate();
    const contactReducer = (state, action) => {
        switch (action.type) {
            case actionTypes.SET_CONTACTS:
                return { ...state, allContacts: action.payload };
            case actionTypes.SET_FORM_DATA:
                return { ...state, formData: action.payload };
            case actionTypes.SET_ERRORS:
                return { ...state, ...action.payload };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);

    const { data } = useQuery('contact', async () => {
        if (formConfig.id) {
            return await client.get(`/contacts/${formConfig.id}`)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    console.log('Error in fetching data', error);
                    throw error;
                })
        }
    });

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
        deleteData.mutate(state.formData.id);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateExistingContact(state.formData)) {
            if (formConfig.isNewContact) {
                addData.mutate(state.formData);
            } else {
                updateData.mutate(state.formData);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        dispatch({
            type: actionTypes.SET_FORM_DATA,
            payload: {
                ...state.formData,
                [name]:value
            }
        });
        if (event.target.name == 'name') {
            state.isNameError = !(/^[a-zA-Z ]+$/.test(event.target.value));
        } else if (event.target.name == 'email') {
            state.isEmailError = !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value));
        } else if (event.target.name == 'mobileNumber') {
            state.isMobileNumberError = !(/^\d{10}$/.test(event.target.value));
        }
    }

    useEffect(() => {
        if (!formConfig.isNewContact && data) {
            dispatch({ type: actionTypes.SET_FORM_DATA, payload: data });
        }
    }, [data]);

    const validateExistingContact = (contactDetails) => {
        let isValid = true;
        for (let contact of state.allContacts) {
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
                {formConfig.isView ?
                    (<div className="view-text"><span>{state.formData.name}</span></div>) :
                    (<div className="input-style">
                        <input onKeyDown={e => { e.key == 'Enter' && handleSubmit(e) }} required type="text" autoComplete="off" value={state.formData.name} name="name" onChange={handleChange} className={state.isNameError ? 'input-error' : ''} />
                        {state.isNameError ? <span>Invalid name</span> : ''}
                    </div>)
                }
            </div>
            <div className="form-input">
                <label>Email:</label>
                {formConfig.isView ?
                    (<span className="view-text">{state.formData.email}</span>) :
                    (<div className="input-style">
                        <input onKeyDown={e => { e.key == 'Enter' && handleSubmit(e) }} required type="email" autoComplete="off" value={state.formData.email} name="email" onChange={handleChange} className={state.isEmailError ? 'input-error' : ''} />
                        {state.isEmailError ? <span>Invalid email</span> : ''}
                    </div>
                    )
                }
            </div>
            <div className="form-input">
                <label>Mobile Number:</label>
                {formConfig.isView ? (<span className="view-text">{state.formData.mobileNumber}</span>) :
                    (<div className="input-style">
                        <input onKeyDown={e => { e.key == 'Enter' && handleSubmit(e) }} required type="text" autoComplete="off" value={state.formData.mobileNumber} name="mobileNumber" onChange={handleChange} className={state.isMobileNumberError ? 'input-error' : ''} />
                        {state.isMobileNumberError ? <span>Invalid mobile number</span> : null}
                    </div>)}
            </div>
            {!formConfig.isView && <div className="form-input">
                <label>Profile link:</label>
                <div className="input-style">
                    <input onKeyDown={e => { e.key == 'Enter' && handleSubmit(e) }} type="text" autoComplete="off" placeholder="Optional" value={state.formData.profilePic} name="profilePic" onChange={handleChange} />
                </div>
            </div>}
            <div className="flex-dir-row">
                {formConfig.isView ?
                    (formConfig.isDelete ?
                        <>
                            <Link onClick={handleDelete}>
                                <div className="form-view-btn"><AppButton className='form-btn' description='Yes' /></div>
                            </Link>
                            <Link to={'/contact-manager'}>
                                <div className="form-view-btn"><AppButton className='form-btn' description='No' /></div>
                            </Link>
                        </> :

                        <Link to={'/contact-manager'} onClick={formConfig.isDelete && handleDelete}>
                            <div className="form-view-btn"><AppButton className='form-btn' description='OK' /></div>
                        </Link>) :
                    <>
                        <Link onClick={handleSubmit}>
                            <AppButton className={(state.isNameError || state.isEmailError || state.isMobileNumberError) ? 'form-btn-disabled' : 'form-btn'} btnType='submit' description='Submit' />
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