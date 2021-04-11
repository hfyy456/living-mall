import React, { useEffect, useState } from 'react';
import PostCard from '../components/postCard'
import './Home.scss'
import service from '../utils/fetch'
import { useDispatch } from 'react-redux';
import { setLoaded } from '../store/reducers/configSlice'
export default function Home() {
  const dispatch = useDispatch()
  const [postList, setPostList] = useState([])
  useEffect(() => {
    let params = {
    }
    service.post('article/list', params).then((res: any) => {
      setPostList(res.data)
      dispatch(setLoaded())

    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <main className='home-page'>
        <div className='post-list' id="post">
          {postList.map((item: any, index) => {
            return <div className='post-item' key={index}>
              <PostCard
                id={item._id}
                title={item.title}
                thumbnail={item.thumbnail}
                date={item.createTime}
                summary={item.summary}
                categories={item.categories} />
            </div>
          })}
        </div>
      </main>
    </>
  )
}