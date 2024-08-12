import { init } from '../init2/init2'

export const appReducer = (state = init, action) => {
    switch (action.type) {
        
        case 'LOADER':
            return {
                ...state,
                isShowLoader: action.payload
            }
        default:
            return state;

    }
}