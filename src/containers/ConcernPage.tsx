import React from 'react';
import Living from '../components/Living'
import './Concern.scss'
export default function Concern() {
  return (
    <>
      <div className="recent-view">
        <div className="recent-list">
          <div className="recent-title">
            <div>最近</div>
            <div>常看</div>
          </div>
          <div className="recent-item">
            <img src="https://material-ui.com/static/images/cards/live-from-space.jpg" />
            <div>大米旗舰店</div>
            <img className="living-icon" src='https://shark2.douyucdn.cn/front-publish/live-master/assets/images/live_88e1ca6.webp' />
          </div>
          <div className="recent-item">
            <img src="https://material-ui.com/static/images/cards/live-from-space.jpg" />
            <div>sadasd</div>
            <img className="living-icon" src='https://shark2.douyucdn.cn/front-publish/live-master/assets/images/live_88e1ca6.webp' />
          </div>     <div className="recent-item">
            <img src="https://material-ui.com/static/images/cards/live-from-space.jpg" />
            <div>sadasd</div>
            <img className="living-icon" src='https://shark2.douyucdn.cn/front-publish/live-master/assets/images/live_88e1ca6.webp' />
          </div>
        </div>
      </div>
      <div className="title">
        <span>正在直播中</span>
      </div>
      <Living />
    </>
  )
}
