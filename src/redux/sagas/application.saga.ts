import {call,put,takeEvery} from 'redux-saga/effects'
import { applicationService } from '../../service'
import { APPLICATION_ACTION_TYPES,COMMON_ACTION_TYPES} from '../../utilities/constants'

function* getApplicationList(action:{type:string}){
    try{
       // @ts-expect-error-ignore 
       const appList = yield call (applicationService.getApplicationList,action.payload)
       yield put ({
        type:APPLICATION_ACTION_TYPES.GET_APPLICATION_LIST + COMMON_ACTION_TYPES.SUCCESS,
        data:appList.data
       })
    }catch(error){
        yield put ({
            type:APPLICATION_ACTION_TYPES.GET_APPLICATION_LIST+COMMON_ACTION_TYPES.ERROR,
            error:error as string
        })
    }
}

function* applicationSaga(){
    yield takeEvery(APPLICATION_ACTION_TYPES.GET_APPLICATION_LIST + COMMON_ACTION_TYPES.REQUEST,getApplicationList)

}

export default applicationSaga