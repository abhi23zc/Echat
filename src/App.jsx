import React, { useEffect, useState } from "react";
import Conversation from "./components/Conversation/Conversation";
import Login from "./components/Login";
function App() {
  useEffect(()=>{
    const data =JSON.parse(localStorage.getItem("chatdata"));
    if(data){
      setname(data.name)
      setchatid(data.chatid)
      setlogin(false)
    }
  })
  const [login, setlogin] = useState(true);
  const [name, setname] = useState("");
  const [chatid, setchatid] = useState("");
  return <div>{login ? <Login props={{login, setlogin, chatid, name, setname, setchatid}}/> : <Conversation props={{chatid, setchatid, name, setname}} />}</div>;
}

export default App;
