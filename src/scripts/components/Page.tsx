import React from 'react';
import styled from 'styled-components';
import Loader from '~scripts/components/Loader';

interface PageProps {
  isLoading: boolean;
  [key: string]: any;
}

const Page = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background-color: ${({ isLoading }: PageProps) => isLoading ? 'black' : 'white'};
  color: ${({ isLoading }: PageProps) => isLoading ? 'white' : 'black'};

  transition: background-color 0.232s ease-in,
              color 0.232s ease-in;
`;

export default ({ isLoading, children, ...rest}: PageProps) => {
  if (isLoading)
    children = <Loader />

  return (
    <Page isLoading={isLoading} {...rest}>
      {children}
    </Page>
  )
};
