import { LOGIN_VENDOR } from "../constant";

export const login = (user, pass) => async (dispatch) => {
    console.log(user, pass)
    if (user === "abc" && pass === "123") {
        const user = { userId: 1, userName: "rakesh.sharma", password: "1234", sessionId: "ABC123" }
        await dispatch({ type: LOGIN_VENDOR, payload: user })
        return true
    } else {
        return false
    }
    // TODO:Write api call for login
}

export const changePassword = (old_pass, new_pass) => async (dispatch) => {
    // TODO:Write api call for change password
}

export const viewProfile = (userId) => async (dispatch) => {
    // TODO:Write api call for view profile
}

export const logOut = (userId, sessionId) => async (dispatch) => {
    // TODO:Write api call for logout
}