import React from 'react';
import styled from 'styled-components';
import { darken, transparentize } from 'polished';
import withStyle from './Base';
import PropTypes from 'prop-types';
import LabeledContainer from './LabeledContainer';
import Paper from './Paper';

const StyledTabs = withStyle(styled(Paper)`
  display: flex;
  white-space: nowrap;
  background-color: ${props => props.bg};
  width: 100%;
`);

const StyledTabButton = withStyle(styled.button.attrs({
  type: 'button'
})`
    box-sizing: border-box;
    border: 10px;
    height: 48px;
    outline: none;
    background: none;
    cursor: pointer;
    color: ${props =>
      props.active ? props.color : transparentize(0.5, props.color)};
    font-size: ${props => props.theme.fontSizes[1]}px;
    font-weight: ${props => props.theme.fontWeights[1]};
    display: inline-block;
    width: ${props => props.width * 100}%;
    shadow-box: none;
    border-radius: 0;
    border-bottom: ${props =>
      props.active ? `4px solid ${props.activeColor}` : ''};

    &:hover {
        background-color: ${props => darken(0.08, props.bg)};
    }
`);

class Tabs extends React.Component {
  static propTypes = {
    /** Array of LabeledContainers */
    children: PropTypes.arrayOf(
      (propValue, key, componentName, location, propFullName) => {
        if (!propValue[key].props.hasOwnProperty('label')) {
          return new Error(
            'Invalid prop `' +
              propFullName +
              '` supplied to' +
              ' `' +
              componentName +
              '`. Validation failed. Child components need a label prop.'
          );
        }
      }
    ),
    /** activate a specific tab, otherwise the first one will be opened */
    active: PropTypes.number,
    /** Background color */
    bg: PropTypes.string,
    /** Text color */
    color: PropTypes.string,
    /** Indicator color of active element */
    activeColor: PropTypes.string,
    /** shadow level from Paper component */
    level: PropTypes.number,
    /** Called when the selected value changes */
    onChange: PropTypes.func
  };
  static defaultProps = {
    active: 0,
    bg: 'lightgrey',
    color: 'black',
    activeColor: 'dimgrey',
    level: -1,
    onChange: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    };
  }
  onChangeActive = (e, i) => {
    this.setState({
      active: i
    });
    this.props.onChange(e, i);
  };
  render() {
    const { children, color, activeColor, bg, ...props } = this.props;
    const tabWidth = 1 / children.length;
    const tabButtons = children.map((child, i) =>
      <StyledTabButton
        key={i}
        color={color}
        bg={bg}
        activeColor={activeColor}
        active={i === this.state.active}
        width={tabWidth}
        onClick={e => this.onChangeActive(e, i)}
      >
        {child.props.label}
      </StyledTabButton>
    );
    return (
      <div>
        <StyledTabs {...props} bg={bg}>
          {tabButtons}
        </StyledTabs>
        {children[this.state.active]}
      </div>
    );
  }
}

export default Tabs;
