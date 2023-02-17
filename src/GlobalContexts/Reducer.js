export const reducer =(state,action)=>{
    switch(action.type){
        case 'FETCH_USER_PROFILE':
            return{
                ...state,
                userProfile:action.payload
            } 
        default:
            return {...state}
    }
}