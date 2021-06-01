import React, { useEffect, useState } from 'react';
import './Basket.scss';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import service from '../utils/fetch'
import { useHistory } from 'react-router-dom'

export default function Basket() {
  const history = useHistory();

  const [basketList, setBasketList] = useState([
    {
      good: {
        price: 0,
        name: '',
        images: [''],
        _id: ''
      },
      items: []
    }
  ])
  const [checkedAll, setCheckedAll] = React.useState(false);
  const [checked, setChecked] = React.useState([0]);
  useEffect(() => {
    service.post('basket/list', {}).then((res: any) => {
      if (res.code === 20000) {
        var ary = []
        for (const item in res.data) {
          ary.push(res.data[item])
          console.log(item)
        }
        console.log(ary)
        setBasketList(ary as never)

      }
    })
  }, [])
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
  const handleOnClick = (id: string) => {
    history.push(`/good/${id}`)
  }
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
        <span>admin的自营店</span>
      </div>
      <div className="basket-content">
        <List dense >
          {
            basketList.map((item, index) => {
              return (
                <div key={index}>
                  <ListItem className="basket-item">
                    <ListItemIcon style={{ minWidth: 0 }}>
                      <Checkbox
                        edge="start"
                        onChange={handleToggle(1)}
                        checked={checked.indexOf(1) !== -1}
                      />
                    </ListItemIcon>
                    <div onClick={e => handleOnClick(item.good._id)} className="cover">
                      <img src={item.good.images[0]} />
                    </div>
                    <div className="infor">
                      <div className="name">{item.good.name}</div>
                      <div className="price">
                        ￥{item.good.price}
                      </div>
                    </div>
                    <TextField
                      id="standard-number"
                      type="number"
                      className="item-num"
                      defaultValue={1}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">X</InputAdornment>,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </ListItem>
                </div>
              )
            })
          }

        </List>
        <div className="basket-footer" >
          <span className='total'>合计：0元</span>
          <Button variant="contained" color="secondary">
            结算
          </Button>
        </div>
      </div >
    </div >
  )
}