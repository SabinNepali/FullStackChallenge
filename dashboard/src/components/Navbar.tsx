import React from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";


const Navbar: React.FC = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    alert("Click on details icon inside action column to view findings for the selected security scan.");
  };
  return (
    <Menu fixed="top">
      <Menu.Item header as={NavLink} exact to="/home" activeClassName="active">Security Scanner</Menu.Item>
      <Menu.Item as={NavLink} exact to="/submit" activeClassName="active">
        Submit Result
      </Menu.Item>
      <Menu.Item as={NavLink} exact to="/display" activeClassName="active">
        Security Scan List
      </Menu.Item>
      <Menu.Item as={NavLink} exact to="/findings" activeClassName="active" onClick={handleClick}>
        Findings Display
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
