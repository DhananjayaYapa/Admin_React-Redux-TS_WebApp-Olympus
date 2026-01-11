import { TEAM_ACTION_TYPES,COMMON_ACTION_TYPES } from "../../utilities/constants";
import type { TeamListQueryParamsDto ,CreateTeamDto,UpdateTeamDto} from "../../utilities/models/team.model";


const postTeam = (payload:CreateTeamDto) =>{
    return {
        type:TEAM_ACTION_TYPES.POST_TEAM + COMMON_ACTION_TYPES.REQUEST,
        payload: payload
    }
}

const getTeamList = (params:TeamListQueryParamsDto)=>{
    return {
        type:TEAM_ACTION_TYPES.GET_TEAM_LIST + COMMON_ACTION_TYPES.REQUEST,
        params: params,
    }
}

const updateTeam = (payload:UpdateTeamDto)=>{
    return{
        type:TEAM_ACTION_TYPES.UPDATE_TEAM + COMMON_ACTION_TYPES.REQUEST,
        payload:payload
    }
}


export const teamActions = {
    postTeam,
    getTeamList,
    updateTeam
}