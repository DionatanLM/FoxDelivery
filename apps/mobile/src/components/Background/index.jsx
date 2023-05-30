import { ImageBackground } from 'react-native';

import backgroundImg from '../../assets/backgroundAlt.png';

import { styles } from './styles';

export function Background() {
  return (
    <ImageBackground 
    source={backgroundImg}
    defaultSource={backgroundImg}
    style={styles.container}
    >
    </ImageBackground>
  );
}