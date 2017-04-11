import {
  FILE_UPLOAD_START,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_ERROR,
  FILE_CHECK_STATUS_START,
  FILE_CHECK_STATUS_SUCCESS,
  FILE_CHECK_STATUS_ERROR
} from 'constants/action-types'

import v4 from 'uuid'
import fetch from 'isomorphic-fetch'

export const fileUploadStart = (uuid, filename, timestamp) => ({
  type: FILE_UPLOAD_START,
  uuid,
  filename,
  timestamp
})

export const fileUploadSuccess = (uuid, filename, timestamp, expires) => ({
  type: FILE_UPLOAD_SUCCESS,
  uuid,
  filename,
  timestamp,
  expires
})

export const fileUploadError = (uuid, filename, timestamp) => ({
  type: FILE_UPLOAD_ERROR,
  uuid,
  filename,
  timestamp
})

export const asyncFileUpload = (filename) => (dispatch) => {
  const uuid = v4()

  dispatch(fileUploadStart(
    uuid,
    filename,
    Date.now()
  ))

  fetch(`${__API__}/add`)
    .then((response) => {
      dispatch(fileUploadSuccess(
        uuid,
        Date.now(),
        Date.now() + 1000 * 60 * 10 || // 10 minutes from now
        response.expires
      ))

      dispatch(asyncFileCheckStatus(
        uuid
      ))
    })
    .catch(error => dispatch(fileUploadError(
        uuid,
        Date.now()
      ))
    )
}

export const fileCheckStatusStart = (uuid, timestamp) => ({
  type: FILE_CHECK_STATUS_START,
  uuid,
  timestamp
})

export const fileCheckStatusSuccess = (uuid, status, timestamp) => ({
  type: FILE_CHECK_STATUS_SUCCESS,
  uuid,
  status,
  timestamp
})

export const fileCheckStatusError = (uuid, timestamp) => ({
  type: FILE_CHECK_STATUS_ERROR,
  uuid,
  timestamp
})

const asyncFileCheckStatus = (uuid) => (dispatch) => {
  dispatch(fileCheckStatusStart(
    uuid,
    Date.now()
  ))

  fetch(`${__API__}/status`)
    .then(response => {
      if (response.status >= 400)
        return dispatch(fileCheckStatusError(
          uuid,
          Date.now()
        ))

        return response.json()
    })
    .then(response => {
      if (response.status == 'error') {
        return dispatch(fileCheckStatusError(
          uuid,
          Date.now()
        ))
      } else if (response.status == 'processing') {
        dispatch(fileCheckStatusSuccess(
          uuid,
          'still processing',
          Date.now()
        ))
        setTimeout(() => dispatch(asyncFileCheckStatus(uuid)), 1000)
      } else {
        dispatch(fileCheckStatusSuccess(
          uuid,
          'processed',
          Date.now()
        ))
      }
    })
    .catch(error => dispatch(fileCheckStatusError(
        uuid,
        Date.now()
      ))
    )
}
