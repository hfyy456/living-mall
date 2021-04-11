/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect } from 'react'
import './Footer.scss'
export default function Footer() {
  useEffect(() => {

  })
  return (
    <footer className='footer-container'>
      <div className='links'>
        <a target="_blank" rel="noreferrer" href='https://github.com/hfyy456' className='iconfont icongithub'></a>
        <a target="_blank" rel="noreferrer" href='https://qiniu.hfsblog.com/mmqrcode1606545113726.png' className='iconfont iconwechat'></a>
        <a target="_blank" rel="noreferrer" href='mailto:540363975@qq.com' className='iconfont iconmail mail'></a>
        <a target="_blank" rel="noreferrer" href='http://wpa.qq.com/msgrd?v=3&uin=540363975&site=qq&menu=yes' className='iconfont iconqq'></a>
      </div>
      <div className='copyright'>Copyright © 2020 By SIRIUS
      | Theme by&nbsp;
      <a target="_blank" rel="noreferrer" href='https://butterfly.js.org/' >Jerry</a> and&nbsp;
       <a target="_blank" rel="noreferrer" href='https://fech.in/' >Fechin</a>.
      </div>
    </footer>
  )
}