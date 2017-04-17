import React from 'react'

class FilePicker extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      data_uri: null,
      filename: null
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleAddFile(this.state.filename)
    this.setState({
      data_uri: null,
      filename: null,
      filetype: null
    })
  }

  handleFile = (e) => {
    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onload = (upload) => {
      console.log(upload, file, this)
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type
      })
    }

    reader.readAsDataURL(file)
  }

  render() {
    return (
      <div>
        <label>Upload a file</label>
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <input type="file" onChange={this.handleFile} />
          <input disabled={!this.state.filename} type="submit" value="Upload" />
        </form>
      </div>
    )
  }
}

export default FilePicker