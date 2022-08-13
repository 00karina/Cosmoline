
import Cookies from 'js-cookie';
 export const domain = "http://127.0.0.1:8000";
 export const token=window.localStorage.getItem('token')
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const header = {
    Authorization: `token ${token}`
}
const csrftoken = Cookies.get('csrftoken')
export const header2 = {
    'X-CSRFToken': csrftoken,
}