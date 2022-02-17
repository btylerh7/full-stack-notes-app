import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import noteService from './noteService'

const initialState = {
  notes: [],
  currentNote: {},
  isIdle: true,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

// Load all Notes

export const allNotes = createAsyncThunk(
  'notes/allNotes',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.loadNotes(token)
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

export const oneNote = createAsyncThunk(
  'notes/oneNote',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.loadSingleNote(token, id)
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

export const addNote = createAsyncThunk(
  'notes/addNote',
  async (title, note, token, thunkAPI) => {
    try {
      return await noteService.addNote(title, note, token)
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
      state.currentNote = {}
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    },
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
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.isIdle = true
        state.notes = []
      })
      .addCase(oneNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(oneNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.currentNote = action.payload
      })
      .addCase(oneNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.currentNote = {}
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.isSuccess = true
      })
  },
})

export const { noteReset } = noteSlice.actions
export default noteSlice.reducer
