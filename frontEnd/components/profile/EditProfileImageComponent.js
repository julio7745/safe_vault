
import { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Image, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import updateProfileImage from '../../services/profileServices/updateProfileImage';

export default ({ user, editingImage, setEditingImage, setLoading, setProfileImage}) => {

  const [image, setImage] = useState();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true
    });
    if (!result.cancelled) {
      const uriParts = result.assets[0].uri.split('.');
      const imgExtension = uriParts[uriParts.length - 1];
  
      setImage({
        uri: result.assets[0].uri,
        base64: result.assets[0].base64,
        imgExtension
      });
    }
  };

  return editingImage === true ? (
    <View style={styles.EditProfileImageContainer}>
      <View style={styles.EditProfileImage}>
        <Text style={styles.Title} >New Profile Image</Text>
        { image && ( <Image 
            source={{ uri: image.uri }}
            style={styles.ImageUser} 
        />)}
        <TouchableWithoutFeedback onPress={pickImage}>
            <Text style={styles.Button}>Select Image</Text>
        </TouchableWithoutFeedback>
        { image && ( 
          <TouchableWithoutFeedback onPress={() => updateProfileImage({ user, setEditingImage, setLoading, image })}>
              <Text style={styles.Button}>Confirm</Text>
          </TouchableWithoutFeedback>
        )}
        <TouchableWithoutFeedback onPress={() => setEditingImage(false) }>
            <Text style={{...styles.Button, ...styles.Cancel}}>Cancel</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  ) : (<></>)

};

const styles = StyleSheet.create({
  EditProfileImageContainer:{
    position: 'absolute',
    width: '100%',
    height: '103%',
    backgroundColor: '#1b353b8a',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  EditProfileImage:{
    marginBottom: 60,
    width: '90%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderWidth: 1,
    borderColor: '#1b353b',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Title:{
    fontSize: 20,
    color: '#1b353b',
    fontWeight: '600',
    marginBottom: 5,
  },
  ImageUser: {
    height: 170,
    width: 170,
    borderRadius: 170,
    backgroundColor: '#1b353b',
    borderColor: '#ffffff',
    borderWidth: 2,
    margin: 10,
  },
  Button: {
    marginTop: 5,
    backgroundColor: '#305E69',
    padding: 10,
    color: "#ffffff",
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: '600'
  },
  Cancel: {
    backgroundColor: '#b10000',
  }
});
