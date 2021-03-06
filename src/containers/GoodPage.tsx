import React, { useEffect, useState } from 'react';
import Swiper from 'swiper'
import 'swiper/swiper.min.css';
import './good.scss'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ShareIcon from '@material-ui/icons/Share';
import PolicyIcon from '@material-ui/icons/Policy';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ShopCard from '../components/ShopCard';
import service from '../utils/fetch'
import { useHistory, useParams } from 'react-router-dom'
interface IParam {
  id: string
}
interface IInfo {
  sales: number,
  oprice: number,
  price: number,
  name: string,
  desc: string,
  owner: string,
  _id: string,
  images: Array<any>
}
interface IStore {
  username: string,
  living: boolean,
  cover: string,
  _id: string,
  follower: number,
  roomId: string
}
export default function Good() {
  const history = useHistory();
  const param: IParam = useParams()
  const [info, setInfo] = useState<IInfo>()
  const [store, setStore] = useState<IStore>()

  useEffect(() => {
    service.post('good/info', { id: param.id }).then((res: any) => {
      setInfo(res.data)
      console.log(res.data)
      var owner = res.data.owner
      service.post('store/info', { owner: owner }).then((res: any) => {
        setStore(res.data)
      })
    })
    // eslint-disable-next-line
    var swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const goRoom = () => {
    history.push(`/room/${store?.roomId}`)
  }
  const back = () => {
    history.go(-1)
  }
  const handleSubmit = () => {
    service.post('order/create', {
      id: info?._id,
      num: 1,
      type: ""
    }).then((res: any) => {
      const _id = res.data._id
      history.push(`/payment/${_id}`)
    })
  }
  return (
    <div className='good-container'>
      <section className="swiper-container">
        <div className="swiper-wrapper">
          {info?.images.map((item, index) => {
            return <div key={index} className="swiper-slide"><img src={item} /></div>
          })}
        </div>
        <div className="swiper-pagination"></div>
      </section>
      <section className="infor-card">
        <section className="price-sec">
          <span className="price">
            ???{info?.price}
          </span>
          <span className="old-price">
            ?????????{info?.oprice}
          </span>
          <span className="m-sell">
            ?????? {info?.sales}
          </span>
        </section>
        <section className="name-sec">
          <div className="name">{info?.name}</div>
        </section>
        <section className="info-sec">
          <div>
            <span className="title">??????</span>
            <span className="content">???????????? | ??????: ?????????</span>
          </div>
          <div>
            <span className="title">??????</span>
            <span className="content">????????????????????????????????????????</span>
          </div>
        </section>
        <section className="action-sec">
          <span>
            <StarBorderIcon />
            <span>??????</span>
          </span>
          <span>
            <ShareIcon />
            <span>??????</span>
          </span>
          <span>
            <PolicyIcon />
            <span>??????</span>
          </span>
        </section>
      </section>
      <section className="action-table">
        <Button className="action-back" onClick={back} >&lt;??????</Button>
        <ButtonGroup disableElevation variant="contained" color="secondary">
          <Button >???????????????</Button>
          <Button onClick={handleSubmit} >????????????</Button>
        </ButtonGroup>
      </section>
      <ShopCard follower={store?.follower} cover={store?.cover} name={store?.username} id={store?._id} />
      <section className="good-desc">
        <p>{info?.desc}</p>
      </section>
      {
        store?.living ? <div onClick={goRoom} className='living-portal'>
          <img src="https://shark2.douyucdn.cn/front-publish/live-master/assets/images/live_88e1ca6.webp" />
        </div> : null
      }
    </div>
  )
}