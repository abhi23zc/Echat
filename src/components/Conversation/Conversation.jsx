
import React, { useEffect } from "react";
import ChatBox from "./ChatBox";
import Navbar from "../Navbar/Navbar";

const Conversation = (props) => {
  const {name, chatid} = props.props

  return (
    <div className="">
      <Navbar/>
      <ChatBox props={{name, chatid}} />
    </div>
  );
};

export default Conversation;
