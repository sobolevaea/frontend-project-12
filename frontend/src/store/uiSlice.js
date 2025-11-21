import { createSlice, createSelector } from '@reduxjs/toolkit'

const defaultChannelId = 1

const initialState = {
  currentId: String(defaultChannelId),
  defaultId: String(defaultChannelId),
  error: '',
  isError: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload }) => {
      state.currentId = payload.id
    },
  },
})

export const { setCurrentChannel } = uiSlice.actions

const selectUiState = state => state.ui

export const selectCurrentChannelId = createSelector(
  selectUiState,
  ui => ui?.currentId,
)
export const selectDefaultChannelId = createSelector(
  selectUiState,
  ui => ui?.defaultId,
)

// export const selectUiError = state => state.ui.error
// export const selectHasUiError = state => state.ui.isError

export default uiSlice.reducer
