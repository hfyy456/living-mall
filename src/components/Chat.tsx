import React, { forwardRef, useEffect, useState, useImperativeHandle } from 'react';
import './Chat.scss'
function Chat(props: any, ref: any) {
  useImperativeHandle(ref, () => ({
    sendMsg: (type: any, data: any) => {
      sendMsg(type, data)
    }
  }));
  let socket: any = new WebSocket("ws://127.0.0.1:8000");

  var msg = {
    type: 'init',
    data: {
      user: `userabcd`
    },
  }
  let msgList: Array<any> = [{ type: 'notify', data: { content: '欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！' } }]
  const [msgs, SetMsgs] = useState([{ type: 'notify', data: { content: '欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！' } }])
  useEffect(() => {
    socket.addEventListener("open", function (event: any) {

      socket.send(JSON.stringify(msg));
    });

    socket.addEventListener("message", function (event: any) {
      var res = JSON.parse(event.data)
      if (res.type == 'message' || res.type == 'enter') {
        appendList(res)
        console.log("Message from server", event.data);
      }

    });
    socket.addEventListener("close", function (event: any) {
      console.log("socket is close", event);
    });
    return (() => {
      socket.close()
    })
  }, [])
  const appendList = (data: String) => {
    msgList = [...msgList, data]
    SetMsgs(msgList as never)
  }
  const sendMsg = (type: String, data: Object) => {
    var msg = {
      type: type,
      data: {
        ...data, user: `useradasfas`
      },
    }
    socket.send(JSON.stringify(msg));
  }
  return (
    <div className="chat-container">
      {   msgs.map((item: any, index: any) => {
        return <div key={index} className="message-item">
          {item.type == 'message' ? <span> {`${item.data.user} ${item.data.content}`}</span> :
            (item.type == 'enter' ? <span> {`${item.data.user}${item.data.content}`}</span> : <span>{item.data.content}</span>)
          }
        </div>
      })}
    </div>
  )
}
export default forwardRef(Chat)