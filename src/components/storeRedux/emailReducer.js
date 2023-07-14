import { createSlice } from "@reduxjs/toolkit"


const initialEmailState={
    mails:[],
    //for inbox
    sendMails:[],
    //for sent box
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
/*in this file state.mails is directly pointing to mails
but at the time of useSelector state.mail.mails will point to this reason is configure store 
import emailReducer from './emailReducer'
cost store = configureStore({
    reducer:{
        email:emailReducer,
    }
})
in index file
state.email will tell that i wat this particular slice
*/