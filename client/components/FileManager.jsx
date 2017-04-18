import React from 'react'
import FilePicker from './FilePicker'
import { asyncFileUpload } from 'actions/files'
import { connect } from 'react-redux'

const FileManager = ({files = [], dispatch}) => (
  <div>
    <FilePicker 
      handleAddFile={(filename) => dispatch(asyncFileUpload(filename))
    }/>

    <h3>Status</h3>
    <blockquote>
      {files.map((file,index) => (
        <p key={index}>
          {file.filename} [{file.status}]
        </p>
      ))}
    </blockquote>

    <button disabled>Descargar PDFs</button>
  </div>
)

const mapStateToProps = (state) => ({
  files: state.files
})

export default connect(mapStateToProps)(FileManager)
