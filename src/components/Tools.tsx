import React, { useEffect, useState } from 'react'
import { selectTheme, switchDark, switchLight } from '../store/reducers/configSlice'
import { useDispatch, useSelector } from 'react-redux';
import './Tools.scss'
export default function Tools() {
  const dispatch = useDispatch();
  const theme: string = useSelector(selectTheme)
  const [visibie, setVisible] = useState(false)
  useEffect(() => {
    document.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibie])
  function throttle(fn: { apply: (arg0: any, arg1: any[]) => void }, t: number) {
    let flag = true
    const interval = t || 500
    return function (this: any, ...args: any) {
      if (flag) {
        fn.apply(this, args)
        flag = false
        setTimeout(() => {
          flag = true
        }, interval)
      }
    }
  }
  const handleScroll = throttle(() => {
    const scrollTop: number = document.documentElement.scrollTop
    if (scrollTop > 200) {
      setVisible(true)
    } else {
      setVisible(false)
    }

  }, 100)
  const handleClickBackToTop = () => {
    document.documentElement.scrollTo(
      {
        left: 0,
        top: 0,
        behavior: 'smooth'
      }
    )
  }
  const handleClickThemeSwitch = () => {
    if (theme === 'light') {
      dispatch(switchDark())
    } else {
      dispatch(switchLight())
    }
  }
  return (
    <>
      <div className={`tools-container${visibie ? ' show' : ' hide'}`} >
        <button onClick={handleClickThemeSwitch} className='action-button'>
          <i className='iconfont icontheme'></i>
        </button>
        <button onClick={handleClickBackToTop} className='action-button'>
          <i className='iconfont icontop'></i>
        </button>
      </div>
    </>

  )
}