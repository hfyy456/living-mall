import React, { useEffect, useState } from 'react';
import './Featured.scss'
import Living from '../components/Living'
import service_ad from '../utils/fetch_ad'

export default function Featured() {
  const [livingList, setLivingList] = useState([])
  useEffect(() => {
    service_ad.post("room/living", {}).then((res: any) => {
      console.log(res.data)
      setLivingList(res.data)
    })
  }, [])
  return (
    <>
      {livingList.map((item: any, index) => {
        return <div key={index}>
          <Living owner={item.owner} title={item.title}  id={item.id} /></div>
      })}
    </>
  )
}