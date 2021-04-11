import React, { useEffect, useState } from 'react';
import './Chat.scss'
export default function Chat() {
  let msgList: Array<any> = [{ type: 'notify', data: { content: '欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！' } }]
  const [msgs, SetMsgs] = useState([{ type: 'notify', data: { content: '欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！' } }])
  useEffect(() => {
    var socket = new WebSocket("ws://127.0.0.1:10086/api/chat/echo");
    socket.addEventListener("open", function (event) {
      console.log("socket is open");
      socket.send("这里是html发送过来的");
    });

    socket.addEventListener("message", function (event) {
      var res = JSON.parse(event.data)
      if (res.type == 'message') {
        appendList(res)
        console.log("Message from server", event.data);
      }

    });
    socket.addEventListener("close", function (event) {
      console.log("socket is close", event);
    });

  }, [])
  const appendList = (data: String) => {
    msgList = [...msgList, data]
    SetMsgs(msgList as never)
  }
  return (
    <div className="chat-container">
      {   msgs.map((item: any, index: any) => {
        return <div key={index} className="message-item">
          {item.type == 'message' ? <span> {`${item.data.user} ${item.data.content}`}</span> :
            <span>{item.data.content}</span>
          }
        </div>
      })}
    </div>
  )
}