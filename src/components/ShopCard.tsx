/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect } from 'react'
import './ShopCard.scss'
import { useHistory } from 'react-router-dom'

interface Iprops {
  name: string | undefined,
  id: string | undefined,
  cover: string | undefined
  follower: number | undefined
}
export default function ShopCard(props: Iprops) {
  const history = useHistory()
  const { name, id, cover, follower } = props
  useEffect(() => {

  })
  const handleClick = () => {
    history.push(`/store/${id}`)
  }
  return (
    <div className="shop-card-container">
      <section>
        <img src={cover} />
      </section>
      <section>
        <div onClick={handleClick} className="shop-name">
          {`${name}的自营小店`} &gt;
        </div>
        <div className="shop-follow">
          {follower}人关注
        </div>
      </section>
    </div >
  )
}