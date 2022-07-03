import ApiClient from "./axios";


export const isLoggedIn = () => {
    return !!sessionStorage.getItem('userId');
}

export const isAdministrator = () => {
    return !!sessionStorage.getItem('isAdmin');
}

export const getUserId = () => {
    return isLoggedIn() ? parseInt(sessionStorage.getItem('userId')) : "";
}

export const getUserName = () => {
    return isLoggedIn() ? sessionStorage.getItem('userName') : "";
}

export const logout = (faildFunc) => {
    ApiClient.post('/user/logout')
        .then((res) => {
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('isAdmin');
        }).catch(error => {
            faildFunc(error.response.data.message);
        })
}

export const login = (data, successFunc, faildFunc) => {
    let params = new URLSearchParams();
    params.append('email', data.email);
    params.append('password', data.password);
    ApiClient.post('/user/login', params)
        .then((res) => {
            sessionStorage.setItem('userId', res.data.userId);
            sessionStorage.setItem('isAdmin', res.data.adminFlag);
            sessionStorage.setItem('userName', res.data.userName);
            successFunc(!!res.data.adminFlag);
        })
        .catch(error => {
            faildFunc(error.response.data.message);
        });
}