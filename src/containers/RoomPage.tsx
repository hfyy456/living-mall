import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './room.scss'
import videojs from 'video.js';

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
    var player = videojs('video-player')
    setTimeout(() => {
      dispatch(setLoaded())

      //player.play()

    }, 1000);
  }, [])
  return (
    <div className="room-container">
      <Controls />
      <video id='video-player'   className='video-js vjs-default-skin video'>
        <source type="application/x-mpegURL" src="http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8" />
      </video>
    </div>
  )
}
