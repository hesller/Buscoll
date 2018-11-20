import { Dimensions } from 'react-native';
import colors from '../colors/index';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default {
    imagem: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.3,
    },
    estiloTitulo: {
        textAlignVertical: 'bottom',
        position: 'absolute',
        bottom: 7,
        left: 20,
        color: colors.titulo01,
    },
    gradient: {
        color: ['transparent', '#000']
    },
    gradientStyle: {
        width: SCREEN_WIDTH,
        height: 70,
        position: 'absolute',
        bottom: 0,
    }
}