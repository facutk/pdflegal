import React from 'react'
import fetch from 'isomorphic-fetch'
import Counter from './Counter'
import { connect } from 'react-redux'
import { 
  FETCH_STATUS_REQUEST,
  FETCH_STATUS_SUCCESS,
  FETCH_STATUS_FAILURE
} from 'constants/action-types'

const addFile = file => {
  return new Promise((resolve, reject) => {
    console.log('adding file: ', file)
    fetch(`${__API__}/add`)
      .then((response) => {
        if (response.status >= 400) {
          reject('could not add file')
        }
        return response.json()
      })
      .then(status => resolve(status) )
  })
 }

const checkStatus = (resolve, reject) => {
  console.log('checking status')

  fetch(`${__API__}/status`)
    .then((response) => {
      if (response.status >= 400)
        reject('error processing file');
      return response.json();
    })
    .then(response => {
      console.log(`status: ${response.status}`)
      if (response.status == 'error') {
        reject(response);
      } else if (response.status == 'processing') {
        setTimeout(() => checkStatus(resolve, reject), 2000)
      } else {
        resolve(response)
      }
    })
}

const pollStatus = (status) => {
  return new Promise((resolve, reject) => {
    checkStatus(resolve, reject)
  })
}

const Root = ({files = [], dispatch}) => (
  <div onClick={()=>{
    const name = Math.random().toString(36).substring(7)

    dispatch({
      type: 'ADD_FILE',
      name: name,
      status: 'processing'
    })

    dispatch({
      type: FETCH_STATUS_REQUEST,
      name: name
    })
    addFile(name)
      .then(response => pollStatus(response))
      .then(({status}) => dispatch({
        type: FETCH_STATUS_SUCCESS,
        name: name
      }))
      .catch(({status}) => dispatch({
        type: FETCH_STATUS_FAILURE,
        name: name
      }))

    }}>
    <b>El Reacto</b>
    <pre>{files.map(file =>( `${file.name} [${file.status}]`)).join('\n')}</pre>
    <Counter />
  </div>
)

const mapStateToProps = (state) => ({
  files: state.files
})

export default connect(mapStateToProps)(Root)
