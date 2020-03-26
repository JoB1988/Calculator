import { useReducer, useEffect } from 'react';

const initialState = {
    numero: "",
    operation: "",
    result: "",
    continue: false
}

const resultReducer = (state, action) => {

    switch (action.type) {
        case 'RESULT':
            return {
                ...state, operation: '', numero: '', result: action.payload,
                    continue :true
            };
        case 'NUMBER':
            return {
                ...state, numero: action.payload
            }
        case 'RESET':
            return {
                ...state, numero1: '', numero2: '', operation: '', result: ''
            }
        case 'OP':
            return {
                ...state, operation: action.payload
            }
        case 'CONTINUE':
            return {
                ...state, operation: action.payload, result: state.numero, numero:'',continue: false
            }
        default:
            return state;
    }
    
}

const useStore = () => useReducer(resultReducer, initialState)
export default useStore;