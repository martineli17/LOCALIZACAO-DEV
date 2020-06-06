const INITIAL_VALUE = {
    loading: false,
    data: [],
    message: { text: null, type: 0 },
};

export const TypesActions = {
    ADD_SUCCESS: "developer/add_success",
    ADD_REQUEST: "developer/add_request",
    REMOVE: "developer/remove",
    ERROR: "developer/error",
    CLEAR_MESSAGE: "developer/clear_message",
};

export const TypesMessagens = {
    REMOVE: "Developer excluído com sucesso!",
    ERRORS: "Ocorreu um erro. Vereifique se o User Name inserido está correto.",
    ADD: "Developer adicionado com sucesso!",
    EXISTS: "Developer já existente na listagem",
    CLEAR: null,
};

function ChangeMessage(type) {
    switch (type) {
        case TypesMessagens.ADD:
            return TypesMessagens.ADD;
        case TypesMessagens.REMOVE:
            return TypesMessagens.REMOVE;
        case TypesMessagens.ERRORS:
            return TypesMessagens.ERRORS;
        case TypesMessagens.EXISTS:
            return TypesMessagens.EXISTS;
            case TypesMessagens.CLEAR:
                return TypesMessagens.CLEAR;
        default:
            return null;
    }
}

export default function DeveloperReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case TypesActions.ADD_SUCCESS:
            return { ...state, data: [...state.data, action.payload.developer], message: { text: TypesMessagens.ADD, type: 0 }, loading: false };
        case TypesActions.ADD_REQUEST:
            return { ...state, loading: true, message: { text: null, type: 3 } };
        case TypesActions.REMOVE:
            return { ...state, data: state.data.filter(x => x.id !== action.payload.id), message: { text: TypesMessagens.REMOVE, type: 0 }, loading: false };
        case TypesActions.ERROR:
            return { ...state, message: { text: ChangeMessage(action.payload.error), type: 1 }, loading: false };
        case TypesActions.CLEAR_MESSAGE:
            return { ...state, message: { text: null, type: 0 }};
        default:
            return state;
    }
}

export const Creators = {
    AddDeveloperRequest: developer => ({
        type: TypesActions.ADD_REQUEST, payload: { developer }
    }),

    AddDeveloperSuccess: developer => ({
        type: TypesActions.ADD_SUCCESS, payload: { developer }
    }),

    RemoveDeveloper: id => ({
        type: TypesActions.REMOVE, payload: { id }
    }),

    ErrorRequest: error => ({
        type: TypesActions.ERROR, payload: { error }
    }),

    ClearMessage: () => ({
        type: TypesActions.CLEAR_MESSAGE
    }),
}