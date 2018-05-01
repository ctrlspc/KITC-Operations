import React from 'react';
import _ from 'lodash';

export default (props) => (
  <div>
    {
      _.isEmpty(props.team)? 
      (
        <p>Your project is kinda lonley - select a team to work on it!</p>
      ) : (
        <ul>
          {_.map(props.team, (name, key) => <li key={key}>{name}</li>)}
        </ul>
      )
    }
  </div>
);