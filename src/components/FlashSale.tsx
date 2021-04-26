import React, { useEffect, useState } from 'react'
import './flashSale.scss'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom'

import server from '../utils/fetch'
export default function FlashSale() {
    const history = useHistory()
    const [inventory, setInventory] = useState(1)
    const [countdown, setCountdown] = useState(0)
    const cover = "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1947490335,1153307990&fm=224&gp=0.jpg"
    const id = "6086f3ba81ef614892d73152"
    useEffect(() => {

    }, [])
    const handleSubmit = () => {
        server.post('order/create', {
            id: id,
            num: 1,
        }).then((res: any) => {
            const _id = res.data._id
            history.push(`/payment/${_id}`)
        })
    }
    return (
        <div className="flash-sale">
            <section>
                <img className='cover' src={cover} />
            </section>
            <section>
                苹果手机
            </section>
            <section className="price">
                ￥2222
            </section>
            <section>
                倒计时：{countdown}
            </section>
            <section>
                剩余库存：{inventory}
            </section>

            <Button className="btn" variant="contained" color="secondary" onClick={handleSubmit}>
                立即抢购
            </Button>
        </div>
    )
}
