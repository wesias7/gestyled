import React from 'react';
import styled from 'styled-components';
import withStyle from './Base';

const StyledCardActions = styled.div`
  padding: 8px;
  position: relative;
`;

const CardActions = props => <StyledCardActions {...props} />;

export default withStyle(CardActions);
