import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import {StatusBar} from 'expo-status-bar';

import React from 'react';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import logo from './assets/logo.png';

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({localUri: pickerResult.uri});
  }

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  let renderImage = () => {
    if (selectedImage !== null) {
      return <View>
        <Image source={{uri: selectedImage.localUri}} style={styles.thumbnail}/>
        <Button title="Share this photo" onPress={openShareDialogAsync}/>
      </View>
    } else {
      return <Image source={logo} style={styles.logo}/>
    }
  }

  return (
      <View style={styles.container}>
        {renderImage()}
        <Text style={styles.instructions}>
          To share a photo from your phone with a friend, just press the button below!
        </Text>
        <StatusBar style="auto"/>

        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
          <Text style={styles.buttonText}>Pick a photo</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});
