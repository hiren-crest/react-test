import client from '../apollo/client'

export function fetchUsers(payload) {
    payload.fetchPolicy = 'no-cache'
    return client.query(payload)
    .then(({data}) => ({ data }))
    .catch(error => ({ error }));
}

export function mutateUsers(payload) {
    return client.mutate(payload)
    .then(({data}) => ({data}))
    .catch(error => ({error}));
}

export function subscribeUsers(payload, callback) {
    return client.subscribe(payload)
    .subscribe({
        next ({data}) {
            callback(data)
        }
    });
}