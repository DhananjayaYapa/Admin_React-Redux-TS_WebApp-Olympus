import { call, put, takeEvery } from 'redux-saga/effects'
import { bannerService } from '../../service'
import type {
  BannerListQueryParamsDto,
  CreateBannerDto,
  DeleteBannerParamsDto,
  UpdateBannerDto,
} from '../../utilities/models/banner.model'
import { BANNER_ACTION_TYPES, COMMON_ACTION_TYPES } from '../../utilities/constants'
import { dispatchAlert } from '../../utilities/helpers'

function* postBanner(action: { type: string; payload: CreateBannerDto }) {
  try {
    // @ts-expect-error-ignore
    const banner = yield call(bannerService.postBanner, action.payload)
    yield put({
      type: BANNER_ACTION_TYPES.POST_BANNER + COMMON_ACTION_TYPES.SUCCESS,
      data: banner.data,
    })
    yield* dispatchAlert(BANNER_ACTION_TYPES.POST_BANNER, banner.data.message, 'success')
    yield put({
      type: BANNER_ACTION_TYPES.GET_BANNER_LIST + COMMON_ACTION_TYPES.REQUEST,
      params: {
        getDisabledBanners: true,
      },
    })
  } catch (error) {
    yield put({
      type: BANNER_ACTION_TYPES.POST_BANNER + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(BANNER_ACTION_TYPES.POST_BANNER, error as string, 'error')
  }
}

function* getBannerList(action: { type: string; params: BannerListQueryParamsDto }) {
  try {
    // @ts-expect-error-ignore
    const bannerList = yield call(bannerService.getBannerList, action.params)
    yield put({
      type: BANNER_ACTION_TYPES.GET_BANNER_LIST + COMMON_ACTION_TYPES.SUCCESS,
      data: bannerList.data,
    })
  } catch (error) {
    yield put({
      type: BANNER_ACTION_TYPES.GET_BANNER_LIST + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(BANNER_ACTION_TYPES.GET_BANNER_LIST, error as string, 'error')
  }
}

function* updateBanner(action: { type: string; payload: UpdateBannerDto }) {
  try {
    // @ts-expect-error-ignore
    const updatedBanner = yield call(bannerService.updateBanner, action.payload)
    yield put({
      type: BANNER_ACTION_TYPES.UPDATE_BANNER + COMMON_ACTION_TYPES.SUCCESS,
      data: updatedBanner.data,
    })
    yield* dispatchAlert(BANNER_ACTION_TYPES.UPDATE_BANNER, updatedBanner.data.message, 'success')
    yield put({
      type: BANNER_ACTION_TYPES.GET_BANNER_LIST + COMMON_ACTION_TYPES.REQUEST,
      params: {
        getDisabledBanners: true,
      },
    })
  } catch (error) {
    yield put({
      type: BANNER_ACTION_TYPES.UPDATE_BANNER + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(BANNER_ACTION_TYPES.UPDATE_BANNER, error as string, 'error')
  }
}

function* deleteBanner(action: { type: string; params: DeleteBannerParamsDto }) {
  try {
    // @ts-expect-error-ignore
    const deletedBanner = yield call(bannerService.deleteBanner, action.params)
    yield put({
      type: BANNER_ACTION_TYPES.DELETE_BANNER + COMMON_ACTION_TYPES.SUCCESS,
      data: deletedBanner.data,
    })
    yield* dispatchAlert(BANNER_ACTION_TYPES.DELETE_BANNER, deletedBanner.data.message, 'success')
    yield put({
      type: BANNER_ACTION_TYPES.GET_BANNER_LIST + COMMON_ACTION_TYPES.REQUEST,
      params: {
        getDisabledBanners: true,
      },
    })
  } catch (error) {
    yield put({
      type: BANNER_ACTION_TYPES.DELETE_BANNER + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(BANNER_ACTION_TYPES.DELETE_BANNER, error as string, 'error')
  }
}

function* bannerSaga() {
  yield takeEvery(BANNER_ACTION_TYPES.POST_BANNER + COMMON_ACTION_TYPES.REQUEST, postBanner)
  yield takeEvery(BANNER_ACTION_TYPES.GET_BANNER_LIST + COMMON_ACTION_TYPES.REQUEST, getBannerList)
  yield takeEvery(BANNER_ACTION_TYPES.UPDATE_BANNER + COMMON_ACTION_TYPES.REQUEST, updateBanner)
  yield takeEvery(BANNER_ACTION_TYPES.DELETE_BANNER + COMMON_ACTION_TYPES.REQUEST, deleteBanner)
}

export default bannerSaga
