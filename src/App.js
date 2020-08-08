import React,{useState , useEffect} from 'react';
import { Button,FormControl,InputLabel,Input } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';


function App() {
  const [input, setInput] = useState('');
  const [messages,setMessages]=useState([]);
  const [userName,setUserName]=useState('');

  useEffect(() => {  
    db.collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot =>{
      setMessages(snapshot.docs.map(doc =>({id:doc.id,data:doc.data()})))
    })  

  }, [])

  useEffect(() => {
    setUserName(prompt('Please Enter your name'));
  }, [])

  const sendMessage =(event) => {
    event.preventDefault();

    db.collection('messages').add({
      message:input,
      username:userName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }

  return (
    <div className="App">
      <img src="https://seeklogo.com/images/W/whatsapp-icon-logo-6E793ACECD-seeklogo.com.png"  />
      <h2>Welcome {userName}</h2>

      <form className="app__form">
        <FormControl class="Form__control">
          <Input className="app__input" placeholder="Enter a message..." value={input} onChange={e => setInput(e.target.value)}/>
          <IconButton className="app_icon" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
     <FlipMove>
      {
        messages.map(({id,data}) => 
          <Message key={id} typedUser={userName} username={data.username} message={data.message}/>
        )
      }
      </FlipMove>
    </div>
  );
}

export default App;
