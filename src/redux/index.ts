import { createSlice } from "@reduxjs/toolkit"

interface counterState{
    value:number
}

const initialState:counterState={
    value:0
}

export const counterSlice=createSlice({
    name:"counter",
    initialState,
    reducers:{
        add(state:counterState){
            state.value+=1
        }
    }
});

export default initialState