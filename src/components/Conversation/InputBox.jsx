import { Send, SendHorizonalIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { ref, set } from "firebase/database";
import { database } from "../../db";
import { v4 as uuidv4 } from 'uuid';

function InputBox(props) {
  const { chatData, setChatData, name, chatid } = props.props;
  function sendChat({ msg, name, chatId, timestamp }) {
    set(ref(database, `${chatid}/${chatId}`), {
      msg: msg,
      name: name,
      timestamp: timestamp
    });
  }

  const [input, setInput] = useState("");
  const [loader, setLoader] = useState(false);

  const textareaRef = useRef(null);

  const submit = async () => {
    if (input.trim() === "") return; 
    const timestamp = new Date().toISOString();  
    const chatId = uuidv4();
    setChatData([...chatData, { msg: input, name: name, timestamp, chatId }]);
    sendChat({ msg: input, name: name, chatId, timestamp });
    setInput("");
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; 
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "10px"; 
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();  
      submit();
    }
  };

  useEffect(() => {
    handleInput();
  }, []);

  return (
    <div className="justify-center items-center flex mb-3 ">
      <textarea
        ref={textareaRef}
        onInput={handleInput}
        value={input}
        onKeyPress={handleKeyPress}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
        className="bottom-2 resize-none overflow-hidden outline-none bg-gray-900 w-11/12 text-white p-3 rounded-lg border-none items-center ml-2"
        style={{ height: "10px", minHeight: "10px" }} // Set initial height to 10px
      ></textarea>

      <button
        onClick={submit}
        className="w-16 ml-3 text-white font-semibold rounded-md"
      >
        {loader ? <div className="loader"></div> : <SendHorizonalIcon />}
      </button>
    </div>
  );
}

export default InputBox;
