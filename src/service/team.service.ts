import { axiosPrivateInstance } from "."

import type { TeamListQueryParamsDto,CreateTeamDto,UpdateTeamDto } from "../utilities/models/team.model"

const postTeam = (payload:CreateTeamDto)=>{
    return axiosPrivateInstance.post ('core/api/v1/teams',payload)
}

const getTeamList = (params:TeamListQueryParamsDto)=>{
    return axiosPrivateInstance.get('core/api/v2/teams',{params:params})
}

const updateTeam = (payload:UpdateTeamDto)=>{
    return axiosPrivateInstance.put('core/api/v1/teams',payload)
}


export const teamService = {
    postTeam,
    getTeamList,
    updateTeam
}