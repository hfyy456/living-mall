import React, { useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import './message.scss'
import { useHistory, useParams } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);
export default function Message() {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = () => {
    history.push('/chat/1111')
  }
  return (
    <div>
      <div className="message-title">消息中心</div>
      <List className={classes.root}>
        <ListItem onClick={handleClick}>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="admin的旗舰店" secondary="什么时候发货" />
          <div className="date-msg">昨天</div>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem onClick={handleClick}>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="sadasd" secondary="这个咋卖" />
          <div className="date-msg">星期三</div>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem onClick={handleClick}>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="jjjjjj" secondary="你好" />
          <div className="date-msg">21/5/12</div>
        </ListItem>
        <Divider variant="inset" component="li" />

      </List>
    </div>
  )
}