import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Button, Card } from 'antd-mobile'
import { Link } from 'react-router-dom'
import axios from '../../utils/axios'
import './style.css'

const Home = () => {
  const [list, setList] = useState([])
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    setAnimating(true)
    axios.get('/list').then(({ data }) => {
      setList(data)
      setAnimating(false)
    })
  }, [])

  return (
    <>
      <ActivityIndicator toast text="Loading..." animating={animating} />
      <div className="diary-list">
        {list.map(item => (
          <Link to={{ pathname: 'detail', search: `?id=${item.id}` }} key={item.id}>
            <Card className="diary-item">
              <Card.Header
                title={item.title}
                thumb={(item.url && item.url) || 'https://cdn.v2ex.com/avatar/e40a/e89e/420625_large.png?m=1600236523'}
                extra={<span>晴天</span>}
              />
              <Card.Body>
                <div>{item.content}</div>
              </Card.Body>
              <Card.Footer content={item.date} />
            </Card>
          </Link>
        ))}
      </div>
      <div className="diary-add">
        <Link to={{ pathname: 'edit' }}>
          <Button type="primary">添加</Button>
        </Link>
      </div>
    </>
  )
}

export default Home
