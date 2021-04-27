import React, { useEffect, useState } from 'react'
import './payment.scss'
import RoomIcon from '@material-ui/icons/Room';
import { FormControl, MenuItem, InputLabel, Select, Button, Drawer, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom'
import server from '../utils/fetch'
import { makeStyles } from '@material-ui/core/styles';

interface IParam {
    id: string
}
interface Iorder {
    name: string,
    _id: string,
    price: number,
    goodId: string,
    cover: string,
    desc: string,
    num: number,
    createTime: string,
}
const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));
export default function Payment() {
    const history = useHistory()
    const classes = useStyles();
    const [remain, setRemain] = useState(0)
    const [paywayList, setPaywayList] = useState([{ type: 'remain', text: "余额" }, { type: 'zfb', text: "支付宝" }, { type: 'wechat', text: "微信" }, { type: 'visa', text: "Visa" }])
    const param: IParam = useParams()
    const [payway, setPayway] = useState({ type: 'remain', text: "余额" })
    const [selectOpen, setSelectOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const [voucherShow, setVoucherShow] = useState(false)
    const [finalPrice, setFinalPrice] = useState(0)
    const [orderInfo, setOrderInfo] = useState<Iorder>({
        name: '',
        _id: "",
        price: 0,
        goodId: '',
        cover: '',
        desc: '',
        num: 0,
        createTime: '',
    })
    const [voucher, setVoucher] = useState({
        id: '2321321',
        type: '',
        price: 0,
        discount: 1,
        condition: '',
        startTime: "",
        endTime: "",
    })
    const [voucherList, setVoucherList] = useState([])
    useEffect(() => {
        var order: Iorder
        console.log(param)
        server.post('order/info', { id: param.id }).then((res: any) => {
            if (res.code === 20000) {
                order = res.data
                setOrderInfo(order)
                setFinalPrice(order.price)
            }
        })
        server.post('user/info',).then((res: any) => {
            if (res.code === 20000) {
                var remain = res.data.remain
                setRemain(remain)
            }
        })
        var list = [
            {
                id: '',
                used: false,
                type: "reduction",
                condition: 200,
                discount: 0,
                price: 30,
                startTime: "2012.02.12",
                endTime: "2012.02.12",
            },
            {
                type: "discount",
                used: false,
                condition: 200,
                discount: 0,
                price: 0,
                startTime: "2012.02.12",
                endTime: "2012.02.12",
            }
        ]
        setVoucherList(list as never)
    }, [])
    const toggleDrawer = (pos: any, bool: Boolean) => {
        setVoucherShow(false)
    }
    const handleSubmit = () => {
        var finalOrder = {
            ...orderInfo,
            finalPrice: finalPrice,
            voucherId: voucher.id,
            payway: payway.type
        }
        server.post('order/pay', finalOrder).then((res: any) => {
            console.log(res)
            if (res.code === 20000) {
                history.push('/finish')
            }
        })
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleSelectClose = () => {
        setSelectOpen(false);
    };
    const handleSelectChange = (event: any) => {
        console.log(event.target.value)
        paywayList.forEach(elem => {
            if (elem.text === event.target.value) {
                setPayway(elem);
            }
        })
    };
    const handleSelectOpen = () => {
        setSelectOpen(true);
    };
    const selectVoucher = (item: any) => {
        console.log(item)
        setVoucher(item)
        setVoucherShow(false)
        var price = orderInfo.price
        var newOrder = orderInfo
        if (item.type === "discount") {
            price = price * item.discount
        } else {
            price = price - item.price
        }
        setFinalPrice(price)
    }
    return (
        <div className="payment">
            <section className="path-card">
                <span>
                    <RoomIcon style={{ fontSize: "30px", color: "rgb(220, 0, 78)" }} />
                </span>
                <span>
                    <div style={{ "marginLeft": "1vw" }}>
                        <span className='name'>aaa</span>
                        <span className='phone'>    111111111</span>
                    </div>
                    <div style={{ "marginLeft": "1vw" }} className="location">啊撒大苏打实打实大大实打实的</div>
                </span>
                <span><Button variant="outlined">修改</Button>
                </span>
            </section>
            <section className="good-card">
                <div className="store-name">adasdasd</div>
                <div className="infor">
                    <span className="cover">
                        <img src={orderInfo.cover} />
                    </span>
                    <span>
                        <div className="name">{orderInfo.name}</div>
                        <div className="desc">{orderInfo.desc}</div>
                    </span>
                    <span className="pn">
                        <div className="price">￥{orderInfo.price}</div>
                        <div className="num">X{orderInfo.num}</div>
                    </span>
                </div>
            </section>
            <section className="voucher-card">
                <div className="title">订单信息</div>
                <div className="item">订单编号：{orderInfo._id}</div>
                <div className="item">创建时间：{orderInfo.createTime}</div>
                <div className="item">优惠券：<span>{voucher.type === '' ? '暂无' : voucher.type === 'reduction' ? `满 ${voucher.condition} 减 ${voucher.price}` : `满 ${voucher.condition} 打 ${voucher.discount * 10} 折`}</span> <Button className='action' color="secondary" onClick={(e) => { setVoucherShow(true) }}>去使用</Button>
                </div>
            </section>
            <section className="paybar">
                <div className="total">
                    总计：<span className="price">{finalPrice}</span>
                </div>
                <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                    提交订单
                </Button>
            </section>
            <Drawer anchor={"bottom"} open={voucherShow} onClose={(e) => toggleDrawer('bottom', false)}>
                <div className='v-container'>
                    {
                        voucherList.map((item: any, index) => (
                            <div key={index} className="voucher" onClick={() => selectVoucher(item)}>
                                <div className="left">
                                    {item.type === 'reduction' ? `￥${item.price}` : `${item.discount * 10}折`}
                                </div>
                                <div className="right">
                                    <div className="name">
                                        {item.type === 'reduction' ? `满 ${item.condition} 减 ${item.price}` : `满 ${item.condition} 打 ${item.discount * 10} 折`}
                                    </div>
                                    <div className="date">
                                        期限：{`${item.startTime} - ${item.endTime}`}
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </Drawer>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">支付方式选择</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        你总共需要支付<span style={{ color: "rgb(220, 0, 78)" }} >{finalPrice}</span>元，请选择支付方式(默认余额)。
                    </DialogContentText>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">方式</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={selectOpen}
                            onClose={handleSelectClose}
                            onOpen={handleSelectOpen}
                            value={payway.text}
                            onChange={handleSelectChange}
                        >
                            {
                                paywayList.map((item, index) => {
                                    return (
                                        <MenuItem key={item.type} value={item.text}>{item.text}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                        <span className="remain">你的余额：<span>{remain}</span></span>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        取消
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        确认支付
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}