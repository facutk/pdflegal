require('es6-promise').polyfill();
require('isomorphic-fetch');

const API_URL = 'http://localhost:3001';

 const addFile = file => {
    return new Promise((resolve, reject) => {
        console.log('adding file: ', file);
        fetch(`${API_URL}/add`)
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

    fetch(`${API_URL}/status`)
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


addFile('test.pdf')
    .then(response => pollStatus(response))
    .then(({status}) => console.log(status))
    .catch(({status}) => console.error(status));
