export const initialStore = () => {
  return {
    message: null,
    favorites: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "ADD_FAVORITE":
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };

    case "REMOVE_FAVORITE":
      return {
        ...store,
        favorites: store.favorites.filter(
          fav =>
            fav.uid !== action.payload.uid ||
            fav.type !== action.payload.type
        )
      };

    default:
      throw Error("Unknown action: " + action.type); // Para debug más claro
  }
}
