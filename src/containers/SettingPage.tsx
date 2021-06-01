import React, { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory, useParams } from 'react-router-dom'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import './setting.scss'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);
function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}
export default function Setting() {
  const history = useHistory();
  const classes = useStyles();

  const handleBack = () => {
    history.go(-1)
  }
  const logout = () => {
    localStorage.clear()
    history.push('/login')
  }
  return (
    <div className="setting-container">
      <div className="top">
        <IconButton onClick={handleBack} aria-label="delete" size="small">
          <ArrowBackIosIcon style={{ color: "white" }} fontSize="inherit" />
        </IconButton>
        <div className="setting-text">设置</div>
      </div>
      <div>
        <List className="list-setting" component="nav" aria-label="secondary mailbox folders">
          <ListItem button>
            <ListItemText primary="账号与安全" />
          </ListItem>
          <Divider />
          <ListItemLink href="#simple-list">
            <ListItemText primary="我的收货地址" />
          </ListItemLink>
          <Divider />

          <ListItemLink href="#simple-list">
            <ListItemText primary="支付" />
          </ListItemLink>
        </List>
        <List className="list-setting" component="nav" aria-label="secondary mailbox folders">
          <ListItem button>
            <ListItemText primary="消息通知" />
          </ListItem>
          <Divider />
          <ListItemLink href="#simple-list">
            <ListItemText primary="主题换肤" />
          </ListItemLink>
          <Divider />
          <ListItemLink href="#simple-list">
            <ListItemText primary="隐私" />
          </ListItemLink>
          <Divider />
          <ListItemLink href="#simple-list">
            <ListItemText primary="通用" />
          </ListItemLink>
        </List>
        <List className="list-setting" component="nav" aria-label="secondary mailbox folders">
          <ListItem button>
            <ListItemText primary="帮助与反馈" />
          </ListItem>
          <Divider />
          <ListItemLink href="#simple-list">
            <ListItemText primary="关于本平台" />
          </ListItemLink>
        </List>
        <div>
          <div className="list-button">
            切换账号
          </div>
          <div onClick={logout} className="list-button">
            退出登录
          </div>
        </div>
      </div>
    </div>
  )
}