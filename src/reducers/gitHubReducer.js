import Constants from '../actions/Constants.js';

const initialState = {
  endpoints: {
    user_url: 'https://api.github.com/users/{user}',
  },
  user: null,
  repos: null,
  repo: null,
}

function GitHubReducer (state = initialState, action) {
  const newState = Object.assign({}, state);

  if (action.type === Constants.RECEIVE_API_ENDPOINTS) {
    newState.endpoints = action.endpoints;
  }

  if (action.type === Constants.RECEIVE_USER) {
    newState.user = action.user;
  }

  if (action.type === Constants.RECEIVE_REPOS) {
    newState.repos = action.repos;
  }

  if (action.type === Constants.RECEIVE_REPO) {
    newState.repo = action.repo;
  }

  return Object.assign({}, state, newState);
}

export default GitHubReducer;
