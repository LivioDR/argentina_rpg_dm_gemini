const getHistoryForId = async(id) => {
    const response = await fetch(`/api/database/history?id=${id}`)
        .then(res => res.json())
    return response.message    
}

const saveHistoryForId = async(id, history) => {
    if(history){
        const response = await fetch('/api/database/history',{
            method: 'POST',
            body: JSON.stringify({
               history: JSON.stringify(history),
               id: id,
            })
          }).then(res => res.json())
        console.log(response.message)
    }
}

const loginUser = async(email, password, setErrorMessage) => {
    const response = await fetch('/api/database/login',{
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: btoa(password)
        })
    }).then(res => res.json())
    if(response.success){
        if(typeof window != "undefined"){
            localStorage.setItem("uid",response.uid)
            localStorage.setItem("username",response.username)
        }
    }
    setErrorMessage(response.message)
    return response.success
}

const resetPassword = async(email, setErrorMessage) => {
    const response = await fetch('/api/database/reset',{
        method: 'POST',
        body: JSON.stringify({
           email: email,
        })
      }).then(res => res.json())
    setErrorMessage(response.message)
}

const registerUser = async(username, email, password, setErrorMessage) => {

    const response = await fetch('/api/database/register',{
        method: 'POST',
        body: JSON.stringify({
            username: username,
            email: email,
            password: btoa(password)
        })
    }).then(res => res.json())
    if(typeof window != "undefined" && response.success){
        localStorage.setItem("uid",response.uid)
        localStorage.setItem("username",response.username)
    }
    setErrorMessage(response.message)
    return response.success
}


export { getHistoryForId, saveHistoryForId, loginUser, resetPassword, registerUser }