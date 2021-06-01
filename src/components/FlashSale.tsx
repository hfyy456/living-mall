import React, { useEffect, useState } from 'react'
import './flashSale.scss'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';

import server from '../utils/fetch'
export default function FlashSale(props: any) {
    var endTime = "";
    var timer: any = null
    const { socket } = props
    const history = useHistory()
    const [isShow, setIsShow] = useState(false)
    const [inventory, setInventory] = useState(0)
    const [price, setPrice] = useState(1)
    const [cover, setCover] = useState("")
    const [name, setName] = useState("")
    const [goodId, setGoodId] = useState("")

    const [closed, setClosed] = useState(false)
    const [countdown, setCountdown] = useState("")
    const [id, setId] = useState("")
    useEffect(() => {
        socket.on('flash', function (msg: any) {
            console.log("+++++ flash +++++")
            const res = JSON.parse(msg)
            console.log(res)
            setIsShow(true)
            setInventory(res.data.inventory)
            setPrice(res.data.price)
            setId(res.data.id)
            setCover(res.data.cover)
            setGoodId(res.data.goodId)
            setName(res.data.name)
            endTime = res.data.endTime
            endTime = endTime.substring(0, 19);
            endTime = endTime.replace(/-/g, '/');
            var endTimestamp = new Date(endTime).getTime();
            clearInterval(timer)
            timer = setInterval(() => {
                var now: any = new Date().getTime()
                console.log(endTimestamp, now)
                var left = ((endTimestamp - now) / 1000).toFixed(0)
                setCountdown(left)
            }, 1000);
        })
        return () => {
            clearInterval(timer)
        }
    }, [])
    const handleSubmit = () => {
        server.post('order/create', {
            id: goodId,
            num: 1,
            type:"flash"
        }).then((res: any) => {
            const _id = res.data._id
            history.push(`/payment/${_id}`)
        })
    }
    const handleOnClose = () => {
        setIsShow(false)
    }
    return (
        <div>
            {isShow ? <div className="flash-sale">
                <IconButton aria-label="close" className={'card-close'} onClick={handleOnClose} >
                    <CloseIcon />
                </IconButton>
                <section  >
                    <img className='cover' src={cover} />
                </section >
                <section>
                    {name}
                </section>
                <section className="price">
                    ￥{price}
                </section>
                {
                    parseInt(countdown) > 0 && inventory > 0 ? <div>

                        <section>
                            倒计时：{countdown} secs
                        </section>
                        <section>
                            剩余库存：{inventory}
                        </section>

                        <Button className="btn" variant="contained" color="secondary" onClick={handleSubmit}>
                            立即抢购
                </Button>
                    </div> :
                        <section style={{ marginTop: "3vh", fontSize: "24px" }}>
                            抢购已结束
                        </section>
                }

            </div > : null
            }

        </div >



    )
}
