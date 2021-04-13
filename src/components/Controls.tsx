import React, { useEffect, useRef, useState } from 'react';
import './Controls.scss'
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ForwardIcon from '@material-ui/icons/Forward';

import WhatshotIcon from '@material-ui/icons/Whatshot';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { useHistory } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Chat from './Chat'

const useStyles = makeStyles((theme) => ({
  paperAnchorBottom: {
    maxHeight: '45vh'
  },
  paper: {
    display: 'block'
  }
}));
export default function Controls(): JSX.Element {
  const classes = useStyles();

  const history = useHistory();
  const [cardShow, setCardShow] = useState(true)
  const [shopShow, setShopShow] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const chatRef = useRef({ sendMsg: function (msg: any, data: any) { } })
  const handleOnClose = () => {
    history.push(`/`)
  }
  const handleOnCardClose = () => {
    setCardShow(false)
  }
  const toggleDrawer = (pos: any, bool: Boolean) => {
    setShopShow(false)
  }
  const handleSubmit = () => {
    chatRef.current.sendMsg('message', {
      content: inputValue
    })
  }
  return (
    <div className='controls'>
      <div className='topBar'>
        <div className='anchor-card'>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={"avatar"} />
          <div className="information">
            <div>主播名字</div>
            <div><span>1000人气</span></div>
          </div>
          <Button variant="contained" color="secondary" size="small" className={'button'} >
            关注
            </Button>
        </div>
        <IconButton aria-label="close" className={'close'} onClick={handleOnClose} >
          <CloseIcon />
        </IconButton>
      </div>
      {cardShow ? <Card className="good-card">
        <IconButton aria-label="close" className={'card-close'} onClick={handleOnCardClose} >
          <CloseIcon />
        </IconButton>
        <CardMedia
          image="https://material-ui.com/static/images/cards/paella.jpg"
          title="Paella dish"
          className="good-cover"
        />
        <div>
          <div className="good-name">啊大苏打实打实的撒打算</div>
          <div className="good-price">
            ￥2,000
          </div>
        </div>
        <CardActions className='card-actions' disableSpacing>
          <IconButton className="shop-cart-button" aria-label="add to favorites">
            <ShoppingCartIcon />
          </IconButton >
        </CardActions>
      </Card> : null}
      <Chat ref={chatRef} />
      <div className="bottom-actions">
        <div className="input-container">
          <input onChange={(e) => {
            var val = e.target.value
            setInputValue(val)
          }} placeholder='和主播说点什么...' />
          <Button onClick={handleSubmit} variant="contained" color="secondary" size="small" className={'button'} >
            发送
          </Button>
        </div>
        <IconButton aria-label="recommend" className={'icon-button'} onClick={(e) => { setCardShow(!cardShow) }} >
          <WhatshotIcon />
        </IconButton>
        <IconButton aria-label="recommend" className={'icon-button'} onClick={(e) => { setShopShow(true) }} >
          <StorefrontIcon />
        </IconButton>
      </div>
      <Drawer classes={{
        paperAnchorBottom: classes.paperAnchorBottom,
        paper: classes.paper
      }} className='drawer' anchor={'bottom'} open={shopShow} onClose={(e) => toggleDrawer('bottom', false)} >
        <Card className="shop-card">
          <CardMedia
            image="https://material-ui.com/static/images/cards/paella.jpg"
            title="Paella dish"
            className="shop-cover"
          />
          <div>
            <div className="shop-name">啊大苏打实打实的撒打算</div>
            <div className="shop-price">
              ￥2,000
          </div>
          </div>
          <CardActions className='shop-actions' disableSpacing>
            <IconButton className="shop-cart-button" aria-label="add to favorites">
              <ForwardIcon />
            </IconButton >
          </CardActions>
        </Card>
      </Drawer>
    </div >
  )
}