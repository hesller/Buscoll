import { Dimensions } from 'react-native';

import colors from '../colors/index';

export default {
    backgroundImg: {
        flex: 1.2,
        backgroundColor: colors.blue02,
        elevation: 5,
    },
    img: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: colors.white,
        position: 'absolute',
        left: Dimensions.get('window').width / 2  - 50,
        top: Dimensions.get('window').height / 4 - 130,

    },
    personName: {
        fontSize: 24,
        fontWeight: '600',
        paddingTop: 15,
        color: colors.white,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 50,
    },
    personPhoneNumber: {
        fontSize: 20,
        fontWeight: '400',
        paddingVertical: 10,
        color: colors.white,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 10,
    },
    backgroundIcons: {
        flex: 2,
    }
}