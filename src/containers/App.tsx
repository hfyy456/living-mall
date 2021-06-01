import React, { ReactNode, useEffect, useState } from 'react';
import './App.scss';
import { selectLoading, selectTheme } from '../store/reducers/configSlice'
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom'
import Tools from '../components/Tools';
import Loading from '../components/Loading'
import Bottombar from '../components/Bottombar'

type Props = {
  children: ReactNode;
};

function App(props: Props) {
  const history = useHistory();

  const path: any = useLocation()
  const loading = useSelector(selectLoading)
  const theme: string = useSelector(selectTheme)
  const [showNav, setShowNav] = useState(false)
  const { children } = props;
  useEffect(() => {
    var id = localStorage.getItem('token')
    console.log(id)
    if (id == undefined) {
      console.log(1)
      history.push('/login')
    } 
    if (path.pathname === '/') {
      setShowNav(true)
    } else if (path.pathname.indexOf('/explore') !== -1) {
      setShowNav(true)
    } else if (path.pathname.indexOf('/profile') !== -1) {
      setShowNav(true)
    } else if (path.pathname.indexOf('/message') !== -1) {
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
