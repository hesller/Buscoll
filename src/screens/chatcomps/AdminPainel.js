import React, { Component, PureComponent } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ImageBackground,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Item, Picker } from 'native-base';
import MapLocation from '../../components/utilities/MapLocation'
import { ActionCreators } from '../../redux/actions/index';
import t from 'tcomb-form-native'
import ImageFactory from 'react-native-image-picker-form';
import ImagePicker from 'react-native-image-crop-picker';
import Geocoder from 'react-native-geocoder';
import { store } from '../../redux/store';
import Spinner from 'react-native-loading-spinner-overlay'


import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/index';
import colors from '../../colors';
import { itemWidth } from '../../estilos/SliderEntryStyles';

const Form = t.form.Form
const DocumentFormStruct = t.struct({
  image: t.String
})
type Props = {}
type State = {
  value: Object,
  options: Object
}



const selecionador = [{ key: '-', value: false }, { key: 'Não', value: false }, { key: 'Sim', value: true }]

const estados = [
  { key: "AC", value: "Acre" },
  { key: "AL", value: "Alagoas" },
  { key: "AP", value: "Amapá" },
  { key: "AM", value: "Amazonas" },
  { key: "BA", value: "Bahia" },
  { key: "CE", value: "Ceará" },
  { key: "DF", value: "Distrito Federal" },
  { key: "ES", value: "Espírito Santo" },
  { key: "GO", value: "Goiás" },
  { key: "MA", value: "Maranhão" },
  { key: "MT", value: "Mato Grosso" },
  { key: "MS", value: "Mato Grosso do Sul" },
  { key: "MG", value: "Minas Gerais" },
  { key: "PA", value: "Pará" },
  { key: "PB", value: "Paraíba" },
  { key: "PR", value: "Paraná" },
  { key: "PE", value: "Pernambuco" },
  { key: "PI", value: "Piauí" },
  { key: "RJ", value: "Rio de Janeiro" },
  { key: "RN", value: "Rio Grande do Norte" },
  { key: "RS", value: "Rio Grande do Sul" },
  { key: "RO", value: "Rondônia" },
  { key: "RR", value: "Roraima" },
  { key: "SC", value: "Santa Catarina" },
  { key: "SP", value: "São Paulo" },
  { key: "SE", value: "Sergipe" },
  { key: "TO", value: "Tocantins" }
];

const _renderName = (props) => {
  const { input, meta, ...inputProps } = props;

  return (
    <View>
      <Text style={styles.fieldTitle} >{props.label}</Text>
      <TextInput
        {...inputProps}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        underlineColorAndroid={colors.black}
      />
      <Text style={styles.errorMsg} >{props.meta.touched ? props.meta.error : ''}</Text>

    </View>
  );
}

const _renderCEP = (props) => {
  const { input, meta, ...inputProps } = props;

  return (
    <View>
      <Text style={styles.fieldTitle} >{props.label}</Text>
      <TextInput
        {...inputProps}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        maxLength={9}
        value={input.value.replace(/(\d{5})(\d{3})/, "$1-$2")}
        underlineColorAndroid={colors.black}
      />
      <Text style={styles.errorMsg} >{props.meta.touched ? props.meta.error : ''}</Text>

    </View>
  );
}

