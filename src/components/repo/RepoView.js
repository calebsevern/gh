import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Actions from '../../actions/Actions';
import { Link } from 'react-router-dom';

class RepoView extends React.Component {
  componentDidMount() {
    const { match, getUser } = this.props;
    getUser(match.params.username);
  }

  componentDidUpdate(prevProps, prevState) {
    const { repo, repos, match, getRepo } = this.props;
    const repoChanged = repo ? repo.name !== match.params.reponame : false;
    if (repos && (!repo || repoChanged)) {
      repos.forEach((userRepo) => {
        if (userRepo.name === match.params.reponame) {
          return getRepo(userRepo.url);
        }
      });
    }
  }

  renderLanguages() {
    const { repo } = this.props;
    if (!repo || !repo.languages) return null;

    return Object.keys(repo.languages).map(key => (
      <div
        key={key}
      >
        {key}: {repo.languages[key]} bytes
      </div>
    ));
  }

  renderReadme() {
    const { repo } = this.props;
    if (!repo || !repo.readme) return (<div>No Readme found.</div>);

    return (
      <div>
        <b>Readme</b>
        <p>{atob(repo.readme.content)}</p>
      </div>
    );
  }

  render() {
    const { user, repo } = this.props;
    if (!user || !repo) return null;

    return (
      <div className="user-repo-underlay">
        <div className="user-repo">
          <h1>{repo.name}</h1>
          <div>Watchers: {repo.watchers_count}</div>
          <div>Stargazers: {repo.stargazers_count}</div>
          <br />
          {this.renderLanguages()}
          <br />
          <br />
          {this.renderReadme()}
          <Link to={`/user/${user.login}/`} className="user-repo-exit">
            Close
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    return {
      user: state.GitHubReducer.user,
      repos: state.GitHubReducer.repos,
      repo: state.GitHubReducer.repo,
    };
  },
  dispatch => bindActionCreators(Actions, dispatch),
)(RepoView);
