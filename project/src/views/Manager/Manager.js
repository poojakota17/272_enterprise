import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
var token;

const Manager = props => {
    const [Token, settoken] = useState();
    token = Token;
    console.log(token)
    useEffect(() => {
        Auth.currentSession()
            .then(cognitoUser => {
                // console.log(cognitoUser)
                const { idToken: { payload } } = cognitoUser
                const { idToken: { jwtToken } } = cognitoUser
                settoken(jwtToken);
                console.log(cognitoUser)
                console.log(token)
            })
    }, [])
    return (

        <div></div>

    )
}

export default Manager;