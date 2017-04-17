import React from 'react'
import FilePicker from './FilePicker'
import { asyncFileUpload } from 'actions/files'
import { connect } from 'react-redux'

const FileManager = ({files = [], dispatch}) => (
  <div>
    <FilePicker 
      handleAddFile={(filename) => dispatch(asyncFileUpload(filename))
    }/>
    <b>El Reacto</b>
    <pre>{files.map(file =>( `${file.filename} [${file.status}]`)).join('\n')}</pre>
  </div>
)

const mapStateToProps = (state) => ({
  files: state.files
})

export default connect(mapStateToProps)(FileManager)
