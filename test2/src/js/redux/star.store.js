import { createStore } from 'redux'
import StarReducer from './star.reducer'
const store = createStore(StarReducer)

store.subscribe(() => {
    console.log("store changed", store.getState())
});

export default store