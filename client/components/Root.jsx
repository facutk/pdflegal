import React from 'react';
import fetch from 'isomorphic-fetch';

const addFile = file => {
    return new Promise((resolve, reject) => {
        console.log('adding file: ', file);
        fetch(`${__API__}/add`)
            .then((response) => {
                if (response.status >= 400) {
                    reject('could not add file');
                }
                return response.json();
            })
            .then(status => resolve(status) );
    });
 }

const checkStatus = (resolve, reject) => {
    console.log('checking status');

    fetch(`${__API__}/status`)
        .then((response) => {
            if (response.status >= 400)
                reject('error processing file');
            return response.json();
        })
        .then(response => {
            console.log(`status: ${response.status}`);
            if (response.status == 'error') {
                reject(response);
            } else if (response.status == 'processing') {
                setTimeout(() => checkStatus(resolve, reject), 2000)
            } else {
                resolve(response);
            }
        });

}

const pollStatus = (status) => {
    return new Promise((resolve, reject) => {
        checkStatus(resolve, reject);
    });
}



const Root = () => (
    <div onClick={()=>{
            console.log(__API__);

            addFile('test.pdf')
                .then(response => pollStatus(response))
                .then(({status}) => console.log(status))
                .catch(({status}) => console.error(status));

        }}>
        El Reacto 
    </div>
);

export default Root;
