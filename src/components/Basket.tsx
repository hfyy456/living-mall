import React, { useEffect, useState } from 'react';
import './Basket.scss';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

export default function Basket() {
  const [checkedAll, setCheckedAll] = React.useState(true);
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value: any) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleChange = (event: any) => {
    setChecked(event.target.checked);
  };
  return (
    <div className="basket-card">
      <div className="basket-header">
        <Checkbox
          checked={checkedAll}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <span>XXXDE小店</span>
      </div>
      <div className="basket-content">
        <List dense >
          <ListItem className="basket-item">
            <ListItemIcon style={{ minWidth: 0 }}>
              <Checkbox
                edge="start"
                onChange={handleToggle(1)}
                checked={checked.indexOf(1) !== -1}
              />
            </ListItemIcon>
            <div className="cover">
              <img src="https://material-ui.com/static/images/cards/live-from-space.jpg" />
            </div>
            <div className="infor">
              <div className="name">laoliwuxaingya</div>
              <div className="price">
                ￥29.0
              </div>
            </div>
            <TextField
              id="standard-number"
              type="number"
              className="item-num"
              defaultValue="1"
              InputProps={{
                startAdornment: <InputAdornment position="start">X</InputAdornment>,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </ListItem>            <ListItem className="basket-item">

            <ListItemIcon style={{ minWidth: 0 }}>
              <Checkbox
                edge="start"
                onChange={handleToggle(1)}
                checked={checked.indexOf(1) !== -1}
              />
            </ListItemIcon>
            <div className="cover">
              <img src="https://material-ui.com/static/images/cards/live-from-space.jpg" />
            </div>
            <div className="infor">
              <div className="name">laoliwuxaingya</div>
              <div className="price">
                ￥29.0
              </div>
            </div>
            <TextField
              id="standard-number"
              type="number"
              className="item-num"
              InputProps={{
                startAdornment: <InputAdornment position="start">X</InputAdornment>,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </ListItem>
          <ListItem className="basket-item">

            <ListItemIcon style={{ minWidth: 0 }}>
              <Checkbox
                edge="start"
                onChange={handleToggle(1)}
                checked={checked.indexOf(1) !== -1}
              />
            </ListItemIcon>
            <div className="cover">
              <img src="https://material-ui.com/static/images/cards/live-from-space.jpg" />
            </div>
            <div className="infor">
              <div className="name">laoliwuxaingya</div>
              <div className="price">
                ￥29.0
              </div>
            </div>
            <TextField
              id="standard-number"
              type="number"
              className="item-num"
              InputProps={{
                startAdornment: <InputAdornment position="start">X</InputAdornment>,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </ListItem>
          <ListItem className="basket-item">
            <ListItemIcon style={{ minWidth: 0 }}>
              <Checkbox
                edge="start"
                onChange={handleToggle(1)}
                checked={checked.indexOf(1) !== -1}
              />
            </ListItemIcon>
            <div className="cover">
              <img src="https://material-ui.com/static/images/cards/live-from-space.jpg" />
            </div>
            <div className="infor">
              <div className="name">laoliwuxaingya</div>
              <div className="price">
                ￥29.0
              </div>
            </div>
            <TextField
              id="standard-number"
              type="number"
              className="item-num"
              InputProps={{
                startAdornment: <InputAdornment position="start">X</InputAdornment>,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </ListItem>
        </List>
        <div className="basket-footer" >
          <span className='total'>合计：12元</span>
          <Button variant="contained" color="secondary">
            结算
          </Button>
        </div>
      </div >
    </div >
  )
}