// actions.js
export const fetchData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      dispatch({ type: "SET_DATA", payload: data });
    } catch (error) {
      console.error(error);
    }
  };
};
