const initialState = {
  data: {}
}

const FETCH_DATA = 'FETCH_DATA'
export const fetchData = (data) => {
  return {
    type: FETCH_DATA,
    payload: data
  }
}


function reducer(state = initialState, action) {
  switch(action.type){
    case FETCH_DATA:
      return {...state, data: action.payload};
    default:
      return state
  }
}

export default reducer