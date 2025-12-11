import { createSlice, createSelector } from '@reduxjs/toolkit'

const defaultChannelId = 1

const initialState = {
  currentId: String(defaultChannelId),
  defaultId: String(defaultChannelId),
  error: '',
  isError: false,
  modalConfig: {
    show: '',
    type: '',
    channel: '',
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload }) => {
      state.currentId = payload.id
    },
    setModalConfig: (state, { payload }) => {
      state.modalConfig = payload
    },
  },
})

export const { setCurrentChannel, setModalConfig } = uiSlice.actions

const selectUiState = state => state.ui

export const selectCurrentChannelId = createSelector(
  selectUiState,
  ui => ui?.currentId,
)
export const selectDefaultChannelId = createSelector(
  selectUiState,
  ui => ui?.defaultId,
)

const selectModalConfig = createSelector(
  selectUiState,
  ui => ui?.modalConfig,
)

export const selectModalShow = createSelector(
  selectModalConfig,
  modalConfig => modalConfig?.show,
)
export const selectModalType = createSelector(
  selectModalConfig,
  modalConfig => modalConfig?.type,
)
export const selectModalChannel = createSelector(
  selectModalConfig,
  modalConfig => modalConfig?.channel,
)

export default uiSlice.reducer
