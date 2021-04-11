import React from 'react';
import './Loading.scss'
interface Iloading {
  loading: boolean,
  mode: string,
}
const Loading: React.FC<Iloading> = (props) => {
  const { loading, mode } = props
  return (
    <>
      { loading ? <div className={`loading ${mode}`}>
        <div className="sk-cube-grid">
          <div className={`sk-cube sk-cube1 ${mode}`}></div>
          <div className={`sk-cube sk-cube2 ${mode}`}></div>
          <div className={`sk-cube sk-cube3 ${mode}`}></div>
          <div className={`sk-cube sk-cube4 ${mode}`}></div>
          <div className={`sk-cube sk-cube5 ${mode}`}></div>
          <div className={`sk-cube sk-cube6 ${mode}`}></div>
          <div className={`sk-cube sk-cube7 ${mode}`}></div>
          <div className={`sk-cube sk-cube8 ${mode}`}></div>
          <div className={`sk-cube sk-cube9 ${mode}`}></div>
        </div>
      </div > : null}

    </>
  )
}
export default Loading