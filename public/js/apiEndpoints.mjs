const API_ENDPOINTS = {
    base: "/api",
    encrypt : {endpoint:"/encrypt", method:"POST"},
    decrypt : {endpoint:"/decrypt", method:"POST"},
}

const USER_ENDPOINT = {
    base:"/user",
    create:{endpoint:"/create", method:"POST"},
    auth:{endpoint:"/authenticate", method:"POST"}
}


export default { API_ENDPOINTS , USER_ENDPOINT}
