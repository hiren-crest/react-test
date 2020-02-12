import React from "react"
const LoginContext = React.createContext({})
export const LoginProvider = LoginContext.Provider
LoginContext.displayName = "LoginContext"
export const LoginConsumer = LoginContext.Consumer

export default LoginContext