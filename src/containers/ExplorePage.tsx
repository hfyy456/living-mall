import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoaded } from '../store/reducers/configSlice'
import Topbar from '../components/Topbar'
import './about.scss'

export default function Explore() {
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoaded())

    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='about-container'>
      <div className='content'>
        <section>
          <h4>关于我</h4>
          <p>新手开发一名，专注于写前端（搬砖），写过Vue，写过React，唯独没有接触过Jquery。</p>
          <p>偶尔写写后端，会Node，热衷用Python写爬虫。</p>
          <p>深度游戏迷，励志通关所有3a游戏。</p>
        </section>
        <section>
          <h4>现状</h4>
          <p>努力找工作中......</p>
        </section>
        <section>
          <h4>关于本站</h4>
          <p>使用React + Ts + Node开发，是初学React的练手之作，功能很简陋，水不在深，有龙则灵。</p>
          <p>Github: <a target="_blank" href="https://github.com/hfyy456">https://github.com/hfyy456</a></p>
        </section>
      </div></div>
  )
}