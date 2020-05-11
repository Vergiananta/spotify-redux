import { DELETE_ARTIST, EDIT_BUTTON, RESET_FORM, SET_LOADING, FETCH_COMPLETE, HANDLE_INPUT, SUBMIT_COMPLETE, HANDLE_IMAGE } from "./Actions";

const defaultFormValues = {
    id: undefined,
    name: '',
    debutYear: '',
    gender: '',
    biography: '',
    photo: undefined,
};

const initialState = {
    isLoading: true,
    artists: [],
    form: { ...defaultFormValues },
    photo: '',
}


function artistReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        
            
            case DELETE_ARTIST:
                return { ...state, albums: state.artists.filter((artist) => ( artist.id !== payload))  };
                       
                    case EDIT_BUTTON:
                    const artist = state.artists.find((artist)=> artist.id===payload);
                    return{ ...state, form: { ...artist}};
                    
                        
                        case RESET_FORM:
                            return { ...state, form: { ...defaultFormValues } };

                            case SET_LOADING:
                                return { ...state, isLoading: true};

                                case FETCH_COMPLETE:
                                    return { ...state, isLoading: false, artists: [ ...payload]};
                                    
                                    case HANDLE_INPUT: 
                                    const { form }= state;
                                    const { inputName, inputValue} = payload;

                                    form[inputName] = inputValue;

                                    return {...state, form: { ...form }};

                                    case SUBMIT_COMPLETE:
                                        return { ...state, isLoading: false, form: { ...defaultFormValues }};

                                            case HANDLE_IMAGE:
                                                return { ...state, photo: payload[0] };
        default:
            return { ...state }
    }
}

export default artistReducer;