import './App.css';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import { useEffect, useState } from 'react';
import Pusher from "pusher-js"
import axios from "./axios";
import {HashRouter} from "react-router-dom";
import routes from './routes';

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get(`/messages/sync`)
    .then((response) => {
        setMessages(response.data)
    })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('0fe764646b7b18e061e7', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [messages])


  return (
    <HashRouter>
      <div className="App">
        {routes}
      </div>
    </HashRouter>
  );
}

export default App;




{/* <HashRouter>
<div className="App">
  <div className="app__body">
    <Sidebar/>
    <Chat chatMessages={messages}/>
  </div>
{routes}
</div>
</HashRouter> */}