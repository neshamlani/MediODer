import React from 'react'

const initialState = {
	token: null,
	medicines: [],
	userDetails: '',
	cart: []
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				token: action.value
			}
			break
		case 'MED_FETCHED':
			return {
				...state,
				medicines: action.value
			}

		case 'SET_USER_DETAILS':
			return {
				...state,
				userDetails: action.value
			}

		case 'ADD_TO_CART':
			return {
				...state,
				cart: [...state.cart, action.value]
			}
		
		case 'REMOVE_FROM_CART':
			return{
				...state,
				cart:state.cart.filter(val=>val.name!==action.value)
			}
		default:
			return state
	}
}

export default reducer