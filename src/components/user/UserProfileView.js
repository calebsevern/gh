import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Actions from '../../actions/Actions';
import { Link } from 'react-router-dom';

class UserProfileView extends React.Component {
  componentDidMount() {
    const { match, getUser } = this.props;
    getUser(match.params.username);
  }

  renderUserProfile() {
    const { user } = this.props;
    if (!user) return null;

    return (
      <div className="user-profile">
        <img alt="prof-pic" src={user.avatar_url} />
        <div className="user-profile-name">{user.login}</div>
        <div className="user-profile-info">{user.bio}</div>
        <div className="user-profile-info">{user.location}</div>
        <div className="user-profile-info">{user.blog}</div>
      </div>
    );
  }

  renderUserRepos() {
    const { repos, user } = this.props;
    if (!repos) return null;

    const repoEls = repos.map(repo => (
      <div
        key={repo.id}
        className="user-repo-list-item"
      >
        <Link to={`/user/${user.login}/${repo.name}`}>
          <div className="repo-title">{repo.name}</div>
        </Link>
        <div className="repo-description">{repo.description}</div>
        <div className="repo-language">{repo.language}</div>
      </div>
    ));

    return (
      <div className="user-repos-list">
        {repoEls}
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderUserProfile()}
        {this.renderUserRepos()}
      </React.Fragment>
    );
  }
}

export default connect(
  (state, props) => {
    return {
      user: state.GitHubReducer.user,
      repos: state.GitHubReducer.repos,
    };
  },
  dispatch => bindActionCreators(Actions, dispatch),
)(UserProfileView);
