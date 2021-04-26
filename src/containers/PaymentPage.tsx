import React, { useEffect } from 'react'
import './payment.scss'
import RoomIcon from '@material-ui/icons/Room';
import Button from '@material-ui/core/Button';
export default function Payment() {

    useEffect(() => {

    }, [])
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
                
            </section>
            <section className="paybar">
                <div className="total">
                    总计：<span className="price">asdas</span>
                </div>
                <Button variant="contained" color="secondary">
                    提交订单
                </Button>
            </section>

        </div>
    )
}