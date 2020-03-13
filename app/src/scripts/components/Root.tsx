import React, {
  useState,
} from 'react';
import Page from '~/scripts/components/Page';

const Root = () => {

  // const [isLoading, setLoading] = useState(true);
  const [isLoading] = useState(true);

  return (
    <Page isLoading={isLoading}>
      <h1>TODO: </h1>
      <h2>Render animation!</h2>
    </Page>
  );
}

export default Root;
