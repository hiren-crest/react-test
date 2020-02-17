import { LOGIN, LOGOUT } from '../actions'
export default function auth(state = {}, action) {
    switch (action.type) {
        case LOGIN:
            console.log(action.data)
            localStorage.setItem('auth_user', JSON.stringify({ ...action.data.me }));
            return action.data.me;
        case LOGOUT:
            localStorage.removeItem('auth_user')
            return null
        default:
            return localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : null
    }
}