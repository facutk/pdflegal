import React from 'react';

const Root = () => (
    <div onClick={()=>{
            console.log(__API__);
            fetch(__API__).then(response => console.log(response));
        }}>
        El Reacto 
    </div>
);

export default Root;
