import gql from 'graphql-tag'
export const fetchUsers = gql`
    query {
        users {
            name
            email
            id
            title
        }
    }
`
export const deleteUser = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(id: $id)
    }
`

export const createUser = gql`
    mutation createUser(
            $email: String!
            $password: String
            $title: String!
            $name: String!
            $id: ID 
        ) {
        createUser (
            email: $email
            password: $password
            title: $title
            id: $id
            name: $name
        ) { 
            id
            email
            name
            title
        }
    }
`

export const loginUser = gql`
    mutation Me(
            $email: String!
            $password: String!
        ) {
        me (
                email: $email
                password: $password
            ) { 
            email
            name
        }
    }`
export const subscribeUser = gql`
    subscription {
        userAdded {
            id
            name
            title
            email
        }
    }
`
export const subscribeDeleteUser = gql`
    subscription {
        userDeleted
    }
`
export default {
    create: createUser,
    delete: deleteUser,
    fetch: fetchUsers,
    login: loginUser,
    subscribe: subscribeUser,
    subscribe_delete: subscribeDeleteUser
}