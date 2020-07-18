
import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

interface IProps {
  children: any
}

export default function DefaultLayout({ children }: IProps) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}

DefaultLayout.prototype = {
  children: PropTypes.element.isRequired,
};
