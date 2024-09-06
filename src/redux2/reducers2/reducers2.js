import { init } from '../init2/init2'

export const appReducer = (state = init, action) => {
    switch (action.type) {

        case 'LOADER':
            return {
                ...state,
                isShowLoader: action.payload
            }
         
        case 'AUTH':
            return {
                ...state,
                // isLoggedIn: action.payload  // if it is having single value then we write "isLoggedIn: action.payload" only
                ...action.payload // it is an object having two property isLoggedIn and uid so we write ...action.payload
            }
        
        case 'MENU':
            return {
                ...state,
                isShowMenu: action.payload  // it is not an object like AUTH reducer 
                // ...action.payload
            } 

        case 'TOASTER':
            return {
                ...state,
                toaster: action.payload,
                // isShowToaster: action.payload
            }

        default:
            return state;

    }
}