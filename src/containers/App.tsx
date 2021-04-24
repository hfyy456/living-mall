import React, { ReactNode, useEffect, useState } from 'react';
import './App.scss';
import { selectLoading, selectTheme, setLoading } from '../store/reducers/configSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import Tools from '../components/Tools';
import Loading from '../components/Loading'
import Bottombar from '../components/Bottombar'

type Props = {
  children: ReactNode;
};

function App(props: Props) {
  const path: any = useLocation()
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)
  const theme: string = useSelector(selectTheme)
  const [showNav, setShowNav] = useState(true)
  const { children } = props;
  useEffect(() => {
    if (path.pathname.indexOf('/room') !== -1) {
      setShowNav(false)
    } else if (path.pathname.indexOf('/good') !== -1) {
      setShowNav(false)
    } else if (path.pathname.indexOf('/login') !== -1) {
      setShowNav(false)
    }
    else {
      setShowNav(true)
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
