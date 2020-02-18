import {fetchUsers, mutateUsers, subscribeUsers} from './resolvers'
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { sagaMiddleware } from './store'
import { message } from 'antd'
export function* watchUsers() {
    yield takeLatest("LOGIN_ASYNC", loginUser);
    yield takeLatest("GET_USERS_ASYNC", getUsers);
    yield takeEvery("CREATE_USER_ASYNC", createUsers);
    yield takeEvery("DELETE_USER_ASYNC", deleteUser);
    yield takeEvery("SUBSCRIBE_USER_CHANGES", subscribeUser);
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
    try {
        const {data, error} = yield call(fetchUsers, action.payload)
        if(data) {
            yield put ({type: 'GET_USERS', data })
        } else {
            message.error(error.message)
        }
    } catch (error) {
        message.error(error.message)
    }
}

function* createUsers(action) {
    try {
        const {data, error} = yield call(mutateUsers, action.payload)
        if(data) {
            yield put ({type: 'ADD_USER', data: data.createUser})
            if(action.onSuccess) {
                action.onSuccess()
            }
        } else {
            message.error(error.message)
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
            if(action.payload?.variables?.id) {
                yield put({type: 'DELETE_USER', id: action.payload?.variables?.id})
            }
            if(action.onSuccess) {
                action.onSuccess()
            }
        }
    } catch (error) {
        message.error(error.message)
    }
}

function* subscribeUser(action) {
    try {
        yield call(subscribeUsers, action.payload, yieldSubscription)
    } catch (error) {
        message.error(error.message)
    }
}

function yieldSubscription(data) {
    sagaMiddleware.run(function* () {
        if(data.userAdded) {
            yield put ({type: 'ADD_USER', data: data.userAdded})
        }
        else if(data.userDeleted) {
            yield put({type: 'DELETE_USER', id: data.userDeleted })
        }
    })
}