/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect } from 'react'
import './ShopCard.scss'
export default function Footer() {
  useEffect(() => {

  })
  return (
    <div className="shop-card-container">
      <section>
        <img src="https://material-ui.com/static/images/cards/paella.jpg" />
      </section>
      <section>
        <div className="shop-name">
          萨达萨达阿德自营店 &gt;
        </div>
        <div className="shop-follow">
          19万人关注
        </div>
      </section>
    </div >
  )
}