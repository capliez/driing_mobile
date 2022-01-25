import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';

const HeaderComponent = ({ navigation, route, title, isBack }) => {
  const { t } = useTranslation('deliver');

  return (
    <View>
      {isBack && (
        <View style={styles.divIcon}>
          <Pressable
            accessible
            accessibilityRole="button"
            accessibilityLabel={t('btnReturnOfPageHome')}
            accessibilityHint={t('btnReturnScreenPrevious')}
            onPress={() => navigation.navigate(route)}
          >
            <IconIonicons
              color={'#131314'}
              size={28}
              name="chevron-back-outline"
            />
          </Pressable>
        </View>
      )}
      <Text style={styles.textHeader}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  divIcon: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#DEE4EB',
    borderRadius: 30,
    width: 45,
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 20,
    lineHeight: 38,
    fontWeight: '600',
    marginTop: 6,
  },
});

HeaderComponent.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.string,
  title: PropTypes.string,
  isBack: PropTypes.bool,
};

export default HeaderComponent;
