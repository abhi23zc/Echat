import React, { useState, useEffect, useRef } from "react";
import InputBox from "./InputBox";
import { ref, onValue } from "firebase/database";
import { database } from "../../db";
import { CopyIcon } from "lucide-react";

function ChatBox(props) {
  const { name, chatid } = props.props;
  const [chatData, setChatData] = useState([]);
  const chatSectionRef = useRef(null);

  useEffect(() => {
    const retrieveChats = () => {
      const chatRef = ref(database, `${chatid}`);
      onValue(chatRef, (snapshot) => {
        const data = snapshot.val();
        const chats = [];
        for (let id in data) {
          chats.push({ id, ...data[id] });
        }

        chats.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        setChatData(chats);
      });
    };
    retrieveChats();
  }, []);

  useEffect(() => {
    if (chatSectionRef.current) {
      chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight;
    }
  }, [chatData]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust format as needed
  };

  return (
    <div className="bg-black w-full  m-auto flex flex-col h-[90vh] justify-end hide-scrollbar">
      <div
        className="chatSection overflow-y-auto hide-scrollbar"
        ref={chatSectionRef}
        style={{ maxHeight: "80vh" }}
      >
        
        {chatData.map((e) => {
          return (
            <div key={e.id} className="w-full">
              <div className="flex flex-col p-5 w-full ">
                <div className="bg-gray-800 lg:w-fit rounded-md p-3  ">
                  <div className="flex flex-col overflow-x-auto">
                    <div className="flex items-center w-fit">
                      <img className="w-5 " src="/zen.png" alt="icon" />
                      <h1 className="text-gray-300 text-xs m-2">{e.name}</h1>

                      <CopyIcon 
                          onClick={() => {
                            navigator.clipboard.writeText(e.msg);
                          }}
                          className="w-4 cursor-pointer ml-5 hover:text-gray-300 text-white "
                        />

                      {/* <div className="chat-button w-fit  p-1">
                       
                      </div> */}
                    </div>
                    <div className="flex flex-row-reverse  mt-2 w-fit" >
                    
                      <div>
                        <pre className=" text-white leading-loose break-words text-base whitespace-pre-wrap">
                          {e.msg}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div className="flex ">
                    <p className="text-gray-500 text-sm">
                      {formatTimestamp(e.timestamp)}
                    </p>
                  </div>
                </div>
                {/* <div className="justify-end text-right lg:mr-5 md:mr-5 mr-2">
                </div> */}
              </div>
            </div>
          );
        })}
      </div>

      <div className="">
        <InputBox props={{ chatData, setChatData, name, chatid }} />
      </div>
    </div>
  );
}

export default ChatBox;
