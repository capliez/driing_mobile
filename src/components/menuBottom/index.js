import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  HomeRoot,
  DeliverListRoot,
  ResidentListRoot,
} from '../../constants/routes';
import { SvgXml } from 'react-native-svg';

//Icon
import homeActiveIcon from '../../images/menu/homeActive';
import homeIcon from '../../images/menu/home';

import packageActiveIcon from '../../images/menu/packageActive';
import packageIcon from '../../images/menu/package';

import habitantActiveIcon from '../../images/menu/habitantActive';
import habitantIcon from '../../images/menu/habitant';

import profilActiveIcon from '../../images/menu/profilActive';
import profilIcon from '../../images/menu/profil';

const MenuBotom = ({ navigation }) => {
  const marginTop = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  const marginBottom = Platform.OS === 'ios' ? 30 : StatusBar.currentHeight;
  const { t } = useTranslation('menu');
  const [indexCurrent, setIndexCurrent] = useState(navigation.getState().index);
  const [routeCurrent, setRouteCurrent] = useState(
    navigation.getState().routes[navigation.getState().index].name,
  );

  useEffect(() => {
    if (navigation.getState().index !== indexCurrent) {
      setIndexCurrent(navigation.getState().index);
      setRouteCurrent(
        navigation.getState().routes[navigation.getState().index].name,
      );
    }
  }, [indexCurrent, navigation]);

  const itemMenu = [
    {
      id: 1,
      title: t('menu:home'),
      iconActive: homeActiveIcon,
      icon: homeIcon,
      root: HomeRoot,
      isActive: routeCurrent === HomeRoot,
    },
    {
      id: 2,
      title: t('menu:pendingParcel'),
      iconActive: packageActiveIcon,
      icon: packageIcon,
      root: DeliverListRoot,
      isActive: routeCurrent === DeliverListRoot,
    },
    {
      id: 3,
      title: t('menu:inhabitants'),
      iconActive: habitantActiveIcon,
      icon: habitantIcon,
      root: ResidentListRoot,
      isActive: routeCurrent === ResidentListRoot,
    },
    {
      id: 4,
      title: t('menu:profile'),
      iconActive: profilActiveIcon,
      icon: profilIcon,
      root: null,
      isActive: routeCurrent === null,
    },
  ];

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        paddingBottom: marginBottom,
        paddingHorizontal: marginBottom,
        width: '100%',
        backgroundColor: 'white',
      }}
    >
      <View style={styles.divider} />

      <View
        style={{
          marginTop,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        }}
      >
        {itemMenu.map((m) => (
          <View
            key={m.id}
            accessible
            accessibilityRole="menuitem"
            accessibilityLabel={m.title}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Pressable
              accessible
              accessibilityRole="button"
              style={{ alignItems: 'center' }}
              onPress={() => m.root && navigation.navigate(m.root)}
            >
              <SvgXml
                title={m.title}
                xml={m.isActive ? m.iconActive : m.icon}
                width={32}
                height={32}
              />

              <Text
                style={{
                  fontSize: 14,
                  marginTop: 5,
                  color: m.isActive ? '#222235' : '#C3C3C9',
                }}
              >
                {m.title}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'lightgrey' },
});

MenuBotom.propTypes = {
  navigation: PropTypes.object,
};

export default MenuBotom;
