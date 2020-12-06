import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ShowUsers = (props) => {
  const users = props.users;
  console.log(props.updateUser)

  const renderedUsers = (users) ? props.users.map((user,index) => <SingleUser key={index} user={user} updateRole={props.updateUser}/>) :''

  return (
    renderedUsers
  )
};

export default ShowUsers;


function SingleUser(props) {
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emNum, setEmNum] = useState('');

  const person = props.user;
//console.log(person)
  useEffect(() => {
    setUserId(person.Username);
    var found = false;
    for(var i = 0; i < person.Attributes.length; i++) {
      if (person.Attributes[i].Name == 'given_name') {
        setFirstName(person.Attributes[i].Value)
      } else if (person.Attributes[i].Name == 'family_name') {
        setLastName(person.Attributes[i].Value)
      } else if (person.Attributes[i].Name == 'name') {
        setEmNum(person.Attributes[i].Value)
      }
    }
  }, []);

  function updatePermissions() {
    props.updateRole(person.Username)
  }

  return (
    <Row className="text-muted border-bottom align-items-center text-break mx-0">
    <Col>{emNum}</Col>
    <Col>{firstName}</Col>
    <Col>{lastName}</Col>
    <Col><Button onClick={updatePermissions}>Update permissions</Button></Col>
  </Row>)
}
