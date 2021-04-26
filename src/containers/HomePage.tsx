import React, { useEffect, useState } from 'react';
import {
  selectUserInfo
} from '../store/reducers/userSlice';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import './Home.scss'
import io from 'socket.io-client'
import Concern from './ConcernPage'
import Featured from './FeaturedPage'
import Local from './LocalPage'
import { useDispatch, useSelector } from 'react-redux';
import { setLoaded } from '../store/reducers/configSlice'
function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "3px 6px",
    fontSize: "14px",
    minHeight: "5vh",
    minWidth: "2vw"
  },
}));
const useStyles_tabs = makeStyles((theme) => ({
  root: {
    minHeight: "0"
  },
  indicator: {

  },
}));
export default function Home() {
  const dispatch = useDispatch()
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const classes = useStyles();
  const classes_tabs = useStyles_tabs();
  const userInfo = useSelector(selectUserInfo);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  useEffect(() => {
    console.log(userInfo)
    setTimeout(() => {
      dispatch(setLoaded())
    }, 300);
    var namespace = 'http://127.0.0.1:5000/home'
    var socket = io(namespace);
    socket.on('connect', function () {
      socket.emit('my_event', { data: 'I\'m connected!' });
    });
    socket.on('my_response', function (msg: any) {
      console.log(msg)
    })
    return () => {
      socket.close()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <main className='home-page'>
        <div className="tabs-container">
          <Tabs
            classes={{ root: classes_tabs.root }}
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="full width tabs example"
          >
            <Tab classes={{ root: classes.root }}
              label="关注" {...a11yProps(0)} />
            <Tab classes={{ root: classes.root }}
              label="精选" {...a11yProps(1)} />
            <Tab classes={{ root: classes.root }}
              label="本地" {...a11yProps(2)} />
          </Tabs>
        </div>
        <SwipeableViews
          className="viewer"
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Concern />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Featured />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Local />
          </TabPanel>
        </SwipeableViews>
      </main>
    </>
  )
}