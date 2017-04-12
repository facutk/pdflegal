import {
  FILE_UPLOAD_START,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_ERROR,

  FILE_PROCESSING_STATUS_START,
  FILE_PROCESSING_STATUS_SUCCESS,
  FILE_PROCESSING_STATUS_ERROR
} from 'constants/action-types'

import v4 from 'uuid'
import fetch from 'isomorphic-fetch'

export const fileUploadStart = (uuid, filename, timestamp) => ({
  type: FILE_UPLOAD_START,
  uuid,
  filename,
  timestamp
})

export const fileUploadSuccess = (uuid, timestamp, expires) => ({
  type: FILE_UPLOAD_SUCCESS,
  uuid,
  timestamp,
  expires
})

export const fileUploadError = (uuid, timestamp) => ({
  type: FILE_UPLOAD_ERROR,
  uuid,
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
      if (response.status >= 400)
        return dispatch(fileUploadError(
          uuid,
          Date.now()
        ))

      dispatch(fileUploadSuccess(
        uuid,
        Date.now(),
        Date.now() + 1000 * 60 * 10 || // 10 minutes from now
        response.expires
      ))

      dispatch(asyncFileProcessingStatus(
        uuid
      ))
    })
    .catch(error => dispatch(fileUploadError(
        uuid,
        Date.now()
      ))
    )
}

export const fileProcessingStatusStart = (uuid, timestamp) => ({
  type: FILE_PROCESSING_STATUS_START,
  uuid,
  timestamp
})

export const fileProcessingStatusSuccess = (uuid, timestamp) => ({
  type: FILE_PROCESSING_STATUS_SUCCESS,
  uuid,
  timestamp
})

export const fileProcessingStatusError = (uuid, timestamp) => ({
  type: FILE_PROCESSING_STATUS_ERROR,
  uuid,
  timestamp
})

const asyncFileProcessingStatus = (uuid) => (dispatch) => {
  dispatch(fileProcessingStatusStart(
    uuid,
    Date.now()
  ))

  dispatch(asyncFileCheckStatus(uuid))
}

const asyncFileCheckStatus = (uuid) => (dispatch) => {
  fetch(`${__API__}/status`)
    .then(response => {
      if (response.status >= 400)
        return dispatch(fileProcessingStatusError(
          uuid,
          Date.now()
        ))

        return response.json()
    })
    .then(response => {
      if (response.status == 'error') {
        dispatch(fileProcessingStatusError(
          uuid,
          Date.now()
        ))
      } else if (response.status == 'processing') {
        setTimeout(() => dispatch(asyncFileCheckStatus(uuid)), 1000)
      } else {
        dispatch(fileProcessingStatusSuccess(
          uuid,
          Date.now()
        ))
      }
    })
    .catch(error => dispatch(fileProcessingStatusError(
        uuid,
        Date.now()
      ))
    )
}
