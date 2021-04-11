import React, { useEffect, useState } from 'react';
import './Navbar.scss'
import { NavLink, useHistory } from 'react-router-dom'
import Footer from '../components/Footer';

export default function Navbar(): JSX.Element {
  const path: any = useHistory()
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [isExpansion, setIsExpansion] = useState(false);
  const blogName: string = 'Sirius Blog'
  const menuList: Array<any> = [{
    name: '首页',
    path: '/',
    icon: 'home'
  }, {
    name: "关于",
    path: '/about',
    icon: 'feeds'
  },]
  useEffect(() => {
    console.log(path.location.pathname)
    return () => {
      setIsExpansion(false)
      document.body.style.overflowY = 'auto';
    }
  }, [path.location.pathname])
  const handClickCloseMenu = (e: any) => {
    setIsExpansion(false)
    document.body.style.overflowY = 'auto';
  }
  const handClickOpenMenu = (e: any) => {
    setIsExpansion(true)
    setIsFirstLoad(false)
    document.body.style.overflowY = 'hidden';
  }
  return (
    <div className='nav-wrapper'>
      <div className={`top-menu${isExpansion ? ' change' : ''}`}>
        <span className='blog-name '>{blogName}</span>
        <span className='nav-actions'>
          {isExpansion ?
            <div onClick={handClickCloseMenu}><i className='iconfont iconclose' /></div>
            : <div className='icon-outer' onClick={handClickOpenMenu}><i className='iconfont iconcategory-fill' /></div>
          }
        </span>
      </div>
      <nav className={`nav-container${isExpansion ? ' expand' : ''}${!isExpansion && !isFirstLoad ? ' fold' : ''}`} >
        {isExpansion ? <div className='menus'>
          {
            menuList.map((item, index) => {
              return <span className='menu-item' key={index}><NavLink activeClassName='menu-item-active' to={item.path}><i className={`iconfont icon${item.icon}-fill`} />{item.name}</NavLink></span>
            })
          }
        </div>

          : ''}
        <Footer />
      </nav>
    </div>

  )
}