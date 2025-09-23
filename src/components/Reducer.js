export const initialState = {
    basket: [],
    value: 0,
    user: null,
    productLists : [
    {
      id: "495630040",
      title: "Art Forms in Nature by Ernst Haeckel .The Kindle Edition",
      price: 1499,
      image: "https://m.media-amazon.com/images/I/81YJl7eRp+L._AC_UY327_FMwebp_QL65_.jpg",
      rating: 5
    },
    {
      id: "455630041",
      title: "Amazon Echo Dot (5th Gen) | Smart speaker with Bigger sound...",
      price: 5499,
      image: "https://m.media-amazon.com/images/I/81lGxS2ZisL._AC_UY327_FMwebp_QL65_.jpg",
      rating: 4
    },
    {
      id: "23564982157",
      title: "AKLAM Women Embroidery Lace & Sequence Embroidery Chiffon Saree",
      price: 2149,
      image: "https://m.media-amazon.com/images/I/71ENdVjP63L._SY550_.jpg",
      rating: 3
    },
    {
      id: "23564982144",
      title: "Apple iPad Air 11″ with M3 chip: Liquid Retina Display, 256GB...",
      price: 67990,
      image: "https://m.media-amazon.com/images/I/71jWCM3KVYL._SX425_.jpg",
      rating: 5
    },
    {
      id: "23564982145",
      title: "Venzina® Mens Lightweight Athletic Jacket Stylish Full Zip Hoodie, Waterproof",
      price: 1999,
      image: "https://m.media-amazon.com/images/I/51Ko2vfkW1L._AC_UL480_FMwebp_QL65_.jpg",
      rating: 5
    },
    {
      id: "23564982146",
      title: "American Tourister Liftoff+ with TSA Lock & 8 Wheel, 79 CM Large Hard PP Suitcase",
      price: 3799,
      image: "https://m.media-amazon.com/images/I/41bAQ3Gg--L._AC_UL480_FMwebp_QL65_.jpg",
      rating: 5
    },
    {
      id: "23564982167",
      title: "ASICS Mens Gel-Contend B+ Lake Drive/Pure Silver Running Shoes",
      price: 2149,
      image: "https://m.media-amazon.com/images/G/31/img21/shoes/February/SS21/SPW/Iconic/5._SS400_QL85_.jpg",
      rating: 4
    },
    {
      id: "4954386850",
      title: "VW 101 cm (40 inches) Playwall Frameless Series Full HD Android Smart LED TV",
      price: 11999,
      image: "https://m.media-amazon.com/images/I/81kcbyP-SXL._AC_UY327_FMwebp_QL65_.jpg",
      rating: 4
    }
  ]
};

export const getBasketTotal = ({ basket }) => {
    return basket?.reduce((total, item) => total + item.price, 0);
}

const reducer = (state, action) => {

    switch (action.type) {
        case 'ADD_TO_BASKET':
            if (!action.item || !action.item.id) {
                console.warn('Attempted to add invalid item to basket:', action.item);
                return state;
            }
            return {
                ...state,
                basket: [...state.basket, action.item],
                value: state.value + action.item.price,
            };

        case 'ADD_ITEM':
            return{
                ...state,
                productLists:[...state.productLists, action.item]   
            }

        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }

        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (item) => item.id === action.id
            )

            if (index >= 0) {
                let updatedBasket = [...state.basket];
                const removedItem = updatedBasket.splice(index, 1);

                return {
                    ...state,
                    basket: updatedBasket,
                    value: state.value - (removedItem[0].price * removedItem[0].quantity),
                };
            }
            else {
                console.warn(`cant remove product (id:${action.id}) as it is not in the basket`)
                return state;
            }

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }

        case 'UPDATE_QUANTITY':

            const updatedBasket = state.basket.map(item =>
                item.id === action.id ? { ...item, quantity: action.quantity } : item
            );

            // Calculate new total value
            const newValue = updatedBasket.reduce(
                (total, item) => total + item.price * item.quantity,0
            );

            return {
                ...state,
                basket: updatedBasket,
                value: newValue
            };
        default:
            return state;
    }

}
export default reducer;
