import { useState } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video, ResizeMode } from 'expo-av';

export default function VideoPickerExample() {
  const [videoUri, setVideoUri] = useState<string | null>(null);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
    }
  };
  console.log(videoUri)
  return (
    <View style={styles.container}>
      <Button title="Pick a video from gallery" onPress={pickVideo} />
      
      {videoUri && (
        <Video
          source={{ uri: videoUri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          useNativeControls
          style={styles.video}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: 300,
    height: 200,
    marginTop: 20,
  },
});
