import React from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <Menu fixed="top">
      <Menu.Item header as={NavLink} exact to="/home" activeClassName="active">Security Scanner</Menu.Item>
      <Menu.Item as={NavLink} exact to="/submit" activeClassName="active">
        Submit Result
      </Menu.Item>
      <Menu.Item as={NavLink} exact to="/display" activeClassName="active">
        Security Scan List
      </Menu.Item>
      <Menu.Item as={NavLink} exact to="/findings" activeClassName="active">
        Findings Display
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
