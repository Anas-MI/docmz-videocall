import {ASSIGN_ID} from "./type"

export const assignId = id => ({
    type: ASSIGN_ID, 
    payload: id
})


