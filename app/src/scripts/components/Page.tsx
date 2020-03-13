import React from 'react';
import styled from 'styled-components';

import Loader from '~/scripts/components/Loader';

interface Props {
  isLoading: boolean;
  [key: string]: any;
}

const Page = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background-color: ${({ isLoading }: Props) => isLoading ? 'black' : 'white'};
  color: ${({ isLoading }: Props) => isLoading ? 'white' : 'black'};

  transition: all 0.232s ease-in;
`;

const PageWrapper = ({ isLoading, children, ...rest}: Props) => {
  if (isLoading)
    children = <Loader />
  
  return (
    <Page isLoading={isLoading} {...rest}>
      {children}
    </Page>
  )
};

export default PageWrapper;