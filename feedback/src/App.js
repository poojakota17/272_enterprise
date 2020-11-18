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
  const [feedback, setFeedback] = useState([]);
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
    setFeedback(apiData.data.listFeedbacks.items);
  }
  async function createFeedback() {
    if (!formData.recipent || !formData.feedback) return;
    await API.graphql({ query: createFeedbackMutation, variables: { input: formData } });
    setFeedback([ ...feedback, formData ]);
    setFormData(initialFormState);
  }
       

  return (
    <div>Hello User
      <input
        onChange={e => setFormData({ ...formData, 'feedback': e.target.value})}
        placeholder="Please write the feedback"
        value={formData.feedback}
      />
      <button onClick={createFeedback}>Submit</button>
    </div>
  );
}

export default App;
