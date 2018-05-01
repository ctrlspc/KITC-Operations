import React from 'react';
import _ from 'lodash';
import Checkbox from 'rc-checkbox';

export default class ProjectTeamForm extends React.Component {
 
  constructor(props) {
    super(props)
    const selectedUsers = props.team || [];
    this.state = {
      error: false,
      selectedUsers
    };
  };

  onCheckBoxChange = (event) => {
const checkBox = event.target;
    if (checkBox.checked) {
      if (!_.includes(this.state.selectedUsers, checkBox.name )) {
        this.setState(() => ({selectedUsers: _.concat(this.state.selectedUsers, checkBox.name)}));
      }
    } else {
      const selectedUsers = this.state.selectedUsers.filter((user) => user !== checkBox.name)
      this.setState(() => ({selectedUsers}));
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.selectedUsers);
  }

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p> }
        {
          this.props.users.map((user) => (
            <label className="label" key={user.uid}>
              <input
                className="checkbox-input"
                type="checkbox" 
                name={user.uid} 
                checked={_.includes(this.state.selectedUsers, user.uid)}
                onChange={this.onCheckBoxChange}/>
              {user.displayName}
            </label>
          ))
        }
        <div className="form__section">
          <button className="button">Save Team</button>
        </div>
      </form>
    );
  };
};