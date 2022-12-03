const axios = require('axios');

export async function getAllUsers(){

    try{
        const res= await axios.get('/users/check');
        console.log('response', res);
        return res.data;
    }
    catch(error)
    {
        return [];
    }
}

export async function createUser(data){
    const res= await axios.post(`/users/create`,{user:data});
    return res.data;
}