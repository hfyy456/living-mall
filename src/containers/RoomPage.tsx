import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import './room.scss'
import videojs from 'video.js';
import Modal from '@material-ui/core/Modal';
import { useHistory } from 'react-router-dom'
import Controls from '../components/Controls'
import Paper from '@material-ui/core/Paper';
import io from 'socket.io-client'
import Button from '@material-ui/core/Button';

interface Iparams {
  id: string
}
export default function Room(): JSX.Element {
  const params: Iparams = useParams()
  const id = params.id
  const username = localStorage.getItem("username")
  const history = useHistory()

  let socket: any = null
  let url = ''
  var namespace = 'http://127.0.0.1:5000/room'
  socket = io(namespace);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleBack = ()=>{
    history.goBack()
  }
  useEffect(() => {
    console.log(params)
    var player = videojs('video-player')

    socket.on('connect', function () {
      socket.emit('join', { data: { username: username, room: id } });
      socket.emit('info', { data: { room: id } })
    });
    socket.on('living', function (msg: any) {
      console.log("+++++++  LIVING  ++++++++\n", msg)
      const res = JSON.parse(msg)
      const isLiving = res.data.living
      const newUrl = res.data.url
      if (isLiving) {
        console.log("++++++ living open ++++")
        if (url !== newUrl) {
          setOpen(false)

          player.src(newUrl)
          player.play()
          url = newUrl
        }

      } else {
        setOpen(true)
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
        setOpen(false)
        url = newUrl
        console.log(newUrl)
        player.src(newUrl)
        player.play()
      } else {
        setOpen(true)

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
      ><Paper className="modal">
          <p>
            主播已停止直播。
          </p>
          <div> <Button onClick={handleBack} className="submit" variant="contained" color="secondary">
            返回
        </Button></div>
        </Paper>
      </Modal>
      <Controls socket={socket} />
      <video id='video-player' className='video-js vjs-default-skin video'>
      </video>
    </div>
  )
}
