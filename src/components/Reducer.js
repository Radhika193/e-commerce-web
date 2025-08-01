export const initialState = {
    basket:[],
    value:0,
    user:null
};

export const getBasketTotal=({basket})=>{
    return basket?.reduce((total, item) => total + item.price, 0);
}

const reducer = (state,action) =>{

    switch(action.type){
        case 'ADD_TO_BASKET' :
             if (!action.item || !action.item.id) {
    console.warn('Attempted to add invalid item to basket:', action.item);
    return state;
  }
            return {
                ...state ,
                basket: [...state.basket,action.item],
                value: state.value + action.item.price,
            };

        case 'EMPTY_BASKET':
            return{
                ...state,
                basket:[]
            }

        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (item) => item.id === action.id   
            )

            if(index >= 0){
                let updatedBasket=[...state.basket];
                const removedItem=updatedBasket.splice(index,1);

                return {
                    ...state,
                    basket: updatedBasket,
                    value: state.value - removedItem[0].price,
                };
            }
            else{
                console.warn(`cant remove product (id:${action.id}) as it is not in the basket`)
                return state;
            }

        case 'SET_USER':
            return{
                ...state,
                user:action.user
            }

        default:
            return state;
    }

}
export default reducer;
