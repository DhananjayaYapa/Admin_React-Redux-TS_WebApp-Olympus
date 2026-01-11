import { all } from 'redux-saga/effects'
import authSaga from './auth.saga'
import bannerSaga from './banner.saga'
import alertSaga from './alert.saga'
import teamSaga from './team.saga'
import clientSaga from './client.saga'
import applicationSaga from './application.saga'
import sbuSaga from './sbu.saga'
import userSaga from './user.saga'
import resignationSaga from './resignation.saga'
import flyerSaga from './flyer.saga'
import badgeSaga from './badge.saga'
import roleSaga from './role.saga'
import entitlementsSaga from './entitlements.saga'
import leavesSaga from './leaves.saga'

export default function* rootSaga() {
  yield all([
    authSaga(),
    bannerSaga(),
    alertSaga(),
    sbuSaga(),
    clientSaga(),
    userSaga(),
    teamSaga(),
    applicationSaga(),
    resignationSaga(),
    flyerSaga(),
    badgeSaga(),
    roleSaga(),
    entitlementsSaga(),
    leavesSaga(),
  ])
}
