import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { Guest } from './views/Guest';
import { UserPage } from './views/UserPage';
import { Auth } from 'aws-amplify';

import { API } from 'aws-amplify';
import { listFeedbacks } from './graphql/queries';
import { createFeedback as createFeedbackMutation, deleteFeedback as deleteFeedbackMutation } from './graphql/mutations';

function App() {
  const [user, setUser] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({});


  useEffect(() => {
  (async function() {
      try {
        const user = await Auth.signIn('m.jack@techcorp.com', 'Abcd@123');
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
