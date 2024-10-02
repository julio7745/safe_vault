
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { styled } from "nativewind";

import HttpRequestHook from '@/hooks/commonHooks/HttpRequestHook';

import OpeningComponent from '@/components/openingsComponents/OpeningComponent'
import ClearOpeningsComponent from '@/components/openingsComponents/ClearOpeningsComponent';
import ConfirmDeletionComponent from '@/components/openingsComponents/ConfirmDeletionComponent';

import styles from "@/assets/styles/viewsStyles/openingViewsStyles/OpeningListViewStyles"

const SView = styled(View)
const SFlatList = styled(FlatList)

interface openingInterface {
	name: string,
	lastName: string,
	month: string,
	minute: number,
	year: number,
	hour: number,
	day: number,
  empty? :boolean
}

export default () => {

  const [openings, setOpenings] = useState<openingInterface[]>([]);

  const [deletion, setDeletion] = useState('');
  
  const props1 = { deletion, setDeletion }

  const HttpRequestService = HttpRequestHook()

  const getCollection = async () => {
    await HttpRequestService.get('opening/getAll')
    .then(response => {
      setOpenings(response.data.list)
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      getCollection()
    };
    fetchData() 
  }, [])
  

  return (
    <SView className={styles.containOpening}>

      <SFlatList
        data={[{ empty: true }, ...openings].reverse()}
        className={styles.listOpening}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          if (item.empty) {
            return <SView className={styles.paddingItem} />;
          } else {
            return <OpeningComponent { ...{ opening: item, ...props1 }} />;
          }
        }}
      />
    
      <ClearOpeningsComponent {...props1} />
      <ConfirmDeletionComponent {...props1} />
    </SView>
  );    
  
};