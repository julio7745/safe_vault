
import { useState } from 'react';
import { FlatList, View} from 'react-native';
import { styled } from "nativewind";

import OptionComponent from '@/components/optionsComponents/OptionComponent';
import LogoutComponent from '@/components/optionsComponents/LogoutComponent';

import styles from "@/assets/styles/viewsStyles/optionsViewsStyles/optionsViewsStyles"

const SFlatList = styled(FlatList)
const SView = styled(View)

export default () => {
  
  const [logoutVisible, setLogoutVisible] = useState(false);

  const pages = [
    { name: "new user", function: setLogoutVisible },
    { name: "logout", function: () => setLogoutVisible(true) },
  ]

  const props1 = { logoutVisible, setLogoutVisible }

  return (
    <SView className={styles.container}>
      <SFlatList
          data={pages}
          className={styles.listPages}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <OptionComponent { ...{ page: item }} />
          )}
        />
        <LogoutComponent { ...props1 } />
    </SView>
  );    
  
};