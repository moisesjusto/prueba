import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import { Alert } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Text, View } from 'react-native'
import { SocialIcon } from 'react-native-elements'
import { Testo, TouchsIcon, TouchsImg } from '../controller/Funciones'
import { styles } from '../Styles/Styles'

export default class Ayuda extends Component {


    Alertas = (a, e) => {
        Alert.alert(a, e)
    }



    render() {
        const MM = 'Despues de Alquirido y Enviado un Producto, si no lo Desea Devera Pagar el Envio....... '
        const JJ = ' Los Pedidos Fuera de Santo Domingo Deveran Pagar el  Envio Por Adelantado  '
        const XX = `${MM}    ${JJ}`;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar style='auto' />
                <View style={styles.Barra} />

                {/* Perfil */}
                <View style={styles.perfil}>
                    <TouchsImg
                        sour={require('../assets/favi.png')}
                        sty={styles.icono}
                    />

                    <Testo sty={{ ...styles.a, fontSize: 15, alignSelf: 'center', paddingLeft: 10 }}
                        title=' Moises Paca Contactos'
                    />

                </View>
                <View style={{ borderColor: 'black', borderWidth: 0.5 }} />

                {/* icon 1 */}
                <TouchsIcon
                    sty={{ ...styles.perfil, marginLeft: 5, }}
                    size={30}
                    name='arrow-left'
                    OnPress={() => this.props.navigation.goBack()}
                />

                <TouchableOpacity
                    onPress={() => this.Alertas('Url De facebook', 'https://facebook.com/users/moisespaca')}
                >
                    <SocialIcon
                        title='Pagina De  Facebook'
                        button
                        type='facebook'
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.Alertas('Url De nstagram', 'https://instagram.com/users/moisespaca')}
                >
                    <SocialIcon
                        button
                        title='Pagina De  instagram'
                        type='instagram'
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.Alertas('whatsapp', '849-632-2021')}
                >
                    <SocialIcon
                        button
                        title='whatsapp'
                        type='medium'
                        iconSize={0}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.Alertas('Politicas & Condiciones', XX)}
                >
                    <SocialIcon
                        button
                        title='Politicas & Condiciones'
                        type='pinterest'
                        iconSize={0}
                    />
                </TouchableOpacity>



                <Testo sty={{ ...styles.a, fontSize: 15, textAlign: "center", margin: 20 }}
                    title='© 2020 All rights reserved. Designed by Moises'
                />

            </View>
        )
    }
}
