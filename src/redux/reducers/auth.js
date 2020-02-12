import { LOGIN, LOGOUT } from '../actions'
export default function auth(state = {}, action) {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('auth_user', JSON.stringify({ email: action.email, name: action.name}));
            return { email: action.email, name: action.name};
        case LOGOUT:
            localStorage.removeItem('auth_user')
            return null
        default:
            return localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : null
    }
}