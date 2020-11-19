import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { Guest } from './views/Guest';
import { UserPage } from './views/UserPage';
import { Auth } from 'aws-amplify';

import { API } from 'aws-amplify';
import { listFeedbacks } from './graphql/queries';
import { createFeedback as createFeedbackMutation, deleteFeedback as deleteFeedbackMutation } from './graphql/mutations';
const initialFormState = { recipient: '', feedback: '' }
function App() {
  const [user, setUser] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState(initialFormState);


  useEffect(() => {
    (async function() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
      }
      catch {
        setUser(null);
      }

    }
    
    )();
    fetchFeedbacks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function fetchFeedbacks() {
    const apiData = await API.graphql({ query: listFeedbacks });
    setFeedbacks(apiData.data.listFeedbacks.items);
  }
  async function createFeedback() {
    if (!formData.recipent || !formData.feedback) return;
    await API.graphql({ query: createFeedbackMutation, variables: { input: formData } });
    setFeedbacks([ ...feedbacks, formData ]);
    setFormData(initialFormState);
  }
       
  async function deleteFeedback({ id }) {
    const newFeedbackArray = feedbacks.filter(feedback => feedback.id !== id);
    setFeedbacks(newFeedbackArray);
    await API.graphql({ query: deleteFeedbackMutation, variables: { input: { id } }});
  }

  return (
    <div>Hello User
      <input
        onChange={e => setFormData({ ...formData, 'recipent': e.target.value})}
        placeholder="recipent email"
        value={formData.recipient}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Write Feedback"
        value={formData.feedback}
      />
      <button onClick={createFeedback}>OK</button> <div style={{marginBottom: 30}}>
        {
          feedbacks.map(feedback => (
            <div key={feedback.id || feedback.feedback}>
              <h2>{feedback.recipent}</h2>
              <p>{feedback.feedback}</p>
              <button onClick={() => deleteFeedback(feedback)}>Delete Feedback</button>
            </div>
          ))
        }
      </div>

    </div>
  );
}

export default App;
/*
<input
        onChange={e => setFormData({ ...formData, 'feedback': e.target.value})}
        placeholder="Please write the feedback"
        value={formData.feedback}
      />
      <button onClick={createFeedback}>Submit</button>
      */