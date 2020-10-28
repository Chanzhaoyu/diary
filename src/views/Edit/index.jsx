import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { NavBar, Icon, List, InputItem, TextareaItem, DatePicker, ImagePicker, Button, Toast } from 'antd-mobile'
import moment from 'moment'
import axios from '../../utils/axios'
import './style.css'

const Edit = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [date, setDate] = useState('')
  const [files, setFile] = useState([])

  const history = useHistory()

  const onChange = (files, type, index) => {
    console.log(files, type, index)
    setFile(files)
  }

  const publish = () => {
    if (!title || !content || !date) {
      Toast.fail('请填写必要参数')
      return
    }
    const params = {
      title,
      content,
      date: moment(date).format('YYYY-MM-DD'),
      url: files.length ? files[0].url : '',
    }

    axios.post('/add', params).then(() => {
      Toast.success('添加成功')
      history.push('/')
    })
  }

  return (
    <div className="diary-edit">
      <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => history.goBack()}>
        添加日志
      </NavBar>
      <List>
        <InputItem clear placeholder="请输入标题" onChange={value => setTitle(value)}>
          标题
        </InputItem>
        <TextareaItem rows={6} placeholder="请输入日志内容" onChange={value => setContent(value)} />
        <DatePicker mode="date" title="请选择日期" extra="请选择日期" value={date} onChange={date => setDate(date)}>
          <List.Item arrow="horizontal">日期</List.Item>
        </DatePicker>
        <ImagePicker
          files={files}
          onChange={onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 1}
          multiple={false}
        />
        <Button type="primary" onClick={() => publish()}>
          发布
        </Button>
      </List>
    </div>
  )
}

export default Edit
