import {fetchUsers, mutateUsers} from './resolvers'
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import UserQueries from '../queries/users'
import { message } from 'antd'
export function* watchUsers() {
    yield takeLatest("LOGIN_ASYNC", loginUser);
    yield takeLatest("GET_USERS_ASYNC", getUsers);
    yield takeEvery("CREATE_USER_ASYNC", createUsers);
    yield takeEvery("DELETE_USER_ASYNC", deleteUser);
}

function* loginUser(action) {
    try {
        const {data, error} = yield call(mutateUsers, action.payload)
        if(data) {
            yield put ({type: 'LOGIN', data });
            message.success(`Welcome, ${data.me.name}!`)
        } else {
            message.error(error.message)
        }
    } catch (e) {
        message.error(e.message)
    }
}

function* getUsers(action) {
    console.log(action)
    try {
        const {data, error} = yield call(fetchUsers, action.payload)
        console.log({error, data})
        if(data) {
            yield put ({type: 'GET_USERS', data })
        }
    } catch (error) {
        message.error(error.message)
    }
}

function* createUsers(action) {
    try {
        const {data, error} = yield call(mutateUsers, action.payload)
        console.log(error)
        if(data) {
            yield put ({type: 'GET_USERS_ASYNC', payload: { query: UserQueries.fetch } })
            if(action.onSuccess) {
                action.onSuccess()
            }
        }
    } catch (error) {
        message.error(error.message)
    }
}

function* deleteUser(action) {
    try {
        const {data} = yield call(mutateUsers, action.payload)
        if(data) {
            message.success(data.deleteUser)
            yield put ({type: 'GET_USERS_ASYNC', payload: { query: UserQueries.fetch } })
            if(action.onSuccess) {
                action.onSuccess()
            }
        }
    } catch (error) {
        message.error(error.message)
    }
}