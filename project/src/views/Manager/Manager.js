import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
var token;
class Getmydeptinfo extends React.Component {
    render() {

        return (
            <div> </div>
        );
    }
}
function Manager() {
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

                // token = Token;
                console.log(token)
            })
    }, [])
    return (

        <Getmydeptinfo />

    )
}

export default Manager;