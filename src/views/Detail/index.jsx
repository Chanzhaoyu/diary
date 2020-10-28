import React, { useEffect, useState } from 'react'
import { Modal, ActivityIndicator, NavBar, Icon, List } from 'antd-mobile'
import { useHistory } from 'react-router-dom'
import { getQueryString } from '../../utils'
import axios from '../../utils/axios.js'

const alert = Modal.alert

const Detail = () => {
  const [detail, setDetail] = useState({})
  const [animating, setAnimating] = useState(false)
  const history = useHistory()
  const id = getQueryString('id')

  useEffect(() => {
    setAnimating(true)
    axios.get(`/detail/${id}`).then(({ data }) => {
      setAnimating(false)
      if (data.length) {
        setDetail(data[0])
      }
    })
  }, [id])

  const deleteDiary = id => {
    alert('删除', '删除此日记？', [
      { text: '取消', style: 'default' },
      {
        text: '确定',
        onPress: () => {
          axios.post('/delete', { id }).then(({ data }) => {
            history.push('/')
          })
        },
      },
    ])
  }

  return (
    <div className="diary-detail">
      <ActivityIndicator toast text="Loading..." animating={animating} />
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => history.goBack()}
        rightContent={[<Icon onClick={() => deleteDiary(detail.id)} key="0" type="cross-circle-o"></Icon>]}
      >
        {detail.title || ''}
      </NavBar>
      <List renderHeader={() => `${detail.date} 晴天`} className="my-list">
        <List.Item wrap>{detail.content}</List.Item>
      </List>
    </div>
  )
}

export default Detail
