import { View, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const CameraPreview = ({ photo, retakePicture }) => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => retakePicture()}
            style={{
              alignSelf: 'flex-start',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}
          >
            <Ionicons name="trash" style={{ color: 'white', fontSize: 40 }} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CameraPreview;
