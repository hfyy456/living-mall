import React, { useEffect, useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Living from '../components/Living'
import './Home.scss'
import service from '../utils/fetch'
import { useDispatch } from 'react-redux';
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
  const [postList, setPostList] = useState([])
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const classes = useStyles();
  const classes_tabs = useStyles_tabs();

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  useEffect(() => {
    let params = {
    }
    service.post('article/list', params).then((res: any) => {
      setPostList(res.data)
      dispatch(setLoaded())

    })
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
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="title">
              <span>正在直播中</span>
            </div>
            <Living />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            Item Two
        </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            Item Three
        </TabPanel>
        </SwipeableViews>
      </main>
    </>
  )
}