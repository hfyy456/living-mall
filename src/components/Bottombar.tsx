import React, { useEffect, useState } from 'react';
import './Bottombar.scss';
import { useLocation, useHistory } from 'react-router-dom'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import MessageIcon from '@material-ui/icons/Message';
export default function Bottombar(): JSX.Element {
  const [value, setValue] = React.useState('recents');
  const location: any = useLocation();
  const history = useHistory();

  useEffect(() => {
    var path = location.pathname
    if (path.indexOf('explore') != '-1') {
      setValue("explore")
    } else {
      setValue("home")
    }
  }, [location])

  const handleChange = (e: any, newValue: any) => {
    setValue(newValue);
  };
  const navigateTo = (path: any) => {
    history.push(`/${path}`)
  };
  return (
    <div className="bottombar-container" >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
      >
        <BottomNavigationAction label="首页" value='home' onClick={(e) => navigateTo('')} icon={<HomeIcon />} />
        <BottomNavigationAction label="探索" value='explore' onClick={(e) => navigateTo('explore')} icon={<TrackChangesIcon />} />
        <BottomNavigationAction label="消息" value='message' onClick={(e) => navigateTo('message')} icon={<MessageIcon />} />
        <BottomNavigationAction label="我的" value='profile' onClick={(e) => navigateTo('profile')} icon={<PersonIcon />} />
      </BottomNavigation>
    </div>
  )

}

