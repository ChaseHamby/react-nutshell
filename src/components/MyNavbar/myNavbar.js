import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import './myNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
  }
  
  state = {
    isOpen: false,
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { isAuthed, logoutClickEvent } = this.props; // equivalent of isAuthed = this.props.isAuthed
    const buildNavbar = () => {
      if (isAuthed) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to='/articles'><i class="far fa-newspaper fa-2x"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/events'><i class="far fa-calendar-alt fa-2x"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/friends'><i class="fas fa-user-friends fa-2x"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/messages'><i className="fas fa-comments fa-2x"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/weather'><i class="fas fa-bolt fa-2x"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={logoutClickEvent}><i class="fas fa-sign-out-alt fa-2x"></i></NavLink>
            </NavItem>
          </Nav>
        );
      }
      return <Nav className="ml-auto" navbar />;
    };

    return (
      <div className="my-navbar">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">React Nutshell</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
