
import React from 'react';

import OptionsView from '@/views/optionsViews/OptionsView';

import HeaderComponent from '@/components/commonComponents/HeaderComponent';
import NavBarComponent from '@/components/commonComponents/NavBarComponent';

const RenderView = () =>  <OptionsView />

export default () => {
  return (
    <>
      <HeaderComponent />
      <RenderView />
      <NavBarComponent />
    </>
  );
}