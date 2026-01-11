import { APPLICATION_ACTION_TYPES,COMMON_ACTION_TYPES} from "../../utilities/constants";

const getAppList = ()=>{
    return{
        type:APPLICATION_ACTION_TYPES.GET_APPLICATION_LIST + COMMON_ACTION_TYPES.REQUEST
    }
}


export const applicationActions = {
    getAppList
}