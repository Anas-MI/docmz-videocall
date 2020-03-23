import { SET_APPOINTMENT_TIME, SET_DOCTORS_APPOINTMENT } from "../actions/type";
import { appointment } from './_initialStates'

export default (state = appointment, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_APPOINTMENT_TIME:
      return {
        ...state,
        time: payload
      };
      case SET_DOCTORS_APPOINTMENT: return{
        ...state, 
        allAppointments: payload
      }
    default:
      return state;
  }
};
