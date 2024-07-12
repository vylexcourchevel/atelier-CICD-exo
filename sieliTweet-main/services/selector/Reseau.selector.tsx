export const getUser = (state: any) => {
    console.log(state.Reseau.data);

    return state.Reseau.data ;
}
export const getidUser = (state: any) => {

    return state.Reseau.data._id ;
}