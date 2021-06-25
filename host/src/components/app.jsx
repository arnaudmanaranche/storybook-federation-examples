import React, { Suspense } from 'react';

import federatedComponent from './federated-component';

const Title = federatedComponent('storybookRemote', './Title');

export default function App() {
  return (
    <Suspense fallback="">
      <Title text="Hello World" />
    </Suspense>
  );
}
