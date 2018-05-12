import {GET_EVALUATION} from '../actions/index'

export default function (state = null, action) {
  switch (action.type) {
    case GET_EVALUATION:
      return action.payload

    default:
      return state
  }
}
