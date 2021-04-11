import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import marked from 'marked'
import Topbar from '../components/Topbar'
import service from '../utils/fetch'
import hljs from 'highlight.js';
import setDate from '../utils/date'
import 'highlight.js/styles/atom-one-light.css';
import './Article.scss'
import { useDispatch } from 'react-redux';
import { setLoaded } from '../store/reducers/configSlice'


interface Iparams {
  id: string
}
interface Ipost {
  title: string,
  createTime: any,
  content: string,

}
export default function Article() {
  const dispatch = useDispatch()
  const params: Iparams = useParams()
  const [post, setPost] = useState<Ipost>({ title: '', createTime: '', content: '' })
  const [html, setHtml] = useState('')
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });
  useEffect(() => {
    service.post('article/item', params).then((res: any) => {
      setPost(res.data)
      const text = res.data.content
      setHtml(marked(text))
      dispatch(setLoaded())
    })
  }, [])
  return (
    <>
      <div className='page'>
        <Topbar />
        <main className='article-container'>
          <div id="post">
            <div className='infor'>
              <h1>{post.title}</h1>
              <div className='date'>{setDate(post.createTime)}</div>
            </div>
            <article dangerouslySetInnerHTML={{ __html: html }}>
            </article>
          </div>
        </main>
      </div>
    </>
  )
}