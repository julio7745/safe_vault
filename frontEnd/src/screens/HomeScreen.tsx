
import React from 'react';
import { useState } from 'react';

import GenerateKeyView from '@/views/homeViews/GenerateKeyView'
import InsertKeyView from '@/views/homeViews/InsertKeyView'
import InsertFingerprintView from '@/views/homeViews/InsertFingerprintView';
import WaitingOpeningView from '@/views/homeViews/WaitingOpeningView';

import HeaderComponent from '@/components/commonComponents/HeaderComponent';
import NavBarComponent from '@/components/commonComponents/NavBarComponent';

export default () => {

  const [cancelOpeningVisible, setCancelOpeningVisible] = useState(false);

  const props1 = { cancelOpeningVisible, setCancelOpeningVisible }

  const RenderView = () =>  {
    const currentPage:string = 'GenerateKeyView'
    switch (currentPage) {
      case 'GenerateKeyView':
        return <GenerateKeyView />;
      case 'InsertKeyView':
        return <InsertKeyView { ...props1 } />;
      case 'InsertFingerprintView':
        return <InsertFingerprintView { ...props1 } />;
      case 'WaitingOpeningView':
        return <WaitingOpeningView { ...props1 } />;
      default:
        return <GenerateKeyView />;
    } 
  }

  return (
    <>
      <HeaderComponent/>
      <RenderView/>
      <NavBarComponent />
    </>
  );
}