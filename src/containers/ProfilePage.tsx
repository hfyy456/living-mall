import React, { useEffect, useState } from 'react';
import './Profile.scss'
import Basket from '../components/Basket'
import SettingsIcon from '@material-ui/icons/Settings';
import PaymentIcon from '@material-ui/icons/Payment';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ListAltIcon from '@material-ui/icons/ListAlt';
import HistoryIcon from '@material-ui/icons/History';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PagesIcon from '@material-ui/icons/Pages';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import Divider from '@material-ui/core/Divider';
import service from '../utils/fetch'
import { useHistory } from 'react-router-dom'

export default function Profile() {
  const history = useHistory()

  const [userInfo, setUserInfo] = useState({
    username: '',
    desc: '',
    level: '',
    avatar: '',
  })
  const pushOrder = () => {
    history.push('/order')
  }
  const pushSetting = () => {
    history.push('/setting/1')
  }
  useEffect(() => {
    service.post('user/info', {}).then((res: any) => {
      const code = res.code
      if (code === 20000) {
        setUserInfo(res.data)
        localStorage.setItem('username', res.data.username)

      } else {

      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='proflie-container'>
      <div className="personal-infor">
        <div>
          <img alt="avatar" src="https://material-ui.com/static/images/cards/live-from-space.jpg" className="avatar"></img>
        </div>
        <div className="sec">
          <div className="username">{userInfo.username}</div>
          <div className="desc">{userInfo.desc}</div>
          <div className="level">Lv.{userInfo.level}</div>
        </div>
        <SettingsIcon onClick={pushSetting} className="setting" />
      </div>
      <div className="order-card">
        <div className="sub-list">
          <div className='sub-item'>
            <StarBorderIcon />
            <span>收藏</span>
          </div>
          <div className='sub-item'>
            <PagesIcon />
            <span>订阅店铺</span>
          </div>
          <div className='sub-item'>
            <CardGiftcardIcon />
            <span>优惠券</span>
          </div>
        </div>
        <Divider />
        <div className="order-list">
          <div className="type">
            <PaymentIcon />
            <div className="name">待付款</div>
          </div>
          <div className="type">
            <QueuePlayNextIcon />
            <div className="name">运输中</div>
          </div>
          <div className="type">
            <CheckBoxIcon />
            <div className="name">已完成</div>

          </div>
          <div className="type">
            <HistoryIcon />
            <div className="name">退款售后</div>

          </div>
          <div onClick={pushOrder} className="type">
            <ListAltIcon />
            <div className="name">所有订单</div>
          </div>
        </div>
      </div>
      <Basket />
    </div>
  )
}