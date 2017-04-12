import {
  FILE_UPLOAD_START,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_ERROR,

  FILE_PROCESSING_STATUS_START,
  FILE_PROCESSING_STATUS_SUCCESS,
  FILE_PROCESSING_STATUS_ERROR
} from 'constants/action-types'

const files = (state = [], action) => {
  switch (action.type) {
    case FILE_UPLOAD_START:
      return state.concat({
        uuid: action.uuid,
        filename: action.filename,
        status: 'uploading'
      })

    case FILE_UPLOAD_SUCCESS:
      return state.map(file => {
        if (file.uuid == action.uuid) {
          file.status = 'uploaded'
        }
        return file
      })

    case FILE_UPLOAD_ERROR:
      return state.map(file => {
        if (file.uuid == action.uuid) {
          file.status = 'upload error'
        }
        return file
      })

    case 'REMOVE_FILE':
      return state.filter(file => { return file.uuid != action.uuid })

    case FILE_PROCESSING_STATUS_START:
      return state.map(file => {
        if (file.uuid == action.uuid) {
          file.status = 'processing'
        }
        return file
      })

    case FILE_PROCESSING_STATUS_SUCCESS:
      return state.map(file => {
        if (file.uuid == action.uuid) {
          file.status = 'processed'
        }
        return file
      })

    case FILE_PROCESSING_STATUS_ERROR:
      return state.map(file => {
        if (file.uuid == action.uuid) {
          file.status = 'processing error'
        }
        return file
      })
      return state

    default:
      return state
  }
}

export default files
