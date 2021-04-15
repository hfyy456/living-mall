import React, { useEffect, useState } from 'react';
import './Navbar.scss'
import { NavLink, useHistory } from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';



export default function Navbar(): JSX.Element {
  const path: any = useHistory()

  const [value, setValue] = useState(0)
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
  const handleChange = () => {

  }
  return (
    <div>
      <Tabs indicatorColor="primary"
        textColor="primary" value={value} onChange={handleChange} aria-label="ant example">
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
        <Tab label="Tab 3" />
      </Tabs>
    </div >
  )
}