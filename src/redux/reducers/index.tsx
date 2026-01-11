import { combineReducers } from 'redux'
import authReducer from './auth.reducer'
import userReducer from './user.reducer'
import bannerReducer from './banner.reducer'
import alertReducer from './alert.reducer'
import teamReducer from './team.reducer'
import teamAlertReducer from './team_alert.reducer'
import applicationReducer from './application.reducer'
import resignationreducer from './resignation.reducer'
import sbuReducer from './sbu.reducer'
import clientReducer from './client.reducer'
import flyerReducer from './flyer.reducer'
import badgeReducer from './badge.reducer'
import roleReducer from './role.reducer'
import entitlementsReducer from './entitlements.reducer'
import leavesReducer from './leaves.reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  banner: bannerReducer,
  alert: alertReducer,
  team: teamReducer,
  team_alert: teamAlertReducer,
  client: clientReducer,
  application: applicationReducer,
  resignation: resignationreducer,
  sbu: sbuReducer,
  flyer: flyerReducer,
  badge: badgeReducer,
  role: roleReducer,
  entitlements: entitlementsReducer,
  leaves: leavesReducer,
})
export default rootReducer
