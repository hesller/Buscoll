{
    // outros botoes aqui 
  }
  <Animated.View style={{
    position: 'absolute',
    transform: [{ translateX: firstX }, { translateY: firstY }],
    opacity,
    elevation: 5,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  }}>
    <TouchableHighlight
      onPress={() => {
        this.props.navigation.navigate('Categorias');
      }}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZE * 0.6,
        height: SIZE * 0.6,
        borderRadius: SIZE * 0.3,
        backgroundColor: '#48A2F8',
      }}
    >
      <Icon name="ios-albums" size={28} color="#F8F8F8" />
    </TouchableHighlight>
    <Text>Categorias</Text>
  </Animated.View>

  <Animated.View style={{
    position: 'absolute',
    transform: [{ translateX: secondX }, { translateY: secondY }],
    opacity,
    elevation: 5,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  }}>
    <TouchableHighlight
      onPress={() => {
        this.props.navigation.navigate('ChatNavigator')
      }}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZE * 0.6,
        height: SIZE * 0.6,
        borderRadius: SIZE * 0.3,
        backgroundColor: '#48A2F8',
      }}
    >
      <Icon name="ios-chatbubbles" size={28} color="#F8F8F8" />
    </TouchableHighlight>
    <Text style={{ alignSelf: 'center' }} >ZapZap</Text>
  </Animated.View>

  <Animated.View style={{
    position: 'absolute',
    transform: [{ translateX: thirdX }, { translateY: thirdY }],
    opacity,
    elevation: 5,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  }}>
    <TouchableHighlight
      onPress={() => {
      }}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZE * 0.6,
        height: SIZE * 0.6,
        borderRadius: SIZE * 0.3,
        backgroundColor: '#48A2F8',
      }}
    >
      <Icon name="md-person" size={28} color="#F8F8F8" />
    </TouchableHighlight>
    <Text style={{ alignSelf: 'center' }} >Meu Perfil</Text>
  </Animated.View>