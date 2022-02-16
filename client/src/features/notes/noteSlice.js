import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import noteService from './noteService'

const initialState = {
  notes: [],
  isIdle: true,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

// Load all Notes

export const allNotes = createAsyncThunk(
  'notes/allNotes',
  async (token, thunkAPI) => {
    try {
      const notes = await noteService.loadNotes(token)
      console.log(notes)
      return notes
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    noteReset: (state) => {
      state.user = null
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    },
    extraReducers: (builder) => {
      builder
        .addCase(allNotes.pending, (state) => {
          state.isLoading = true
          state.isIdle = false
        })
        .addCase(allNotes.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.notes = action.payload
          state.isIdle = true
        })
        .addCase(allNotes.rejected, (state, action) => {
          state.isLoading(false)
          state.isError(true)
          state.message = action.payload
          state.isIdle = true
          state.notes = []
        })
    },
  },
})

export const { noteReset } = noteSlice.actions
export default noteSlice.reducer
