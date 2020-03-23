//  const setAudio = (state = true, action) => (
//     action.type === "SET_AUDIO" ? action.audio : state
// )
// export default setAudio

import {ASSIGN_ID} from "../actions/type"

export default (state = "", action) => {
    const {payload, type} = action
    switch(type){
        case ASSIGN_ID:{
            console.log({"assign id reducer":payload})
            return payload
        }
        default: 
        return state
        }
}