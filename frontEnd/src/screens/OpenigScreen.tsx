import React from 'react';

import OpeningListView from '@/views/openingsViews/OpeningListView';

import HeaderComponent from '@/components/commonComponents/HeaderComponent';
import NavBarComponent from '@/components/commonComponents/NavBarComponent';

const RenderView = () =>  <OpeningListView />

export default () => {
  return (
    <>
      <HeaderComponent />
      <RenderView />
      <NavBarComponent />
    </>
  );
}
