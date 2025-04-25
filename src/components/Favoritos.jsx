export function toggleFavorite(item, type, store, dispatch) {
    const exists = store.favorites.some(
        (fav) => fav.uid === item.uid && fav.type === type
    );

    const payload = { ...item, type };

    if (exists) {
        dispatch({ type: "REMOVE_FAVORITE", payload });
    } else {
        dispatch({ type: "ADD_FAVORITE", payload });
    }
}

export function removeFavorite(item, dispatch) {
    dispatch({ type: "REMOVE_FAVORITE", payload:item });
}