const _renderPhoneNumber = (props) => {
  const { input, meta, ...inputProps } = props;

  return (
    <View>
      <Text style={styles.fieldTitle} >{props.label}</Text>
      <TextInput
        {...inputProps}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        maxLength={16}
        value={input.value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4")}
        underlineColorAndroid={colors.black}

      />
      <Text style={styles.errorMsg} >{props.meta.touched ? props.meta.error : ''}</Text>

    </View>
  );
}

const formatLoanTerm = (value) => {
  if (value) {
    return value.toString();
  }
  return null;
}

const parseLoanTerm = (value) => {
  return String(value);
}

class AdminPainel extends PureComponent {
  constructor(props) {
    super(props);

    Geocoder.fallbackToGoogle("AIzaSyCIYjZE2baBq69I_HChERljIMrn-C1lLhg");

    this.state = {
      logoPath: '',
      lat: -3.664583,
      lng: -45.383759,
      images: [],
      previousValue: '',
      value: {},
      options: {
        fields: {
          image: {
            config: {
              title: 'Selecionar Imagem',
              options: ['Camera', 'Galeria', 'Cancelar'],
              // Used on Android to style BottomSheet
              style: {
                titleFontFamily: 'Roboto'
              }
            },
            error: 'Nenhuma Imagem Selecionada',
            factory: ImageFactory
          }
        }
      }
    }

    this.props.coverImagesAction([]);
    this.props.catalogImagesAction([]);
    this.props.ambienteImagesAction([]);
    this.props.mapPreviewAction(null);
    this.props.registerBusinessLoading(false);

  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    nextProps.coverImages;
    nextProps.catalogImages;
    nextProps.ambienteImages;
  }

  _filterByRank(value) {
    this.props.getData(value);
    this.setState({ rankFilter: value });
  }

  onRegionChange(region) {
    this.setState({ region })
  }

  _geocoder = () => {
    let latLng = {};
    const address = store.getState().form.RegisterBusiness.values;
    Geocoder.geocodeAddress(`${address.rua}, ${address.numero}, ${address.bairro}, ${address.cidade}, ${address.estado}`)
      .then(res => {
        // res is an Array of geocoding object (see below)
        latLng = res[0].position;
        this.setState({ lat: latLng.lat, lng: latLng.lng })
        return onChange(latLng)
      }).catch(err => alert(err))
  }

  _renderMap(props) {
    const { input: { onChange, value, ...inputProps }, children, ...pickerProps } = props;

    return (
      <View>
        <Text style={{ marginVertical: 10, fontSize: 15, }} >{props.label}</Text>
        <Button
          title='Visualizar Localização no Mapa'
          onPress={() => {
            let latLng = {};
            const address = store.getState().form.RegisterBusiness.values;
            Geocoder.geocodeAddress(`${address.rua}, ${address.numero}, ${address.bairro}, ${address.cidade}, ${address.estado}`)
              .then(res => {
                // res is an Array of geocoding object (see below)
                latLng = res[0].position;
                props.mapPreviewAction(latLng);
                return onChange(latLng)
              }).catch(err => alert(err))
          }}
        />
      </View>
    );
  }

  _renderPicker = (props) => {

    const { input: { onChange, value, ...inputProps }, children, ...pickerProps } = props;

    return (
      <View>
        <Text style={styles.fieldTitle} >{props.label}</Text>
        <Picker
          selectedValue={value}
          onValueChange={value => requestAnimationFrame(() => { onChange(value); })}
          {...inputProps}
          {...pickerProps}
        >
          {children}
        </Picker>
        <Text style={styles.errorMsg} >{props.meta.touched ? props.meta.error : ''}</Text>
      </View>
    );
  }

  _renderImgPickerAmbiente(props) {
    const { input, meta, ...inputProps } = props;
    return (
      <View>
        <Text style={{ marginVertical: 10, fontSize: 15, alignSelf: 'center', fontWeight: 'bold' }} >{props.label}</Text>
        <TouchableHighlight
          {...inputProps}
          {...props}
          type='file'
          style={{ backgroundColor: colors.maincolor, padding: 20,}}
          onPress={() => {
            ImagePicker.openPicker({
              multiple:true,
              compressImageMaxWidth: 640,
              compressImageMaxHeight: 1136,
              includeBase64: true,
              compressImageQuality: 0.35
            }).then(imageArr => {
              props.imgAction(imageArr);
              input.onChange(imageArr);
            });
          }}
        >
          <Text style={{ color: colors.white, fontSize: 15, alignSelf: 'center' }}  >Selecionar Imagens do Ambiente</Text>
        </TouchableHighlight>
      </View>
    )
  }

  _renderImgPickerLogo(props) {
    const { input, meta, ...inputProps } = props;
    return (
      <View>
        <Text style={{ marginVertical: 10, fontSize: 15, alignSelf: 'center', fontWeight: 'bold' }} >{props.label}</Text>
        <TouchableHighlight
          {...inputProps}
          {...props}
          type='file'
          style={{ backgroundColor: colors.maincolor, padding: 20 }}
          onPress={() => {
            ImagePicker.openPicker({
              width: 1080,
              height: 497,
              cropping: true,
              compressImageMaxWidth: 640,
              compressImageMaxHeight: 1136,
              includeBase64: true,
              compressImageQuality: 0.35
            }).then(imageArr => {
              const Array = [];
              Array.push(imageArr);
              return Array;
            }).then(Array => {
              props.imgAction(Array);
              input.onChange(Array);
            })
          }}
        >
          <Text style={{ color: colors.white, fontSize: 15, alignSelf: 'center' }}  >Selecionar Logo</Text>
        </TouchableHighlight>
      </View>
    )
  }

  _renderImgPicker(props) {
    const { input, meta, ...inputProps } = props;
    return (
      <View>
        <Text style={{ marginVertical: 10, fontSize: 15, }} >{props.label}</Text>
        <TouchableHighlight
          {...inputProps}
          {...props}
          type='file'
          style={{ backgroundColor: colors.maincolor, padding: 20 }}
          onPress={() => {
            ImagePicker.openPicker({
              compressImageMaxWidth: 640,
              compressImageMaxHeight: 1136,
              includeBase64: true,
              multiple: true,
              compressImageQuality: 0.35
            }).then(imageArr => {
              props.imgAction(imageArr);
              input.onChange(imageArr);
            });
          }}
        >
          <Text style={{ color: colors.white, fontSize: 15, alignSelf: 'center' }}  >Selecionar Imagens do Catalogo</Text>
        </TouchableHighlight>
      </View>
    )
  }

  _submit = values => {
    return this.props.registerBusinessAction(values);
  }

  render() {
    const { handleSubmit, } = this.props;

    return (
      <ScrollView keyboardShouldPersistTaps={'handled'} style={styles.container} >
      <Spinner 
        visible={this.props.businessLoading} 
        textContent={this.props.loadingMessage} 
        textStyle={{color: '#FFF'}} 
        overlayColor='rgba(34, 150, 243, 0.95)'
      />
        <Field
          label='Nome'
          name='nome'
          component={_renderName}
        />
        <Field
          label='Palavras-chave'
          name='palavrasChave'
          component={_renderName}
        />
        <Field
          label='Rua'
          name='rua'
          component={_renderName}
        />
        <Field
          label='Numero'
          name='numero'
          component={_renderName}
        />
        <Field
          label='Bairro'
          name='bairro'
          component={_renderName}
        />
        <Field
          label='CEP'
          name='cep'
          component={_renderCEP}
        />
        <Field
          label='Cidade'
          name='cidade'
          component={_renderName}
        />

        <Field
          label='Selecione o Estado'
          name="estado"
          component={this._renderPicker}
          iosHeader="Selecione"
          mode="dropdown"
          format={formatLoanTerm}
          parse={parseLoanTerm}
        >
          {
            estados.map((val, i) =>
              <Picker.Item
                label={val.value}
                key={val.value}
                value={val.value}
              />
            )
          }
        </Field>
        <Field
          label='Telefone'
          name='telefone'
          component={_renderPhoneNumber}
        />
        {
          this.props.mapPreview ?
            <MapLocation
              lat={this.props.mapPreview.lat}
              lng={this.props.mapPreview.lng}
            />
            :
            <ImageBackground
              style={{ height: 260, width: SCREEN_WIDTH - 40, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text style={{ marginVertical: 10 }} >Preview do Mapa</Text>
            </ImageBackground>
        }
        <Field
          label='Clique no botão abaixo para pré-visualiar o mapa'
          name='map'
          mapPreviewAction={this.props.mapPreviewAction}
          component={this._renderMap}
        />
        <Field
          label='Selecione a Categoria do Estabelecimento'
          name="categories"
          component={this._renderPicker}
          iosHeader="Select one"
          mode="dropdown"
          format={formatLoanTerm}
          parse={parseLoanTerm}
        >
          { this.props.categories != null ?
            this.props.categories.map((val, i) =>
              <Picker.Item
                label={val.value.nome}
                key={i}
                value={val.value.nome}
              />
            )
            :
            <Text style={{ color: colors.darkOrange}}>
              Erro ao carregar categorias! Reinicie o aplicativo para carregar as categorias corretamente
            </Text>
          }
        </Field>
        <Field
          label='Aparecer no Topo?'
          name="destaqueTopo"
          component={this._renderPicker}
          iosHeader="Selecione..."
          mode="dropdown"
          format={formatLoanTerm}
          parse={parseLoanTerm}
        >
          {
            selecionador.map((val, i) =>
              <Picker.Item
                label={val.key}
                key={i}
                value={val.key}
              />
            )
          }
        </Field>
        <Field
          label='Destaque?'
          name="destaque"
          component={this._renderPicker}
          iosHeader="Select one"
          mode="dropdown"
          format={formatLoanTerm}
          parse={parseLoanTerm}
        >
          {
            selecionador.map((val, i) =>
              <Picker.Item
                label={val.key}
                key={i}
                value={val.key}
              />
            )
          }
        </Field>
        <Field
          label='Horário de Funcionamento'
          name='horario'
          component={_renderName}
        />
        <Field
          label='Selecione Logo'
          imgAction={this.props.coverImagesAction}
          imgArr={this.props.coverImages}
          name='imagemCapa'
          component={this._renderImgPickerLogo}
        />
        {
          this.props.coverImages != [] ?
            this.props.coverImages.map((item, i) => {
              //var imageToDisplay = require(`${String(item.path)}`);
              return (
                <View style={{ alignItems: 'center' }} >
                  <Image
                    style={{ height: 187, width: 400, marginVertical: 10 }}
                    source={{ uri: item.path }}
                  />
                </View>
              )
            })
            :
            <ImageBackground
              style={{ height: 260, width: SCREEN_WIDTH - 40, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text style={{ marginVertical: 10 }} >Preview da Imagem</Text>
            </ImageBackground>
        }
        <Field
          label='Selecione Imagens do Ambiente'
          imgAction={this.props.ambienteImagesAction}
          imgArr={this.props.ambienteImages}
          name='imagemAmbiente'
          component={this._renderImgPickerAmbiente}
        />
        {
          this.props.ambienteImages != [] ?
            this.props.ambienteImages.map((item, i) => {
              //var imageToDisplay = require(`${String(item.path)}`);
              return (
                <View style={{ alignItems: 'center' }} >
                  <Image
                    style={{ height: 260, width: SCREEN_WIDTH - 40, marginVertical: 10 }}
                    source={{ uri: item.path }}
                  />
                </View>
              )
            })
            :
            <ImageBackground
              style={{ height: 260, width: SCREEN_WIDTH - 40, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text style={{ marginVertical: 10 }} >Preview da Imagem</Text>
            </ImageBackground>
        }
        <Field
          label='Selecione Images do Catalogo'
          imgAction={this.props.catalogImagesAction}
          imgArr={this.props.catalogImages}
          name='imagemCatalogo'
          component={this._renderImgPicker}
        />
        {
          this.props.catalogImages != [] ?
            this.props.catalogImages.map((item, i) => {
              //var imageToDisplay = require(`${String(item.path)}`);
              return (
                <View style={{ alignItems: 'center' }} >
                  <Image
                    style={{ height: 260, width: SCREEN_WIDTH - 40, marginVertical: 10 }}
                    source={{ uri: item.path }}
                  />
                </View>
              )
            })
            :
            <ImageBackground
              style={{ height: 260, width: SCREEN_WIDTH - 40, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text style={{ marginVertical: 10,  }} >Preview da Imagem</Text>
            </ImageBackground>
        }
        <TouchableOpacity
          onPress={handleSubmit(this._submit)}
          style={styles.submit}
        >
          <Text style={styles.submitText} >Cadastrar!</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  fieldTitle: {
    paddingTop: 20,
    fontSize: 15,
  },
  errorMsg: {
    color: colors.darkOrange,
  },
  imagePicker: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: colors.maincolor,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: SCREEN_HEIGHT / 3.7 - 30,
    right: SCREEN_WIDTH / 2 - SCREEN_HEIGHT / 3.7 / 2
  },
  submit: {
    backgroundColor: colors.maincolor,
    marginVertical: 30,
    marginHorizontal: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  submitText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: 'bold',
  }
})

function validate(values) {
  const errors = {};
  // validade the inputs
  if (!values.nome) {
    errors.nome = 'Digite o nome do Estabelecimento.';
  } else if (!values.rua) {
    errors.rua = 'Digite o nome da rua.';
  } else if (!values.numero) {
    errors.numero = 'É necessário digitar o numero, ou então digite S/N para indicar: Sem número.';
  } else if (!values.bairro) {
    errors.bairro = 'É necessário digitar o bairro no qual está localizado o estabelecimento.';
  } else if (!values.cidade) {
    errors.cidade = 'É necessário digitar qual a cidade.';
  } else if (!values.estado) {
    errors.estado = 'É necessário escolher qual o estado';
  } else if (!values.categories) {
    errors.categories = 'É necessário escolher a categoria';
  } else if (!values.imagemCapa) {
    errors.imagemCapa = 'É necessário escolher a imagem para capa';
  } else if (!values.telefone || values.telefone.length < 10 ) {
    errors.telefone = 'Digite no número do telefone com DDD e sem espaços, exemplo: 9898217XXXX';
  }

  return errors
}

const mapStateToProps = (state) => {
  return {
    //categoria: state.form.RegisterBusiness.
    categories: state.perfilReducer.categories,
    coverImages: state.perfilReducer.coverImages,
    catalogImages: state.perfilReducer.catalogImages,
    ambienteImages: state.perfilReducer.ambienteImages,
    mapPreview: state.perfilReducer.mapPreview,
    businessLoading: state.perfilReducer.businessLoading,
    loadingMessage: state.perfilReducer.loadingMessage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => { dispatch(ActionCreators.fetchCategories()) },
    coverImagesAction: (images) => { dispatch(ActionCreators.coverImage(images)) },
    catalogImagesAction: (catalog) => { dispatch(ActionCreators.catalogImages(catalog)) },
    ambienteImagesAction: (ambiente) => { dispatch(ActionCreators.ambienteImages(ambiente)) },
    mapPreviewAction: (mapCoordinates) => { dispatch(ActionCreators.mapPreview(mapCoordinates)) },
    registerBusinessAction: (values) => { dispatch(ActionCreators.registerNewBusiness(values)) },
    registerBusinessLoading: (businessLoading, message) => { dispatch(ActionCreators.registerBusinessLoading(businessLoading, message)) },
  }
}

export default reduxForm({
  validate,
  form: 'RegisterBusiness'
})(
  connect(mapStateToProps, mapDispatchToProps)(AdminPainel)
);
