import React from 'react';
import styled from 'styled-components';

interface PageProps {
  isLoading: boolean;
  [key: string]: any;
}

const PageWrapper = styled.section`
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

const Loader = () => <span>...pitching, and moaning...</span>;

const Page = ({ isLoading, children, ...rest}: PageProps) => {
  if (isLoading)
    children = <Loader />

  return (
    <PageWrapper isLoading={isLoading} {...rest}>
      {children}
    </PageWrapper>
  )
};

export default Page;
