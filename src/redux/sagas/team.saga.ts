import {call,put,takeEvery} from 'redux-saga/effects'
import { teamService } from '../../service/team.service'
import type { TeamListQueryParamsDto,CreateTeamDto,UpdateTeamDto } from '../../utilities/models/team.model'
import { TEAM_ACTION_TYPES,COMMON_ACTION_TYPES } from '../../utilities/constants'
import { dispatchAlert } from '../../utilities/helpers'

function* postTeam(action: {type:string; payload:CreateTeamDto}){
    try{
        // @ts-expect-error-ignore
        const team = yield call(teamService.postTeam,action.payload)
        yield put ({
            type:TEAM_ACTION_TYPES.POST_TEAM + COMMON_ACTION_TYPES.SUCCESS,
            data:team.data
        })
        yield* dispatchAlert(TEAM_ACTION_TYPES.POST_TEAM,team.data.message, 'success')
        yield put ({
            type:TEAM_ACTION_TYPES.GET_TEAM_LIST + COMMON_ACTION_TYPES.REQUEST,
            params:{
                getAllAppTeams:true,
                getDisabledTeams:true
            }
        })

    }
    catch(error){
        yield put ({
            type:TEAM_ACTION_TYPES.POST_TEAM + COMMON_ACTION_TYPES.ERROR,
            error: error as string
        })
        yield* dispatchAlert(TEAM_ACTION_TYPES.POST_TEAM,error as string, 'error')
    }
}

function* getTeamList(action: {type:string; params:TeamListQueryParamsDto}){
    try{
        // @ts-expect-error-ignore
        const teamList = yield call(teamService.getTeamList,action.params)
        yield put ({
            type:TEAM_ACTION_TYPES.GET_TEAM_LIST + COMMON_ACTION_TYPES.SUCCESS,
            data:teamList.data
        })
       

    }
    catch(error){
        yield put ({
            type:TEAM_ACTION_TYPES.GET_TEAM_LIST+ COMMON_ACTION_TYPES.ERROR,
            error: error as string
        })
        
    }
}

function* updateTeam(action: {type:string; payload:UpdateTeamDto}){
    try{
        // @ts-expect-error-ignore
        const updateTeam = yield call(teamService.updateTeam,action.payload)
        yield put ({
            type:TEAM_ACTION_TYPES.UPDATE_TEAM+ COMMON_ACTION_TYPES.SUCCESS,
            data:updateTeam.data
        })
        yield* dispatchAlert(TEAM_ACTION_TYPES.UPDATE_TEAM,updateTeam.data.message, 'success')
        yield put ({
            type:TEAM_ACTION_TYPES.GET_TEAM_LIST + COMMON_ACTION_TYPES.REQUEST,
            params:{
                getAllAppTeams:true,
                getDisabledTeams:true
            }
        })

    }
    catch(error){
        yield put ({
            type:TEAM_ACTION_TYPES.UPDATE_TEAM + COMMON_ACTION_TYPES.ERROR,
            error: error as string
        })
        yield* dispatchAlert(TEAM_ACTION_TYPES.UPDATE_TEAM,error as string, 'error')
    }
}

function* teamSaga() {
  yield takeEvery(TEAM_ACTION_TYPES.POST_TEAM + COMMON_ACTION_TYPES.REQUEST, postTeam)
  yield takeEvery(TEAM_ACTION_TYPES.GET_TEAM_LIST + COMMON_ACTION_TYPES.REQUEST, getTeamList)
  yield takeEvery(TEAM_ACTION_TYPES.UPDATE_TEAM + COMMON_ACTION_TYPES.REQUEST, updateTeam)}
 

export default teamSaga