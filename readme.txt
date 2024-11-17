vendor-userId
Filter all 
projects -> According to status
sites  -> According to status
tasks  -> Status
Billing and payment
Vendor


Provider-> A wrapper that will bundle all actions,components or dependencies inside it

store->Blueprint of actual database that will provide initial data to the app
actions->Actions are those piece of codes(functions) that are responsible to handle data among 
         different components of the app
reducer->Reducer is just like a relay function that interacts with store data as per the action performed

{
    userId:null,
    sessionId:null
}

{
    userId:1,
    username:"rakesh.sharma@gmail.com",
    password:12345678
    sessionId:"91819222lkfdssdf"
}

export const login=(username,password)=>{
    return {userId,sessionId}
}

export const signup=()=>{
    return{userId,sessionId,username, password,vendor id, gst, pan, account}
}
export const logout=()=>{
    return {userId:null,sessionId:null}
}

reducer will set userId,sessionId in the store according to the action taken