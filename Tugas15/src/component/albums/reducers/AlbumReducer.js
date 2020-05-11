import { IMAGE_ALBUM, DELETE_ALBUM, UPDATE_ALBUM, FETCH_COMPLETE, EDIT_ALBUM, RESET_ALBUM, SET_LOADING, SEARCH_ALBUM, INPUT_ALBUM, SUBMIT_ALBUM } from "./Actions";

const defaultFormValues = {
    id: undefined,
    title: '',
    description: '',
    releaseYear: '',
    discount: '',
    image: null

};

const initialState = {
    isLoading: true,
    albums: [],
    image: '',
    form: { ...defaultFormValues }
}
function albumReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case DELETE_ALBUM:
            return { ...state, albums: state.albums.filter((album) => (album.id !== payload)) };

        case UPDATE_ALBUM:
            return { ...state, albums: state.albums.map((album) => album.id === payload.id ? payload : album) };

        case EDIT_ALBUM:
            const album = state.albums.find((album) => album.id === payload);
            return { ...state, form: { ...album } };


        case RESET_ALBUM:
            return { ...state, form: { ...defaultFormValues } }

        case SET_LOADING:
            return { ...state, isLoading: true }

        case FETCH_COMPLETE:
            return { ...state, isLoading: false, albums: [...payload] }

        case SEARCH_ALBUM:
            return { ...state, keyword: payload };

        case INPUT_ALBUM:
            const { inputName, inputValue } = payload;
            const form = { ...state.form };
            form[inputName] = inputValue;
            return { ...state, form: { ...form } };

        case SUBMIT_ALBUM:
            return { ...state, isLoading: false, form: { ...defaultFormValues } };

        case IMAGE_ALBUM:
            return { ...state, image: payload[0] }
        default:
            return { ...state }
    }
}

export default albumReducer;