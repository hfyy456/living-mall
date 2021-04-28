import React, { ReactNode, useEffect, useState } from 'react';
import './App.scss';
import { selectLoading, selectTheme } from '../store/reducers/configSlice'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import Tools from '../components/Tools';
import Loading from '../components/Loading'
import Bottombar from '../components/Bottombar'

type Props = {
  children: ReactNode;
};

function App(props: Props) {
  const path: any = useLocation()
  const loading = useSelector(selectLoading)
  const theme: string = useSelector(selectTheme)
  const [showNav, setShowNav] = useState(false)
  const { children } = props;
  useEffect(() => {
    if (path.pathname === '/') {
      setShowNav(true)
    } else if (path.pathname.indexOf('/explore') !== -1) {
      setShowNav(true)
    } else if (path.pathname.indexOf('/profile') !== -1) {
      setShowNav(true)
    }
    else {
      setShowNav(false)
    }
    //   dispatch(setLoading())
  }, [path])
  return (
    <>
      <Loading loading={loading} mode={theme} />
      <div className={'theme-' + theme}>
        {children}
        <Tools />
        {showNav ? <Bottombar />
          : null}

      </div>
    </>
  );
}

export default App;
