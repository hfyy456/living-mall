import React, { ReactNode, useEffect } from 'react';
import './App.scss';
import { selectLoading, selectTheme, setLoading } from '../store/reducers/configSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import Header from '../components/Header';
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
  const { children } = props;
  useEffect(() => {
    dispatch(setLoading())
  }, [path])
  return (
    <>
      <Loading loading={loading} mode={theme} />
      <div className={'theme-' + theme}>
        {path.pathname === '/' ? <Header /> : null}
        {children}
        <Tools />
        {path.pathname.indexOf('/room') === -1 ? <Bottombar />
          : null}

      </div>
    </>
  );
}

export default App;
