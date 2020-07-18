
import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

interface IProps {
  children: any
}

export default function AuthLayout({ children }: IProps) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}

AuthLayout.prototype = {
  children: PropTypes.element.isRequired,
};
