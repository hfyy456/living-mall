import React, { useEffect, useState } from 'react';
import './chat.scss'
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import { useHistory, useParams } from 'react-router-dom'

export default function Chat() {
  const history = useHistory();

  const [inputValue, setInputValue] = useState('')
  const handleSubmit = () => {
  }
  const handleBack = () => {
    history.go(-1)
  }
  return (
    <div className="chats-container">
      <div className="top">
        <IconButton onClick={handleBack} aria-label="delete" size="small">
          <ArrowBackIosIcon fontSize="inherit" />
        </IconButton>
        <span>
          admin的旗舰店
          </span>
        <Button className="button" variant="outlined" size="small">店铺</Button>
      </div>
      <div className="msg-container">
        <div className='time'>
          2020/02/02 12:12:12
        </div>
        <div className="msg-box sender">
          <div className="msg">在吗</div>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </div>
        <div className="msg-box reci">
          <Avatar>
            <ImageIcon />
          </Avatar>
          <div className="msg">亲~ 您在我们店上买到的绝对是超值好宝贝，本小店超级实在的，没有华丽的语言，只有勤劳的工作，好品质的宝贝，谢谢支持！</div>
        </div>
        <div className="msg-box sender">
          <div className="msg">什么时候发货</div>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </div>
      </div>
      <div className="chat-control">
        <div className="bottom-actions">
          <div className="input-container">
            <input onChange={(e) => {
              var val = e.target.value
              setInputValue(val)
            }} placeholder='说点什么...' />
            <Button onClick={handleSubmit} variant="contained" color="secondary" size="small" className={'button'} >
              发送
          </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
