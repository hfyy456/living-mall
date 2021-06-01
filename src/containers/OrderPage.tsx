import React, { useEffect, useState } from 'react';
import { IconButton, AppBar, List, Divider, Avatar, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import service from '../utils/fetch'
import './order.scss'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from 'react-router-dom'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        paddingTop: "14vw",
        backgroundColor: theme.palette.background.paper,
    },
}));
interface Iorder {
    name: string,
    createTime: string,
    _id: string,
    cover: string,
    state: string,
}
const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);
export default function Order() {
    const [list, setList] = useState<Array<Iorder>>([])
    const history = useHistory()
    const classes = useStyles();
    const expressData = { "message": "ok", "nu": "773095664866909", "ischeck": "0", "condition": "B00", "com": "shentong", "status": "200", "state": "1", "data": [{ "time": "2021-05-06 21:56:49", "ftime": "2021-05-06 21:56:49", "context": "已签收，收件人凭客户短信取件签收", "location": "广州市天河区金地自在遇青年社区中间通道丰巢柜4号柜" }, { "time": "2021-05-06 11:38:40", "ftime": "2021-05-06 11:38:40", "context": "快递已被【丰巢智能柜】广州市天河区金地自在遇青年社区中间通道丰巢柜4号柜代收，请及时取件。有问题请联系15915856934", "location": "广州市天河区金地自在遇青年社区中间通道丰巢柜4号柜" }, { "time": "2021-05-06 08:05:58", "ftime": "2021-05-06 08:05:58", "context": "【广东广州车陂公司】的派件员【苏园】正在为您派件，如有疑问请联系派件员，联系电话【15915856934】", "location": "广东广州车陂公司" }, { "time": "2021-05-06 07:53:28", "ftime": "2021-05-06 07:53:28", "context": "快件已到达【广东广州车陂公司】扫描员是【狂扫到件】", "location": "广东广州车陂公司" }, { "time": "2021-05-06 05:25:07", "ftime": "2021-05-06 05:25:07", "context": "快件由【广东广州转运中心】发往【广东广州车陂公司】", "location": "广东广州转运中心" }, { "time": "2021-05-06 05:10:47", "ftime": "2021-05-06 05:10:47", "context": "快件已到达【广东广州转运中心】扫描员是【张昊天】", "location": "广东广州转运中心" }, { "time": "2021-05-06 01:23:37", "ftime": "2021-05-06 01:23:37", "context": "快件由【广东沙田转运中心】发往【广东广州转运中心】", "location": "广东沙田转运中心" }, { "time": "2021-05-06 01:15:16", "ftime": "2021-05-06 01:15:16", "context": "快件已到达【广东沙田转运中心】扫描员是【4区备用】", "location": "广东沙田转运中心" }, { "time": "2021-05-05 23:03:10", "ftime": "2021-05-05 23:03:10", "context": "快件由【广东东莞虎门集散中心】发往【广东沙田转运中心】", "location": "广东东莞虎门集散中心" }, { "time": "2021-05-05 22:55:55", "ftime": "2021-05-05 22:55:55", "context": "快件已到达【广东东莞虎门集散中心】扫描员是【虎门集散自动分拣】", "location": "广东东莞虎门集散中心" }, { "time": "2021-05-05 20:03:47", "ftime": "2021-05-05 20:03:47", "context": "【广东东莞虎门大客户部】的收件员【怀德-夏凤娇】已收件", "location": "广东东莞虎门大客户部" }] }
    useEffect(() => {
        service.post('order/list', {}).then((res: any) => {
            setList(res.data)
        })
    }, [])
    const backTo = () => {
        history.go(-1)
    }
    const filterTag = (tag: any) => {
        switch (tag) {
            case 'payed':
                return '已支付'
            case 'finished':
                return '已完成'
            case 'created':
                return '已创建'
            case 'posted':
                return '运输中'
            default:
                break
        }
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <AppBar>
                <IconButton onClick={backTo} aria-label="ArrowBack">
                    <ArrowBackIosIcon style={{ color: "white" }} />
                </IconButton>
            </AppBar>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    申通快递
        </DialogTitle>
                <DialogContent dividers>
                    <Stepper activeStep={1} orientation="vertical">
                        {expressData.data.map((item, index) => (
                            <Step key={index}>
                                <StepLabel>{`${item.location,item.context}`}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        关闭
          </Button>
                </DialogActions>
            </Dialog>
            <List className={classes.root}>
                {list.map((item, index) => {
                    return <div> <ListItem onClick={handleClickOpen} key={index}>
                        <ListItemAvatar>
                            <Avatar variant="square" src={item?.cover} >
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item?.name} secondary={item?.createTime} />
                        <div className="status-tag">
                            {filterTag(item?.state)}
                        </div>
                    </ListItem>
                        <Divider />
                    </div>
                })}
            </List>
        </div>
    )

}
