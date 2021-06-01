import React, { forwardRef, useEffect, useState, useImperativeHandle } from 'react';
import './Chat.scss'
function Chat(props: any) {

  const { socket } = props
  let msgList: Array<any> = [{ type: 'notify', content: '欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！' }]
  const [msgs, SetMsgs] = useState([{ type: 'notify', content: '欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！欢迎来到本直播间！' }])
  useEffect(() => {
    socket.on('recive_msg', function (msg: any) {
      const res = JSON.parse(msg)
      console.log(res.data)
      if (res.data.type != 'admin') {
        appendList(res.data)
      }
    })
    return (() => {
    })
  }, [])
  const appendList = (data: any) => {
    msgList = [...msgList, data]
    SetMsgs(msgList)
  }

  return (
    <div className="chat-container">
      {   msgs.map((item: any, index: any) => {
        return <div key={index} className="message-item">
          {item.type == 'message' ? <span> {`${item.username} ${item.content}`}</span> :
            (item.type == 'join' || item.type == 'broadcast' ? <span> {`公告：${item.content}`}</span> : <span>{item.content}</span>)
          }
        </div>
      })}
    </div>
  )
}
export default Chat