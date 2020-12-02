//import React from 'react';
//import Amplify, { API } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
//import awsconfig from '../../index.js';
import { Auth } from 'aws-amplify';
import { Dropdown } from 'react-bootstrap';
import { useAuth } from "../../corp-auth.js";
//Amplify.configure(awsconfig);
//API.configure(config);
var token;
class Getinfo extends React.Component {
    constructor(props) {
        super(props);
        // this.callAPI = this.callAPI.bind(this);
        // this.mysubmithandler = this.mysubmithandler.bind(this);


    }

    //callAPI = () => {
    componentDidMount() {
        // instantiate a headers object
        var myHeaders = new Headers();
        // add content type header to object

        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");
        // create a JSON object with parameters for API call and store in a variable
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,

            redirect: 'follow'
        };
        // make API call with parameters and use promises to get response
        // fetch(process.env.API_GATEWAY_URL_RETRIEVE_INFO, requestOptions)
        //     .then(response => response.text())
        //     .then(response => alert(response))

        //     .catch(error => console.log(error))
    }
    // mysubmithandler = (event) => {
    //     event.preventDefault();
    //     this.callAPI();
    // }
    render() {

        return (

            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
                    </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Manager</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Senior Manager</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Assisant Manager</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Senior Staff</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Staff</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Technical Engineer</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>


        );
    }
}

function Getdetails() {
    const [user, setuser] = useState();
    //  let auth = useAuth();

    useEffect(() => {
        Auth.currentSession()
            .then(cognitoUser => {
                // console.log(cognitoUser)
                const { idToken: { payload } } = cognitoUser
                const { idToken: { jwtToken } } = cognitoUser
                setuser(payload);
                console.log(cognitoUser)

                token = jwtToken;
                console.log(token)
            })
    }, [])
    return (
        <div>
            <Getinfo />
        </div>
    )
}

export default Getdetails;
