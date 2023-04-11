import React, { Component } from 'react';
import Identicon from 'identicon.js';
import photo from '../encrypted.png'
import './Navbar.css';
class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={photo} width="30" height="30" className="d-inline-block align-top" alt="" />
          &nbsp;Digital Evidence Storage System
                
        </a>

        
        <a class="navbar-brand link-small" aria-current="page" href="#">Add Evidence</a>
        <a class="navbar-brand link-small" href="#">Remove Evidence</a>
        <a class="navbar-brand link-small" href="#">Transfer Evidence</a>
        <a class="navbar-brand link-small" href="#">View Evidence Info</a>
        <a class="navbar-brand link-small" href="#">View Evidence</a>


        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
            { this.props.account
              ? <img
                // className='ml-2'
                // width='30'
                // height='30'
                // src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
              />
              : <span></span>
            }
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;