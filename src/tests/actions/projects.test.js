import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { setProjects, 
  startSetProjects, 
  addProject, 
  updateProject, 
  startAddProject, 
  startUpdateProject } from '../../actions/projects';
import projects from '../fixtures/projects';
import users from '../fixtures/users';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const projectsData = {};
  projects.forEach(({id, title, description, projectManager, projectType, team}) => {
    projectsData[id] = {title, description, projectManager, projectType, team};
  });  
  database.ref(`projects`).set(projectsData).then(() => done());
});

test('should create a SET_PROJECTS action object', () => {
  const action = setProjects(projects);
  expect(action).toEqual({
    type:'SET_PROJECTS',
    projects
  });
});

test('should fetch the projects from firebase', (done) => {
  const store = createMockStore();
  store.dispatch(startSetProjects()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type:'SET_PROJECTS',
      projects
    });
    done();
  });
});


// test('should create a ADD_PROJECT action object', () => {
//   const action = addProject(projects[0]);
//   expect(action).toEqual({
//     type:'ADD_PROJECT',
//     project: projects[0]
//   });
// });

// test('should add project to database and store', (done) => {
//   const store = createMockStore();
//   const projectData = {
//     title:'add test',
//     description:'a project on test',
//     projectManager:users[1],
//     projectType:'ext'
//   };

//   store.dispatch(startAddProject(projectData)).then((projectID) => {
//     expect(projectID).toEqual(expect.any(String));
//     const actions = store.getActions();
//     expect(actions[0]).toEqual({
//       type:'ADD_PROJECT',
//       project:{
//         id:expect.any(String),
//         ...projectData
//       }
//     });

//     return database.ref(`projects/${actions[0].project.id}`).once('value')
//   })
//   .then((snapshot) => {
//     expect(snapshot.val()).toEqual(projectData);
//     done();
//   });

// });

// test('should create a UPDATE_PROJECTS action object', () => {
//   const action = updateProject(projects[0].id, projects[0]);
//   expect(action).toEqual({
//     type: 'UPDATE_PROJECT',
//     id: projects[0].id,
//     updates: projects[0]
//   });
// });

// test('should update the project in firebase', (done) => {
//   const updates = {
//     title: 'an updated title',
//     description: 'an updated description',
//     projectManager: users[2],
//     projectType: 'ext'
//   };
//   const store = createMockStore();
//   const id = projects[0].id

//   store.dispatch(startUpdateProject(id , updates)).then(() => {
//     const actions = store.getActions();
//     expect(actions[0]).toEqual({
//       type:'UPDATE_PROJECT',
//       id,
//       updates
//     });
//     return database.ref(`projects/${id}`).once('value');
//   })
//   .then((snapshot) => {
//     expect(snapshot.val()).toEqual(updates);
//     done();
//   });
// });