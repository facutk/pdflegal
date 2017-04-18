import React from 'react'
import Header from './Header'
import FileManager from './FileManager'

const Root = () => (
  <div className='wrapper'>
    <div className='container'>
      <Header />
    </div>

    <div className='container'>
      Corta y pega pdfs, words e imagenes en pdfs de 5megas.
    </div>

    <div className='container'>
      <FileManager />
    </div>
  </div>
)

export default Root
