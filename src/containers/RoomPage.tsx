import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './room.scss'
import videojs from 'video.js';
import Modal from '@material-ui/core/Modal';
import { useDispatch } from 'react-redux';
import { setLoaded } from '../store/reducers/configSlice'
import Controls from '../components/Controls'
import Paper from '@material-ui/core/Paper';
import io from 'socket.io-client'

interface Iparams {
  id: string
}
export default function Room(): JSX.Element {
  const params: Iparams = useParams()
  const id = params.id
  const dispatch = useDispatch()
  let socket: any = null
  let url = ''
  var namespace = 'http://127.0.0.1:5000/room'
  socket = io(namespace);
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = useState(null)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log(params)
    var player = videojs('video-player')

    socket.on('connect', function () {
      socket.emit('join', { data: { username: 'user001', room: id } });
      socket.emit('info', { data: { room: id } })
    });
    socket.on('living', function (msg: any) {
      console.log("+++++++  LIVING  ++++++++\n", msg)
      const res = JSON.parse(msg)
      const isLiving = res.data.living
      const newUrl = res.data.url
      if (isLiving) {
        console.log("++++++ living open ++++")
        if (url != newUrl) {
          player.src(newUrl)
          player.play()
          url = newUrl
        }

      } else {
        console.log("++++++ living close ++++")
        player.pause()
        url = "www.izhaoo.com/live"
        player.src(url)
      }

    });
    socket.on('info', function (msg: any) {
      console.log("+++++++  info  ++++++++\n", msg)
      const res = JSON.parse(msg)
      const isLiving = res.data.info.living
      const newUrl = res.data.info.url
      if (isLiving) {
        url = newUrl
        console.log(newUrl)
        player.src(newUrl)
        player.play()
      }
    })
    return () => {
      socket.close()
    }
  }, [])
  return (
    <div className="room-container">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      ><Paper>主播已下播,即将退出直播间</Paper>
      </Modal>
      <Controls socket={socket} />
      <video id='video-player' className='video-js vjs-default-skin video'>
      </video>
    </div>
  )
}
