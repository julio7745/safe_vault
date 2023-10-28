
import { StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';

import deleteOpening from '../../services/openings/deleteOpening';
import clearOpenings from '../../services/openings/clearOpenings';


export default ({setDeletion, user, setloading, setCurrentPage, deletion}) => {

  return (
    <View style={styles.ConfirmDeletionContainer}>
      <View style={styles.ConfirmDeletionDiv}>
        {
          deletion !== 'all' && <Text>Are you sure you want to delete this opening forever? That's a long time!</Text>
        }
        {
          deletion === 'all' && <Text>Are you sure you want to delete all opening forever? That's a long time!</Text>
        }
        <View style={styles.ConfirmDeletionBtnContainer}>
          <TouchableWithoutFeedback
            onPress={()=> {
              if (deletion === 'all') {
                clearOpenings({user, setCurrentPage, setloading, setDeletion})
              } else {
                deleteOpening({user, setCurrentPage, setloading, setDeletion, openingId: deletion})
              }
            }}>
            <Text style={styles.ConfirmDeletionBtn} >CONFIRM</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback 
            onPress={()=>setDeletion('')}>
              <Text style={styles.ConfirmDeletionBtn} >CANCEL</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  ConfirmDeletionContainer:{
    position: 'absolute',
    width: '100%',
    height: '103%',
    backgroundColor: '#1b353b8a',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ConfirmDeletionDiv:{
    marginBottom: 60,
    width: '90%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderWidth: 1,
    borderColor: '#1b353b',
  },
  ConfirmDeletionBtnContainer:{
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  ConfirmDeletionBtn:{
    width: 100,
    padding: 5,
    margin: 5, 
    textAlign: 'center',
    backgroundColor: '#305E69',
    color: '#ffffff',
    fontWeight: 'bold',
    letterSpacing: 1.1,
  }
});
