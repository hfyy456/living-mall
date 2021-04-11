import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './room.scss'
import { useDispatch } from 'react-redux';
import { setLoaded } from '../store/reducers/configSlice'
import Controls from '../components/Controls'
interface Iparams {
  id: string
}
export default function Room(): JSX.Element {
  const params: Iparams = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(params)
    setTimeout(() => {
      dispatch(setLoaded())

    }, 1000);
  }, [])
  return (
    <div className="room-container">
      <Controls />
      <video src='http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' className="video" ></video>
    </div>
  )
}
