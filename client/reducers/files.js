const files = (state = [], action) => {
    switch (action.type) {
        case 'ADD_FILE':
            return state.concat({
                name: action.name
            });
            break
        case 'REMOVE_FILE':
            return state.filter(file => { return file.name != action.name; })
            return state
        default:
            return state
    }
}

export default files