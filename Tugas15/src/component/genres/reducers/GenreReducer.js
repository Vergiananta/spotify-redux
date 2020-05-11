import { INPUT_GENRE, SEARCH_GENRE, SUBMIT_COMPLETE, UPDATE_GENRE, RESET_FORM, EDIT_BUTTON, DELETE_GENRE, FETCH_COMPLETE, SET_LOADING } from "./Actions";

const defaultFormValues = {
    id: undefined,
    name: ''
};

const initialState = {
    isLoading: true,
    genres: [],
    form: { ...defaultFormValues }
}
function genreReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case DELETE_GENRE:
            return { ...state, genres: state.genres.filter((genre) => (genre.id !== payload)) };

        case UPDATE_GENRE:
            return { ...state, genres: state.genres.map((genre) => genre.id === payload.id ? payload : genre) };

        case EDIT_BUTTON:
            const genre = state.genres.find((genre) => genre.id === payload);
            return { ...state, form: { ...genre } };


        case RESET_FORM:
            return { ...state, form: { ...defaultFormValues } }

        case SET_LOADING:
            return { ...state, isLoading: true }

        case FETCH_COMPLETE:
            return { ...state, isLoading: false, genres: [...payload] }

        case SEARCH_GENRE:
            return { ...state, keyword: payload };

        case INPUT_GENRE:
            const { inputName, inputValue } = payload;
            const form = { ...state.form };
            form[inputName] = inputValue;
            return { ...state, form: { ...form } };

        case SUBMIT_COMPLETE:
            return { ...state, isLoading: false, form: { ...defaultFormValues } };

        default:
            return { ...state }
    }
}

export default genreReducer;