import { CLIENT_ACTION_TYPES,COMMON_ACTION_TYPES } from "../../utilities/constants";

const getClientList = ()=>{
    return{
        type:CLIENT_ACTION_TYPES.GET_CLIENT_LIST + COMMON_ACTION_TYPES.REQUEST
    }
}




export const clientActions = {
    getClientList
}