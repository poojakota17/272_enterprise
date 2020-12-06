import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ReactComponent as UpgradeButton} from '../../components/Assets/up.svg';
import { ReactComponent as DowngradeButton} from '../../components/Assets/down.svg';
import './ShowUsers.css';

const ShowUsers = (props) => {
  const users = props.users;
  const header = (users) ?
      <Row className="text-muted border-bottom align-items-center text-break mx-0 font-weight-bold">
        <Col sm={2}>Employee Num</Col>
        <Col sm={2}>First Name</Col>
        <Col sm={2}>Last Name</Col>
        <Col>Email</Col>
        <Col sm={2}></Col>
      </Row> : ''

  const renderedUsers = (users) ? props.users.map((user,index) =>
    <SingleUser key={index}
                 user={user}
                 upgrade={props.upgrade}
                 downgrade={props.downgrade}/>) :''

  return (
    <>
    {header}
    {renderedUsers}
    </>
  )
};

export default ShowUsers;


function SingleUser(props) {
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emNum, setEmNum] = useState('');
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);

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
      } else if (person.Attributes[i].Name == 'email') {
        setEmail(person.Attributes[i].Value)
      }}
  }, [userData]);

  function updatePermissions() {
    props.upgrade(person.Username)
  }

  function removePermissions() {
    props.downgrade(person.Username)
  }

  async function getInfo() {
    const {...rest} = await props.getInfo(person.Username)
    setUserData(rest)
    console.log(rest)
  }

  const changePermissions = (props.upgrade
    ? <Button variant="perm" onClick={updatePermissions}><UpgradeButton /> <small>Upgrade</small></Button>
    : <Button variant="perm" onClick={removePermissions}><DowngradeButton /> <small>Downgrade</small></Button>)

  return (
    <Row className="text-muted border-bottom align-items-center text-break mx-0">
    <Col sm={2}>{emNum}</Col>
    <Col sm={2}>{firstName}</Col>
    <Col sm={2}>{lastName}</Col>
    <Col>{email}</Col>
    <Col sm={2}>{changePermissions}</Col>
  </Row>)
}
