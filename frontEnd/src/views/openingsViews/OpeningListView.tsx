
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
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

export default () => {

  const [openings, setOpenings] = useState<openingInterface[]>([]);
  const [deletion, setDeletion] = useState<string>('');
  
  const LoadOpenigsService = LoadOpenigsHook()
  
  const fetchData = async () => {
    LoadOpenigsService.LoadOpenigsService({setOpenings})
  };

  const props1 = { deletion, setDeletion, fetchData}

  useEffect(() => {

    fetchData() 

  }, [])

  return (
    <SView className={styles.containOpening}>

      <SFlatList
        data={[ ...openings, { empty: true } ]}
        className={styles.listOpening}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          if ((item as openingInterface).empty) {
            return <SView className={styles.paddingItem} />;
          } else {
            return <OpeningComponent { ...{ opening: item as openingInterface, ...props1 }} />;
          }
        }}
      />
    
      <ClearOpeningsComponent {...props1} />
      <ConfirmDeletionComponent {...props1} />
    </SView>
  );    
  
};