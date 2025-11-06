const token_id = 's_token'
const user_id = 's_user'

export const saveToken = (token) => {
    window.localStorage.setItem("s_token", token)
}

export const getToken = () => {
    return window.localStorage.getItem('s_token')
}

export const saveUser = (user) => {
    window.localStorage.setItem('s_user', JSON.stringify(user))
}

export const getUser = (user_key) => {
    return JSON.parse(window.localStorage.getItem(user_key))
}

export const getUserId = () => {
    const user = getUser('s_user')
    if(user == null){return ''}
    return user.userId
}

export const getUserRole = (user_key) => {
    const user = getUser(user_key)
    if(user == null){return ''}
    return user.role
}

export const isClientLoggedIn = () => {
    if(getToken('s_token') == null){ return false}

    const role = getUserRole("s_user")
    return role == 'CLIENT'
}

export const isCompanyLoggedIn = (user_key) => {
    if(getToken(user_key) == null){ return false}

    const role = getUserRole(user_key)
    return role == 'COMPANY'
}

export const logout = () => {
    window.localStorage.removeItem('s_token')
    window.localStorage.removeItem('s_user')
}