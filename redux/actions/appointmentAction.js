import { SET_APPOINTMENT_TIME, SET_DOCTORS_APPOINTMENT } from "./type";

export const setAppointmentTime = payload => ({
    type: SET_APPOINTMENT_TIME,
    payload
})

export const setDoctorsAppointment = payload => ({
    type: SET_DOCTORS_APPOINTMENT,
    payload
})