import {Dimensions} from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants';
import colors from '../colors';

export default {
    h2Title: {
        fontWeight: '600',
        paddingTop: 20,
        paddingBottom: 20,
        position: 'absolute',
        left: 20,
    },
    menuImg: {
        resizeMode: 'contain',
        height: 350,
        borderRadius: 8,
    },
    menuImgWrapper: {
        paddingVertical: 10,
        alignItems: 'center',
        paddingTop: 20,
    },
    menuImgTouch: {
        
    },
    icon: {
        position: 'absolute',
        top: 5,
        left: 20,
    },
    contactInfoEnd: {
        fontSize: 20,
        color: colors.blue01,
        fontWeight: '600',
    },
    contactInfoBC: {
        fontSize: 17,
        fontWeight: '400',

    },
    contactInfKeywords: {
        fontWeight: '400',
        color: colors.tabIconSelected,
    },
    map: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'absolute',
        height: 110,
    },
    contactInfoPhone: {
        fontSize: 15
    },
    phoneIcon: {
        position: 'absolute',
        right: 0,
    },
    contactInfoHr: {
        fontSize: 15,
        color: colors.blue01,
        fontWeight: '600',
    },
    contactInfoTextoLigar: {
        color: colors.blue01,
        fontSize: 15,
        position: 'absolute',
        bottom: 0,
        right: 10,
    }
}