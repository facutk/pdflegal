import React from 'react'
import { connect } from 'react-redux'
import { asyncFileUpload } from 'actions/files'

import { v4 } from 'uuid'

const FileManager = ({files = [], dispatch}) => (
  <div onClick={() => dispatch(asyncFileUpload(
        `${ v4() }.pdf`
      ))
    }>
    <b>El Reacto</b>
    <pre>{files.map(file =>( `${file.filename} [${file.status}]`)).join('\n')}</pre>
  </div>
)

const mapStateToProps = (state) => ({
  files: state.files
})

export default connect(mapStateToProps)(FileManager)
