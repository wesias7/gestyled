import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Paper from './Paper';
import Title from './Title';

const StyledNavbar = styled(Paper)`
    width: 100%;
    padding: 12px 24px;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primaryText};
    font-size: ${props => props.theme.fontSizes[3]}px;
    display: flex;
    align-items: center;
    justify-content; center;
    z-index: 1000;
`;

const StyledNavbarTitle = styled.div`
  flex: 1 1 0;
  padding-left: ${props => (props.left ? '24px' : '')};
`;

/**
 * See Paper component for additional props
 */
const Navbar = props =>
  <StyledNavbar {...props}>
    {props.left}
    <StyledNavbarTitle left={props.left}>
      {props.title}
    </StyledNavbarTitle>
    {props.right}
  </StyledNavbar>;

Navbar.propTypes = {
  /** Element to display in the middle */
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /** Element to display on the right */
  right: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /** Element to display on the left */
  left: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
};

export default Navbar;