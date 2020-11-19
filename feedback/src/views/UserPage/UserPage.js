import React, { useState, useEffect } from 'react';
import './UserPage.css';
import { Auth } from 'aws-amplify';
import Button from 'react-bootstrap/Button'

import { API } from 'aws-amplify';
import { listFeedbacks } from '../../graphql/queries';
import { createFeedback as createFeedbackMutation, deleteFeedback as deleteFeedbackMutation } from '../../graphql/mutations';


const UserPage = props => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchFeedbacks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function signOut () {
    await Auth.signOut();
  }

  async function fetchFeedbacks() {
    const apiData = await API.graphql({ query: listFeedbacks });
    setFeedbacks(apiData.data.listFeedbacks.items);
  }
  async function createFeedback() {
    if (!formData.recipient || !formData.feedback) return;
    await API.graphql({ query: createFeedbackMutation, variables: { input: formData } });
    setFeedbacks([ ...feedbacks, formData ]);
    setFormData({});
  }

  async function deleteFeedback({ id }) {
    const newFeedbackArray = feedbacks.filter(feedback => feedback.id !== id);
    setFeedbacks(newFeedbackArray);
    await API.graphql({ query: deleteFeedbackMutation, variables: { input: { id } }});
  }

  return (
    <div>Hello User
      <input
        onChange={e => setFormData({ ...formData, 'recipient': e.target.value})}
        placeholder="recipent email"
      />
      <input
        onChange={e => setFormData({ ...formData, 'feedback': e.target.value})}
        placeholder="Write Feedback"
      />
      <button onClick={createFeedback}>OK</button> <div style={{marginBottom: 30}}>
        {
          feedbacks.map(feedback => (
            <div key={feedback.id || feedback.feedback}>
              <h2>{feedback.recipient}</h2>
              <p>{feedback.feedback}</p>
              <button onClick={() => deleteFeedback(feedback)}>Delete Feedback</button>
            </div>
          ))
        }
      </div>
      <Button variant="warning" onClick={signOut}>Sign Out</Button>
    </div>
  );
}

export default UserPage;
