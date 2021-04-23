import React from 'react'
import './Living.scss'
import RoomIcon from '@material-ui/icons/Room';
import { useLocation, useHistory } from 'react-router-dom'

export default function Living(props: any) {
  const { title, owner, id } = props
  const history = useHistory();

  const handleClick = () => {
    history.push(`/room/${id}`)
  }
  return (
    <div onClick={handleClick} className="living-container">
      <div className="living-card">

        <div className="cover-wrapper">
          <img src="https://material-ui.com/static/images/cards/live-from-space.jpg" />
        </div>
        <div className="infor">
          <div className="living-name">
            {title == '' ? `${owner}的直播间` : title}
          </div>
          <div className="living-infor">堪比双十一！！</div>
        </div>
        <div className="shop">

          <div className="living-shop"><img src="https://material-ui.com/static/images/cards/live-from-space.jpg" /> <span>{`${owner}`}</span></div>
          <img className="living-icon" src='https://shark2.douyucdn.cn/front-publish/live-master/assets/images/live_88e1ca6.webp' />
        </div>
        <div className="location">
          <span><RoomIcon />广州市天河区</span>
        </div>
      </div>

    </div>
  )

}