
import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { styled } from "nativewind";

import OpeningComponent from '@/components/openingsComponents/OpeningComponent'
import ClearOpeningsComponent from '@/components/openingsComponents/ClearOpeningsComponent';
import ConfirmDeletionComponent from '@/components/openingsComponents/ConfirmDeletionComponent';

import styles from "@/assets/styles/viewsStyles/openingViewsStyles/OpeningListViewStyles"

const SView = styled(View)
const SFlatList = styled(FlatList)

export default () => {

  const [openings, setOpenings] = useState([{
    _id: 1,
    userId: '1',
    month: 'july',
    minute: 32,
    year: 2024,
    hour: 12,
    day: 4,
  },
  {
    _id: 1,
    userId: '1',
    month: 'july',
    minute: 32,
    year: 2024,
    hour: 12,
    day: 4,
  }]);

  const [deletion, setDeletion] = useState('');
  
  const props1 = { deletion, setDeletion }

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