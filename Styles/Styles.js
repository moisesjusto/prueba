import { StyleSheet, Dimensions } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 2,
    resizeMode: "cover",
    justifyContent: "center"
  },
  fondo: {
    flex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.411)'
  },
  Form: {
    borderRadius: 10,
    maxWidth: 380,
    alignSelf: 'center',
    backgroundColor:'#efefef',
    padding:5
  },
  reyeno: {

    width: 1,
    height: 50
  },
  Input: {
    width: Dimensions.get('window').width - 75,
    maxWidth: 360,
    minWidth: 200,
    padding: 5,
    margin: 5,
    height: 50,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    fontSize: 20,
    alignSelf: 'center'
  },
  texto: {
    fontSize: 15,
    padding: 5,
    margin: 5,
  },
  Spacio: {
    height: 50
  },
  Spacio2: {
    height: 40
  },
  T: {
    fontSize: 15,
    textAlign: 'center'
  }, icc: {
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ' rgba(26, 100, 196, 0.884)'
  },
  Barra: {
    width: 1,
    height: 33,
    backgroundColor: 'rgb(223, 223, 223)',
  },
  Link: {
    flexDirection: 'row',
    padding: 5,
    width: '100%',
    backgroundColor: 'rgb(255, 255, 255)'
  },
  SS: {
    width: '50%',
    flexDirection: 'row-reverse',
  },
  icono: {
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'flex-start'

  },
  Texx: {
    borderBottomColor: '#e7e6e6',
    borderBottomWidth: 1,
    paddingLeft: 10
  },
  Text: {
    fontWeight: '600',
    fontSize: 15
  },
  Te: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
    marginTop: 5
  },
  imsg: {
    maxWidth: 420,
    maxHeight: 488,
    width: Dimensions.get('window').width,
    height: 517,
    minHeight: 399,
    minWidth: 320,


  },
  ttt: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },
  imgg: {
    borderRadius: 20,
    width: 75,
    height: 75
  },
  cardd: {
    borderRadius: 0,
    borderWidth: 0.4,
    borderColor: '#11b827',
    padding: 15,
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  card: {
    borderRadius: 12,
    borderWidth: 0.4,
    borderColor: 'gray',
    padding: 15,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  Inputt: {
    padding: 10,
    height: 40,
    borderColor: 'gray',
    borderRadius: 20,
    borderWidth: 1,
    width: '80%'
  },
  barraa: {
    backgroundColor: ' rgba(156, 156, 156, 0.473)',
    width: '100%',
    height: 1,
    margin: 1
  },
  iconoo: {
    width: '10%',
    paddingLeft: 5
  },
  a: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },
  i: {
    width: '50%'
  },
  o: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
  },
  u: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'right',
  },
  progress: {
    width: 50,
    height: 50,
    backgroundColor: '#e6e6e6',
    borderRadius: 50,
    justifyContent: 'center',
    marginLeft: 10,
    alignItems: 'center'
  },
  perfil: {
    borderRadius: 12,
    borderColor: 'gray',
    padding: 15,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  Persiv: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    alignSelf: 'center',
    paddingLeft: 10,
    margin: 2
  },
  Info: {
    width: Dimensions.get('window').width - 75,
    maxWidth: 360,
    minWidth: 200,
    padding: 5,
    margin: 5,
    height: 50,
    fontSize: 20,
    alignSelf: 'center'
  },
  R: {
    borderColor: 'black',
    borderWidth: 0.3
  },
  ImgIcon: {
    width: 25,
    height: 25,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: ' rgba(26, 100, 196, 0.884)'
  },
  TouchsAlert: {
    width: '100%', height: '100%', backgroundColor: 'rgba(32, 32, 32, 0.349)', position: 'absolute', justifyContent: "space-around",
    alignItems: "center"
  },
  cuadro: {
    width: 300,
    height: 200,
    backgroundColor: 'rgb(255, 255, 255)',
    alignSelf: 'center',
    borderRadius: 30
  },
  tatil: {
    flexDirection: 'row-reverse', justifyContent: 'center', marginTop: 5, width: 200
  }
});

