export default function users(state = [], action) {
    switch (action.type) {
        case 'GET_USERS':
            return action.data.users;
        default:
            return state
    }
}