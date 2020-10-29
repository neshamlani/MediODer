import React from 'react'

const initialState = {
	token: null,
	medicines: [],
	userDetails: '',
	cart: [],
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
			const found = state.cart.find(val => val.id === action.value.id)
			if (found) {
				alert('Already in the cart')
				return state
			} else {
				alert('Added')
				return {
					...state,
					cart: [...state.cart, action.value]
				}
			}

		case 'REMOVE_FROM_CART':
			return {
				...state,
				cart: state.cart.filter(val => val.name !== action.value)
			}

		case 'INCREMENT_QUANTITY':
			let updated = state.cart.map(val => {
				if (val === action.value) {
					val.quantity++
					return val
				} else {
					return val
				}
			})
			return {
				...state,
				cart: updated
			}

		case 'DECREMENT_QUANTITY':
			let removed = state.cart.map(val => {
				if (val === action.value) {
					if (val.quantity <= 1) {
						return val
					}
					val.quantity--
					return val
				} else {
					return val
				}
			})
			return {
				...state,
				cart: removed
			}

		default:
			return state
	}
}

export default reducer