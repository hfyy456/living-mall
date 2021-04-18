import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Swiper from 'swiper'
import 'swiper/swiper.min.css';
import { setLoaded } from '../store/reducers/configSlice'
import './good.scss'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ShareIcon from '@material-ui/icons/Share';
import PolicyIcon from '@material-ui/icons/Policy';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ShopCard from '../components/ShopCard';

export default function About() {
  const dispatch = useDispatch()

  useEffect(() => {
    var swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
    });

    setTimeout(() => {
      dispatch(setLoaded())

    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='good-container'>
      <section className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide"><img src="https://material-ui.com/static/images/cards/paella.jpg" /></div>
          <div className="swiper-slide">Slide 2</div>
          <div className="swiper-slide">Slide 3</div>
        </div>
        <div className="swiper-pagination"></div>
      </section>
      <section className="infor-card">
        <section className="price-sec">
          <span className="price">
            ￥2999
          </span>
          <span className="old-price">
            原价￥3999
          </span>
          <span className="m-sell">
            月销 9999+
          </span>
        </section>
        <section className="name-sec">
          <div className="name">asdasdasdasdasdsadasdasdsad</div>
        </section>
        <section className="info-sec">
          <div>
            <span className="title">发货</span>
            <span className="content">浙江杭州 | 快递: 免运费</span>
          </div>
          <div>
            <span className="title">保障</span>
            <span className="content">假一赔十·上门取退·极速退款</span>
          </div>
        </section>
        <section className="action-sec">
          <span>
            <StarBorderIcon />
            <span>收藏</span>
          </span>
          <span>
            <ShareIcon />
            <span>分享</span>
          </span>
          <span>
            <PolicyIcon />
            <span>举报</span>
          </span>
        </section>
      </section>
      <section className="action-table">
        <ButtonGroup disableElevation variant="contained" color="secondary">
          <Button >加入购物车</Button>
          <Button  >立即购买</Button>
        </ButtonGroup>
      </section>
      <ShopCard />
      <section className="good-desc">
        <p>desc</p>
        <p>desc</p>
        <p>desc</p>
        <p>desc</p>
        <p>desc</p>
        <p>desc</p>
        <p>desc</p>
        <p>desc</p>
        <p>desc</p>


      </section>
    </div>
  )
}