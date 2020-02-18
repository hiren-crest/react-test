export default function users(state = {}, action) {
    switch (action.type) {
        case 'GET_USERS':
            let users = {}
            action.data.users.forEach((user) => {
                users[user.id] = user
            })
            return users;
        case 'DELETE_USER':
            let new_state = Object.assign({}, state)
            delete new_state[action.id]
            return new_state
        case 'ADD_USER':
            return Object.assign({}, state, {[action.data.id] : action.data})
        default:
            return state
    }
}