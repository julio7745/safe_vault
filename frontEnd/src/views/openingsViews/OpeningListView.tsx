
import { useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { styled } from "nativewind";

import LoadOpenigsHook from '@/hooks/openigHooks/LoadOpenigsHook';

import OpeningComponent from '@/components/openingsComponents/OpeningComponent'
import ClearOpeningsComponent from '@/components/openingsComponents/ClearOpeningsComponent';
import ConfirmDeletionComponent from '@/components/openingsComponents/ConfirmDeletionComponent';

import styles from "@/assets/styles/viewsStyles/openingViewsStyles/OpeningListViewStyles"

const SView = styled(View)
const SFlatList = styled(FlatList)

interface openingInterface {
  _id: string
	name: string,
	lastName: string,
	month: string,
	minute: number,
	year: number,
	hour: number,
	day: number,
  empty?: boolean,
  profileImage?: string 
  profileImageExtension?: string 
}

interface ProfileImages {
  [key: string]: {
    profileImage: string;
    profileImageExtension: string;
  };
}

export default () => {

  const [openings, setOpenings] = useState<openingInterface[]>([]);
  const [profileImages, setProfileImages] = useState<ProfileImages>([]);
  const [deletion, setDeletion] = useState<string>('');
  
  const LoadOpenigsService = LoadOpenigsHook()
  
  const fetchData = async () => {
    LoadOpenigsService.LoadOpenigsService({setOpenings, setProfileImages})
  };

  const props1 = { deletion, setDeletion, fetchData}

  useEffect(() => {

    fetchData() 

  }, [])

  const itemComponent = useCallback((item: openingInterface) => {
    if (item.empty) {
      return <SView className={styles.paddingItem} />;
    } else {
      return <OpeningComponent {...{ opening: item, profileImages, ...props1 }} />;
    }
  }, [profileImages, openings]);
  
  if (openings) return (
    <SView className={styles.containOpening}>
      <SFlatList
        data={[...openings, { empty: true }]}
        className={styles.listOpening}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => itemComponent(item as openingInterface)}
        removeClippedSubviews={false}
      />
  
      <ClearOpeningsComponent {...props1} />
      <ConfirmDeletionComponent {...props1} />
    </SView>
  )
  else return <SView className={styles.containOpening}>Loading...</SView>
  
};