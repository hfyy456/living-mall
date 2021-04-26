import React, { useEffect, useState } from 'react'
import './payment.scss'
import RoomIcon from '@material-ui/icons/Room';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';

export default function Payment() {
    const [voucherShow, setVoucherShow] = useState(false)
    const [finalPrice, setFinalPrice] = useState(0)
    const [orderInfo, setOrderInfo] = useState({
        name: '',
        id: "",
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
        var order = {
            name: "iPhone12 mini",
            desc: "256GB硬盘 4G内存 5G通信技术",
            goodId: '2321321321',
            id: '21321321321',
            createTime: "2012.2.12 19:40:20",
            num: 1,
            price: 6999,
            cover: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1947490335,1153307990&fm=224&gp=0.jpg"
        }
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
        setOrderInfo(order)
        setVoucherList(list as never)
        setFinalPrice(order.price)
    }, [])
    const toggleDrawer = (pos: any, bool: Boolean) => {
        setVoucherShow(false)
    }
    const handleSubmit = () => {
        var finalOrder = {
            ...orderInfo,
            finalPrice: finalPrice,
            voucherId: voucher.id
        }
    }
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
                <div className="title">dadasd</div>
                <div className="item">XXXX：{orderInfo.id}</div>
                <div className="item">创建时间：{orderInfo.createTime}</div>
                <div className="item">xxx：<span>{voucher.type === '' ? '暂无' : voucher.type === 'reduction' ? `满 ${voucher.condition} 减 ${voucher.price}` : `满 ${voucher.condition} 打 ${voucher.discount * 10} 折`}</span> <Button className='action' color="secondary" onClick={(e) => { setVoucherShow(true) }}>去使用</Button>
                </div>
            </section>
            <section className="paybar">
                <div className="total">
                    总计：<span className="price">{finalPrice}</span>
                </div>
                <Button variant="contained" color="secondary" onClick={handleSubmit}>
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
        </div>
    )
}