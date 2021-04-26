import React, { useEffect, useState } from 'react'
import './finish.scss'
import { useHistory } from 'react-router-dom'

export default function Finish() {
    const history = useHistory();
    const id = localStorage.getItem('id')
    const [count, setCount] = useState(10)
    useEffect(() => {
        var t = 10
        const timer = setInterval(() => {
            t = t - 1
            setCount(count => count - 1)
            if (t === 0) {
                clearInterval(timer)
                history.push(`/profile/${id}`)
            }
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])
    return (
        <div className="finish">
            <section>
                <span>支付成功</span>,即将前往个人中心({count}s)。
            </section>
        </div>
    )
}
