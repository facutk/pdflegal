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
            })
        case 'REMOVE_FILE':
            return state.filter(file => { return file.name != action.name })
        case FETCH_STATUS_REQUEST:
            return state.map(file => {
                if (file.name == action.name) {
                    file.status = 'processing'
                }
                return file
            })
        case FETCH_STATUS_SUCCESS:
            return state.map(file => {
                if (file.name == action.name) {
                    file.status = 'added'
                }
                return file
            })
        case FETCH_STATUS_FAILURE:
            return state.map(file => {
                if (file.name == action.name) {
                    file.status = 'error'
                }
                return file
            })
            return state
        default:
            return state
    }
}

export default files
