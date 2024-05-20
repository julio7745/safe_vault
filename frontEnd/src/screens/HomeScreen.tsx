
import React from 'react';

import GenerateKeyView from '@/views/homeViews/GenerateKeyView'
import InsertKeyView from '@/views/homeViews/InsertKeyView'
import InsertFingerprintView from '@/views/homeViews/InsertFingerprintView';
import WaitingOpeningView from '@/views/homeViews/WaitingOpeningView';

import HeaderComponent from '@/components/commonComponents/HeaderComponent';
import NavBarComponent from '@/components/commonComponents/NavBarComponent';

const RenderView = () =>  <WaitingOpeningView />

export default () => {
  return (
    <>
      <HeaderComponent />
      <RenderView />
      <NavBarComponent />
    </>
  );
}