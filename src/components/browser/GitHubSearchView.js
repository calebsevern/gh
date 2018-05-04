import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Actions from '../../actions/Actions';

class GitHubSearchView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  onChangeUserName(e) {
    this.setState({ username: e.target.value });
  }

  onClickSubmit() {
    const { username } = this.state;
    const { history } = this.props;
    history.push(`/user/${username}`);
  }

  render() {
    const { username } = this.state;

    return (
      <React.Fragment>
        <h1>User search</h1>
        <input
          type="text"
          value={username}
          onChange={this.onChangeUserName}
        />
        <button
          onClick={this.onClickSubmit}
        >
          Search User
        </button>
      </React.Fragment>
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
)(GitHubSearchView);
