import {Link} from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/iam';


export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <img src="/images/kitc-logo.png" alt="The KITC Logo"/>
        </Link>
        <button className="button button--link" onClick={startLogout}>Logout</button>
      </div>
    </div>
    
  </header>
 );


 export const mapDispatchToProps = (dispatch) => ({
   startLogout: () => dispatch(startLogout())
 })
 export default connect(undefined, mapDispatchToProps)(Header);