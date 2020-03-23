export const user               = {};
export const referrer           = {
    referralUrl: null,
    ambassadorId: null,
    ambassadorUrl: null,
    referralUrlId: null
};
export const specialities       = [];
export const dashboard          = {
    collapsed: false
}
export const doctorLoggedIn     = {}
export const patientLoggedIn    = {}
export const appointment        = {}
export const room = 
    {
		rooms: [],
		video: true,
		audio: true
	}

export default {
    user,
    referrer,
    specialities,
    doctorLoggedIn,
    patientLoggedIn,
    appointment,
    dashboard,
    room
}