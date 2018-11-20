import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import estilos from '../../estilos';
import Geocoder from 'react-native-geocoding';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import RoundedIcon from './roundedIcon';
import call from 'react-native-phone-call'
import colors from '../../colors';
import { ActionCreators } from '../../redux/actions';

class ContactInfo extends Component {
    constructor(props) {
        super(props);

        Geocoder.init('AIzaSyCIYjZE2baBq69I_HChERljIMrn-C1lLhg');
        this.state = { lat: this.props.lat, long: this.props.lng }
    }
    componentWillMount() {

    }

    shareToWhatsAppWithContact = (text, phoneNumber) => {
        Linking.openURL(`whatsapp://send?text=${text}&phone=55${phoneNumber}`);
    }

    getLocation(end) {
        let location = {};
        Geocoder.from(end)
            .then(json => {
                location = json.results[0].geometry.location;
            })
            .catch(error => console.warn(error));
        this.setState({ lat: location.lat, long: location.lng });
    }

    phoneCall(phoneNumber) {
        return call({ number: phoneNumber, prompty: false });
    }

    render() {
        const { endereco, bairro, cidade, telefone, numero, buscarUsuarioPeloNumeroCelular } = this.props;

        return (
            <Card >
                <View>
                    <Text style={estilos.contactInfoEnd}>{endereco}, {numero}</Text>
                    <Text style={estilos.contactInfoBC}>
                        {bairro} - {cidade}
                    </Text>
                    <Text style={estilos.contactInfKeywords} >{this.props.keywords}</Text>

                    <View style={{ height: 110, marginVertical: 15 }} >
                        <MapView
                            cacheEnabled={true}
                            cacheLoadingBackgroundColor={'#ffffff'}
                            cacheLoadingIndicatorColor={'#666666'}
                            style={estilos.map}
                            initialRegion={{
                                latitude: this.state.lat,
                                longitude: this.state.long,
                                latitudeDelta: 0.00422,
                                longitudeDelta: 0.005421,
                            }}
                        >
                            <Marker
                                coordinate={{ latitude: this.state.lat, longitude: this.state.long }}
                                pinColor={colors.blue01}
                            />
                        </MapView>
                    </View>

                    <View style={{ height: 80 }} >
                        <Text style={estilos.contactInfoHr} >Horário de Funcionamento</Text>
                        <Text style={estilos.contactInfoBC} >{this.props.horario} hr </Text>
                    </View>
                    <View style={{ height: 80 }} >
                        <RoundedIcon
                            name={'phone-call'}
                            type={'feather'}
                            onPress={() => this.phoneCall(telefone)}
                            style={estilos.phoneIcon}
                        />
                        <Text style={estilos.contactInfoTextoLigar} >Ligar!</Text>
                        <RoundedIcon
                            name={'comments'}
                            type={'font-awesome'}
                            onPress={() => { 
                                this.shareToWhatsAppWithContact(
                                    'olá, eu vi seu contato no Buscoll e gostaria de: ',telefone) 
                                }}
                            style={styles.iconChat}
                        />
                        <Text style={styles.chatText} >Chat!</Text>
                    </View>
                </View>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    iconChat: {
        position: 'absolute',
        top: 0,
        right: 60,
    },
    chatText: {
        position: 'absolute',
        fontSize: 15,
        color: colors.blue01,
        bottom: 0,
        right: 70,
    }
})

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    buscarUsuarioPeloNumeroCelular: (telefone) => { dispatch(ActionCreators.buscarUsuarioPeloNumeroCelular(telefone)) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo);
