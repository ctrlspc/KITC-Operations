const projectManaReducerDefaultState = [];

export default (state = projectManaReducerDefaultState, action) => {
  switch (action.type){
    case 'SET_PROJECT_MANAGERS':
      return action.projectManagers;
    default:
      return state;
  };
};