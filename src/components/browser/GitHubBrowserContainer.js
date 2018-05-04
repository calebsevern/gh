import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Actions from '../../actions/Actions';
import { BrowserRouter, Route } from 'react-router-dom';
import GitHubSearchView from './GitHubSearchView.js';
import UserProfileView from '../user/UserProfileView.js';
import RepoView from '../repo/RepoView.js';
import './GitHubBrowser.css';

class GitHubBrowserContainer extends React.Component {
  componentDidMount() {
    const { getAPIEndpoints } = this.props;
    getAPIEndpoints();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="github-browser">
          <Route exact path="/" component={GitHubSearchView} />
          <Route path="/user/:username" component={UserProfileView} />
          <Route path="/user/:username/:reponame" component={RepoView} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  (state, props) => {
    return {
      endpoints: state.GitHubReducer.endpoints,
    };
  },
  dispatch => bindActionCreators(Actions, dispatch),
)(GitHubBrowserContainer);
