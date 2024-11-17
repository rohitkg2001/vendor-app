import { LOGIN_VENDOR } from "../constant";
import moment from "moment";
import { staff } from '../../utils/faker'

export const greet = () => {
    // Write a logic to get morning, afternoon, evening and night as per time from moment
    const currentTime = moment().format('HH');
    console.log(currentTime)
    if (0 < currentTime && currentTime < 12) {
        return 'Good Morning';
    }
    else if (12 < currentTime && currentTime < 16) {
        return 'Good Afternoon'
    }
    else if (16 < currentTime && currentTime < 21) {
        return 'Good Evening'
    } else {
        return 'Come Tomorrow'
    }
}

export const login = (user, pass) => async (dispatch) => {

    if (user === staff.email && pass === staff.password) {
        await dispatch({ type: LOGIN_VENDOR, payload: staff })
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