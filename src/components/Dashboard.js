import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../utilities/api-service.js";
import { setUsers, deleteUser, updateUser } from "../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, CardBody, Form, InputGroup, Label, Input, Button, Table } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "../styles/dashboard.css";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {

    const dispatch = useDispatch();
    const users = useSelector(state => state.userReducer);

    const [ halfUsers, setHalfUsers ] = useState(null);
    const [ toggle, setToggle ] = useState(false);
    const [ pageNo, setPageNo ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(0);
    const [ editUser, setEditUser ] = useState(null);

    const fetchData = async () => {
        try {
            const resp = await axios.get(api.API_BASE_URL + api.PAGE_NO_1);
            const response = await axios.get(api.API_BASE_URL + api.PAGE_NO_2);
            const userList = [ ...resp.data.data, ...response.data.data ];
            setTotalPages(response.data.total_pages);
            dispatch(setUsers(userList));
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const getHalfUsers = () => {
        let value = [];
        if (pageNo === 1) {
            for (let index = 0; index < users.length; index++) {
                if (index <= 5) {
                    value.push(users[index]);
                }
            }

        } else {
            for (let index = 0; index < users.length; index++) {
                if (index > 5) {
                    value.push(users[index]);
                }

            }
        }
        setHalfUsers(value);
    };

    const deleteParticularUser = (userId) => {
        dispatch(deleteUser(userId));
        toast("User deleted Successfully!", {
            type: "error",
            position: "top-center",
            theme: "colored"
        });
    };

    const update = () => {

        // Validating the input fields that none of them are empty
        let fName = document.getElementById("first_name").value;
        let lName = document.getElementById("last_name").value;
        let emailId = document.getElementById("email").value;

        // If validation fails , shows error message for 3 seconds, otherwise saves the updated data
        if (fName.length < 1 || lName.length < 1 || emailId.length < 1) {
            document.getElementById("err-msg").innerHTML = "Fields marked with * are mandatory";
            setTimeout(function () {
                document.getElementById("err-msg").innerHTML = "";
            }, 3000);
        } else {
            dispatch(updateUser(editUser));
            setToggle(false);
        }

    };

    const formChange = (event) => {
        const { name, value } = event.target;
        setEditUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        getHalfUsers();
    }, [ users ]);

    useEffect(() => {
        getHalfUsers();
    }, [ pageNo ]);

    return (
        <>
            {
                toggle && editUser && (
                    <div style={{
                        marginTop: "5%",
                        padding: "55px",
                        display: "block",
                        transition: "opacity .15s linear",
                        opacity: "1"
                    }}
                        className="modal fade" tabIndex="-1" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Edit user</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setToggle(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <Container>
                                        <Row>
                                            <Col>
                                                <Card>
                                                    <CardBody className='m-4'>
                                                        <Form>
                                                            <Row className='my-4'>
                                                                <Col>
                                                                    <InputGroup>
                                                                        <Label md={4}>First Name <span className="text-danger">*</span></Label>
                                                                        <Col md={7}>
                                                                            <Input id="first_name" type='text' name='first_name' value={editUser.first_name} onChange={(e) => formChange(e)} />
                                                                        </Col>
                                                                    </InputGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row className='my-4'>
                                                                <Col>
                                                                    <InputGroup>
                                                                        <Label md={4}>Last Name <span className="text-danger">*</span></Label>
                                                                        <Col md={7}>
                                                                            <Input id="last_name" type='text' name='last_name' required value={editUser.last_name} onChange={(e) => formChange(e)} />
                                                                        </Col>
                                                                    </InputGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row className='my-4'>
                                                                <Col>
                                                                    <InputGroup>
                                                                        <Label md={4}>Email <span className="text-danger">*</span></Label>
                                                                        <Col md={7}>
                                                                            <Input id="email" type='email' name='email' required value={editUser.email} onChange={(e) => formChange(e)} />
                                                                        </Col>
                                                                    </InputGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row className='my-4'>
                                                                <Col className="text-center">
                                                                    <small id="err-msg" className="text-danger"></small>
                                                                </Col>
                                                            </Row>
                                                        </Form>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setToggle(false)}>Close</button>
                                    <button type="button" className="btn btn-primary" onClick={() => update()} >Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <div>
                <h3 className="user-head mt-4">Users</h3>
                <ToastContainer />
                <Table className="mt-5">
                    <thead className="bg-dark text-white text-center">
                        <tr>
                            <th>Profile Pic</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">

                        {halfUsers && halfUsers.length > 0
                            ? (
                                halfUsers.map((user, index) => (
                                    <tr key={index}>
                                        <th><img className="profile-pic" src={user.avatar} alt="profile picture" /></th>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Button className="mx-2" color="primary" data-toggle="modal" data-target="#exampleModal" onClick={() => {
                                                setEditUser({ "id": user.id, "first_name": user.first_name, "last_name": user.last_name, "email": user.email, "avatar": user.avatar });
                                                setToggle(true);
                                            }}>Edit</Button>
                                            <Button className="mx-2" color="danger" onClick={() => deleteParticularUser(user.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : " "}
                    </tbody>
                </Table>

                <div>
                    <nav aria-label="...">
                        <ul className="pagination pagination-md float-end">
                            {
                                totalPages && [ ...Array(totalPages) ].map((value, index) => (
                                    <li style={{ cursor: "pointer" }} className={pageNo === index + 1 ? "page-item active" : ""} key={index}><a className="page-link" onClick={() => setPageNo(index + 1)}> {index + 1} </a></li>
                                ))
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </>

    );
};

export default Dashboard;