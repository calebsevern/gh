import axios from 'axios';
import Constants from './Constants.js';
const gitHubUrl = 'https://api.github.com';
const accessParam = '?access_token=9833afb1ea0853af7135ec5116bc46ae06137471';

const receiveAPIEndpoints = (endpoints) => ({
  type: Constants.RECEIVE_API_ENDPOINTS,
  endpoints,
});

const getAPIEndpoints = (id) => {
  return (dispatch, getState) => {
    return axios.get(gitHubUrl + accessParam).then((response) => {
      dispatch(receiveAPIEndpoints(response.data));
    }).catch((err) => {
      console.log('Error fetching API endpoints', err);
    });
  }
}

const receiveRepos = (repos) => ({
  type: Constants.RECEIVE_REPOS,
  repos,
});

const requestRepos = (url) => {
  return (dispatch, getState) => {
    return axios.get(url + accessParam).then((response) => {
      dispatch(receiveRepos(response.data));
    }).catch((err) => {
      console.log('Error fetching repos', err);
    });
  };
}

const receiveUser = (user) => ({
  type: Constants.RECEIVE_USER,
  user,
});

const getUser = (username) => {
  return (dispatch, getState) => {
    const { GitHubReducer } = getState();
    const { endpoints } = GitHubReducer;
    const searchUrl = endpoints.user_url.replace('{user}', username);
    return axios.get(searchUrl + accessParam).then((response) => {
      dispatch(receiveUser(response.data));
      dispatch(requestRepos(response.data.repos_url));
    }).catch((err) => {
      console.log('Error fetching user data', err);
    });
  }
}

const receiveRepo = (repo) => ({
  type: Constants.RECEIVE_REPO,
  repo,
});

const getRepo = (url) => {
  let repo = {};
  return (dispatch, getState) => {
    return axios.get(url + accessParam).then((response) => {
      repo = response.data;
      return axios.get(response.data.languages_url + accessParam).then((response) => {
        repo.languages = response.data;
        return axios.get(`${repo.url}/readme${accessParam}`).then((response) => {
          repo.readme = response.data;
          dispatch(receiveRepo(repo));
        }).catch((err) => {
          // No readme
          dispatch(receiveRepo(repo));
        });
      });
    }).catch((err) => {
      console.log('Error fetching repo data', err);
    });
  }
}

export default {
  getAPIEndpoints,
  getUser,
  getRepo,
};
