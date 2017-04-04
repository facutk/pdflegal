import {
    FETCH_STATUS_REQUEST,
    FETCH_STATUS_SUCCESS,
    FETCH_STATUS_FAILURE
} from 'constants/action-types'

const files = (state = [], action) => {
    switch (action.type) {
        case 'ADD_FILE':
            return state.concat({
                name: action.name,
                status: 'adding'
            });
        case 'REMOVE_FILE':
            return state.filter(file => { return file.name != action.name; })
        case FETCH_STATUS_REQUEST:
            return state
        case FETCH_STATUS_SUCCESS:
            return state.map(file => {
                console.log(file, file.name, action, action.name, file.name == action.name)
                if (file.name == action.name) {
                    file.status = 'added'
                }
                return file
            })
        case FETCH_STATUS_FAILURE:
            return state
        default:
            return state
    }
}

export default files