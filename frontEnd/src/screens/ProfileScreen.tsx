
import React from 'react';

import ProfileView from '@/views/profileViews/ProfileView'

import HeaderComponent from '@/components/commonComponents/HeaderComponent';
import NavBarComponent from '@/components/commonComponents/NavBarComponent';

const RenderView = () =>  <ProfileView />

export default () => {
  return (
    <>
      <HeaderComponent />
      <RenderView />
      <NavBarComponent />
    </>
  );
}
