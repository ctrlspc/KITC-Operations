const projectManaReducerDefaultState = [];

export default (state = projectManaReducerDefaultState, action) => {
  switch (action.type){
    case 'SET_USERS':
      return action.users;
    default:
      return state;
  };
};