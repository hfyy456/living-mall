import React from 'react';
import './login.scss'
import {
  setUserInfo, selectUserInfo, setToken
} from '../store/reducers/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import md5 from 'blueimp-md5'
import { useHistory } from 'react-router-dom'
import service from '../utils/fetch'

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory()

  const [values, setValues] = React.useState({
    username: '',
    password: '',
    showPassword: false,
  });
  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const handleSubmit = () => {
    const params = {
      username: values.username,
      password: md5(values.password)
    }
    service.post('user/login', params).then((res: any) => {
      const code = res.code
      if (code === 20000) {
        dispatch(setUserInfo(res.data))
        dispatch(setToken(res.token))
        localStorage.setItem('token', res.token)
        history.push('/')
        localStorage.setItem('username', res.data.username)

      } else {

      }
    })
  }
  return (
    <div className='login-container'>
      <h1 className='sys-name'>欢迎登录</h1>
      <div className="form">
        <FormControl  >
          <InputLabel htmlFor="standard-adornment">用户名</InputLabel>
          <Input
            id="standard-adornment"
            type={'text'}
            value={values.username}
            onChange={handleChange('username')}
          />
        </FormControl>
        <FormControl >

          <InputLabel htmlFor="standard-adornment-password">密码</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button onClick={handleSubmit} className="submit" variant="contained" color="secondary">
          登录
        </Button>
      </div>
    </div>
  )

}