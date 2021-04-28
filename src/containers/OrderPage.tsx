import React, { useEffect, useState } from 'react';
import { IconButton, AppBar, List, Divider, Avatar, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import service from '../utils/fetch'
import './order.scss'
import ArrowBackIosIcon from '@material-ui/icons/Delete';

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
    cover: string
}
export default function Order() {
    const [list, setList] = useState<Array<Iorder>>([])
    const classes = useStyles();
    useEffect(() => {
        service.post('order/list', {}).then((res: any) => {
            setList(res.data)
        })
    }, [])
    return (
        <div>
            <AppBar>
                <IconButton aria-label="ArrowBack">
                    <ArrowBackIosIcon />
                </IconButton>
            </AppBar>
            <List className={classes.root}>
                {list.map((item, index) => {
                    return <div> <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar variant="square" src={item?.cover} >
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item?.name} secondary={item?.createTime} />
                        <div className="status-tag">
                            支付成功
                        </div>
                    </ListItem>
                        <Divider />
                    </div>
                })}
            </List>
        </div>
    )

}
