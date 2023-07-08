import { createSlice } from "@reduxjs/toolkit"


const initialEmailState={
    mails:[],
    sendMails:[],
    unRead:0
}

const mailSlice=createSlice({
    name:'mail',
    initialState:initialEmailState,
    reducers:{
        updateInbox(state,action){
            state.mails=action.payload
        }, updateSentbox(state,action){
            state.sendMails=action.payload
        },
        updateUnread(state,action){
            state.unRead=action.payload
        }
    }
});

export const mailSliceAction=mailSlice.actions;
export default mailSlice.reducer