import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Modal, Tab, Tabs } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

const Modalone = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const [data, setData] = React.useState("");
    const [first_name, setFirstName] = React.useState("");
    const [last_name, setlastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [mobile_no, setMobileNo] = React.useState("");
    const [password, setPassword] = React.useState("");

    const ChangeFirstName = (event) => {
        setFirstName(event.target.value)
    }
    const ChangeLastName = (event) => {
        setlastName(event.target.value)
    }
    const ChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const ChangeMobileNo = (event) => {
        setMobileNo(event.target.value)
    }
    const ChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const RegisterSubmit = async (e) => {
        e.preventDefault();
        const unique_id = uuid();
        var formdata = new FormData();
        formdata.append("first_name", first_name);
        formdata.append("last_name", last_name);
        formdata.append("email", email);
        formdata.append("mobile_no", mobile_no);
        formdata.append("password", password);
        formdata.append("device_id", unique_id);

        fetch("https://mlearningindia.org/learn/api/users", {
            method: 'POST',
            body: formdata,
        })
            .then(response => response.json())
            .then(result => {
                setData(result);
                if (result?.message == 'Registration successfully.') {
                    setFirstName('');
                    setlastName('');
                    setEmail('');
                    setMobileNo('');
                    setPassword('');
                    localStorage.setItem('mobile_no', mobile_no);
                    localStorage.setItem('token', result?.data?.token);
                    alert("Otp Send Successfully On Your No..");
                    navigate('/app/otp');
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <button onClick={handleShow}>Open Modal Tabs</button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal one</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs defaultActiveKey="tab1" id="modal-tabs">
                        <Tab eventKey="tab1" title="Register">

                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <form>
                                            <div className="form-group mt-3">
                                                <input type="text" className="form-control" placeholder="First Name" required />
                                            </div>
                                            <div className="form-group mt-2">
                                                <input type="text" className="form-control" placeholder="Last Name" required />
                                            </div>
                                            <div className="form-group mt-2">
                                                <input type="text" className="form-control" placeholder="Email" required />
                                            </div>
                                            <div className="form-group mt-2">
                                                <input type="text" className="form-control" placeholder="Mobile Number" required />
                                            </div>
                                            <div className="form-group mt-2">
                                                <input type="text" className="form-control" placeholder="Password" required />
                                            </div>
                                            <div className="form-group mt-2 text-center">
                                                <button className='btn btn-danger'>Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </Tab>
                        <Tab eventKey="tab2" title="Login">

                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <form>
                                            <div className="form-group mt-3">
                                                <input type="text" className="form-control" placeholder="Email" required />
                                            </div>

                                            <div className="form-group mt-2">
                                                <input type="text" className="form-control" placeholder="Password" required />
                                            </div>
                                            <div className="form-group mt-2 text-center">
                                                <button className='btn btn-danger'>Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </Tab>

                    </Tabs>
                </Modal.Body>
                {/* <Modal.Footer>
                    <button onClick={handleClose}>Close</button>
                </Modal.Footer> */}
            </Modal>
        </>
    )
}

export default Modalone