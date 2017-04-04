import React from 'react'
import fetch from 'isomorphic-fetch'
import Counter from './Counter'
import { connect } from 'react-redux'

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
        });

}

const pollStatus = (status) => {
    return new Promise((resolve, reject) => {
        checkStatus(resolve, reject)
    })
}



const Root = ({files = [], dispatch}) => (
    <div onClick={()=>{
            console.log(__API__);
            dispatch({
                type: 'ADD_FILE',
                name: 'file.txt'
            })

            addFile('test.pdf')
                .then(response => pollStatus(response))
                .then(({status}) => console.log(status))
                .catch(({status}) => console.error(status))

        }}>
        <b>El Reacto</b>
        <ul>{files.map((file,index) =>(
            <li key={index}>{file.name}</li>
        ))}
        </ul>
        <Counter />
    </div>
)

const mapStateToProps = (state) => ({
    files: state.files
})
export default connect(mapStateToProps)(Root)