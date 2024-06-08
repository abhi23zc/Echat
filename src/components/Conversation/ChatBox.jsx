import React, { useState, useEffect, useRef } from "react";
import InputBox from "./InputBox";
import { ref, onValue } from "firebase/database";
import { database } from "../../db";

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
    <div className="bg-black w-full  m-auto flex flex-col h-screen justify-end ">
      <div
        className="chatSection overflow-y-auto"
        ref={chatSectionRef}
        style={{ maxHeight: "80vh" }}
      >
        {chatData.map((e) => {
          return (
            <div key={e.id} className="w-full">
              <div className="flex flex-col p-5 w-full  ">
                <div className="flex flex-col ">
                  {e.name == name ? (
                    <>
                      <div className="flex flex-col justify-end w-full items-end">
                        <div className="flex items-center ">
                          <img className="w-5 " src="/zen.png" alt="icon" />
                          <h1 className="text-gray-300 text-xs m-2">{name}</h1>
                        </div>
                        <div className="">
                          <pre className="text-white lg:ml-10 leading-loose break-words text-base whitespace-pre-wrap">
                            <code
                              className="break-words"
                              dangerouslySetInnerHTML={{ __html: e.msg }}
                            ></code>
                          </pre>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <p className="text-gray-500 text-sm">
                          {formatTimestamp(e.timestamp)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col ">
                        <div className="flex items-center ">
                          <img className="w-5 " src="/zen.png" alt="icon" />
                          <h1 className="text-gray-300 text-xs m-2">{name}</h1>
                        </div>
                        <div className="">
                          <pre className="text-white lg:ml-10 leading-loose break-words text-base whitespace-pre-wrap">
                            <code
                              className="break-words"
                              dangerouslySetInnerHTML={{ __html: e.msg }}
                            ></code>
                          </pre>
                        </div>
                      </div>
                      <div className="flex ">
                        <p className="text-gray-500 text-sm">
                          {formatTimestamp(e.timestamp)}
                        </p>
                      </div>
                    </>
                  )}
                </div>
                {/* <div className="justify-end text-right lg:mr-5 md:mr-5 mr-2">
                </div> */}
              </div>
            </div>
          );
        })}
      </div>

      <div className="" >
        <InputBox props={{ chatData, setChatData, name, chatid }} />
      </div>
    </div>
  );
}

export default ChatBox;
