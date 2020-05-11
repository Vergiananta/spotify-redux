import { IMAGE_ARTIST, SUBMIT_ARTIST, UPDATE_ARTIST, DELETE_ARTIST, EDIT_ARTIST, RESET_ARTIST, SET_LOADING, INPUT_ARTIST, FETCH_COMPLETE, SEARCH_ARTIST } from "./Actions";

const defaultFormValues = {
    id: undefined,
    name: '',
    debutYear: '',
    gender: '',
    biography: '',
    photo: null,

};

const initialState = {
    isLoading: true,
    artists: [],
    photo: '',
    form: { ...defaultFormValues }
}

function artistReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case DELETE_ARTIST:
            return { ...state, artists: state.genres.filter((artist) => (artist.id !== payload)) };

        case UPDATE_ARTIST:
            return { ...state, artists: state.genres.map((artist) => artist.id === payload.id ? payload : artist) };

        case EDIT_ARTIST:
            const album = state.artists.find((artist) => artist.id === payload);
            return { ...state, form: { ...artist } };


        case RESET_ARTIST:
            return { ...state, form: { ...defaultFormValues } }

        case SET_LOADING:
            return { ...state, isLoading: true }

        case FETCH_COMPLETE:
            return { ...state, isLoading: false, artists: [...payload] }

        case SEARCH_ARTIST:
            return { ...state, keyword: payload };

        case INPUT_ARTIST:
            const { inputName, inputValue } = payload;
            const form = { ...state.form };
            form[inputName] = inputValue;
            return { ...state, form: { ...form } };

        case SUBMIT_ARTIST:
            return { ...state, isLoading: false, form: { ...defaultFormValues } };

        case IMAGE_ARTIST:
            return { ...state, photo: payload[0] }
        default:
            return { ...state }
    }
}

export default artistReducer;