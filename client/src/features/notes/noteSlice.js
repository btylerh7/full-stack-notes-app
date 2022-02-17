import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import noteService from './noteService'

const initialState = {
  notes: [],
  currentNote: {},
  isIdle: true,
  isLoading: false,
  isLoaded: false,
  isAdded: false,
  isDeleted: false,
  isUpdated: false,
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
  async (noteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const { title, note } = noteData
      return await noteService.addNote(title, note, token)
    } catch (error) {
      console.log(error)
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

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async (noteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const { id, title, note } = noteData
      return await noteService.updateNote(id, title, note, token)
    } catch (error) {
      console.log(error)
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

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.deleteNote(id, token)
    } catch (error) {
      console.log(error)
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
      state.isError = false
      state.isSuccess = false
      state.isUpdated = false
      state.isDeleted = false
      state.isAdded = false
      state.isLoaded = false
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
        state.isLoaded = true
        state.isSuccess = true
        state.currentNote = action.payload
      })
      .addCase(oneNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.currentNote = {}
      })
      .addCase(addNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isAdded = true
        state.isLoading = false
        state.notes.push(action.payload)
      })
      .addCase(addNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isUpdated = true
        state.isLoading = false
        state.currentNote = action.payload
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteNote.fulfilled, (state) => {
        state.isDeleted = true
        state.isLoading = false
        state.isSucess = true
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { noteReset } = noteSlice.actions
export default noteSlice.reducer
