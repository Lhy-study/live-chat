import { createSlice } from "@reduxjs/toolkit"

interface userState{
    username:string
    uid:number
    signature:string
    avatar:string
}

const initialState:userState={
    username:"",
    uid:NaN,
    signature:"",
    avatar:""
}

const userSlice=createSlice({
    name:"userInfo",
    initialState,
    reducers:{
        init(state){ 
            
        }
    }
})

export default userSlice