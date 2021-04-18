import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoaded } from '../store/reducers/configSlice'
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

export default function Profile() {
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoaded())

    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='proflie-container'>
      <div className="personal-infor">
        <div>
          <img src="https://material-ui.com/static/images/cards/live-from-space.jpg" className="avatar"></img>
        </div>
        <div className="sec">
          <div className="username">用户名</div>
          <div className="desc">yonghuming</div>
          <div className="level">Lv.12</div>
        </div>
        <SettingsIcon className="setting" />
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
          <div className="type">
            <ListAltIcon />
            <div className="name">所有订单</div>
          </div>
        </div>
      </div>
      <Basket />
      </div>
  )
}