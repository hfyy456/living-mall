import React from 'react';
import { NavLink } from 'react-router-dom';
import './Topbar.scss'

export default function Topbar() {
  return (
    <header className='top-container'>
      <NavLink to='/'>  <i className='iconfont iconhome' /></NavLink>
    </header>
  )
}