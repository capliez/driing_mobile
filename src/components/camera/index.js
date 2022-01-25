import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { usePermissions } from '@use-expo/permissions';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Mask from '../../../Mask';
import CameraPreview from '../../../viewImage';

const CameraCP = () => {
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState('');
  const [faces, setFaces] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);
  const [flashMode, setFlashMode] = React.useState('auto');

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const getPermissionAsync = async () => {
    // Camera roll Permission
    if (Platform.OS === 'ios') {
      const { status } = await usePermissions(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    // Camera Permission
    const { status } = await usePermissions(Permissions.CAMERA);
    setHasPermission(status === 'granted');
  };

  const handleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      setPreviewVisible(true);
      setCapturedImage(photo);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    setPreviewVisible(true);
    setCapturedImage(result);
  };

  const handleIt = async ({ faces, img }) => {
    setFaces(faces);
    // Code to post to API
  };

  const onFaceDetectionError = (error) => {
    console.log(error);
  };

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off');
    } else if (flashMode === 'off') {
      setFlashMode('on');
    } else {
      setFlashMode('off');
    }
  };

  if (hasPermission === null) {
    return (
      <View>
        {' '}
        <Text>yes</Text>
      </View>
    );
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      {previewVisible && capturedImage ? (
        <CameraPreview retakePicture={__retakePicture} photo={capturedImage} />
      ) : (
        <View style={{ flex: 1 }}>
          <Camera
            flashMode={flashMode}
            ref={(ref) => {
              cameraRef.current = ref;
            }}
            faceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.fast,
              detectLandmarks: FaceDetector.Constants.Landmarks.all,
              runClassifications: FaceDetector.Constants.Classifications.all,
              minDetectionInterval: 100,
              tracking: true,
            }}
            onFacesDetected={handleIt}
            onFacesDetectionError={onFaceDetectionError}
            style={{ flex: 1 }}
            type={cameraType}
          >
            {
              // For each face draw the mask
              faces.map((face) => (
                <Mask key={face.faceID} face={face} />
              ))
            }
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => pickImage()}
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}
              >
                <Ionicons
                  name="images"
                  style={{ color: '#fff', fontSize: 40 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={__handleFlashMode}
                style={{
                  position: 'absolute',
                  left: '5%',
                  top: '10%',
                  backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                  borderRadius: '50%',
                  height: 25,
                  width: 25,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                  }}
                >
                  ⚡️
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => takePicture()}
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}
              >
                <FontAwesome
                  name="camera"
                  style={{ color: '#fff', fontSize: 40 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleCameraType()}
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}
              >
                <MaterialCommunityIcons
                  name="camera-switch"
                  style={{ color: '#fff', fontSize: 40 }}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      )}
    </>
  );
};

export default CameraCP;
