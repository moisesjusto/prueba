import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View, Text, TouchableOpacity, Image, FlatList, ImageBackground } from 'react-native'
import { Button, Card } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
//stylos
import { styles } from '../Styles/Styles'


export const Botones = (props) => {
    return (
        <Button
            style={props.sty}
            type={props.type}
            title={props.title}
            loading={props.Stado}
            disabled={props.Stados}
            onPress={props.onPress}
        />
    )
}
export const Testo = (props) => {
    return (
        <Text
            style={props.sty}
        >
            {props.title}
        </Text>
    )
}
export const TouchsImg = (props) => {
    return (
        <TouchableOpacity
            key={props.kei}
            onPress={props.onPress}
            activeOpacity={props.acti}
            style={props.styl}
        >
            <Image
                source={props.sour}
                resizeMethod={props.resizM}
                resizeMode={props.resiz}
                style={props.sty}
            />
            <Text> {props.text}</Text>
        </TouchableOpacity>
    )
}
export const TouchsIcon = (props) => {
    return (
        <View>
            <TouchableOpacity
                style={props.sty}
                onPress={props.onPress}
            >
                <Icon
                    disabled={props.disabled}
                    color={props.color}
                    style={props.style}
                    size={props.size}
                    name={props.name}
                    onPress={props.OnPress}
                />
                <Text style={styles.Persiv} >
                    {props.title}
                </Text>
            </TouchableOpacity>
            <View style={props.styl} />
        </View>
    )
}
const image = require('../assets/logo.png');
export const Cardd = (props) => {
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <View style={styles.Barra} />
            {props.Back}
            <ImageBackground source={image} style={styles.image}>
                <FlatList
                    style={props.sty}
                    data={props.Datos}
                    keyExtractor={props.keyExt}
                    renderItem={props.render}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.fondo}>
                            <View style={styles.reyeno} />
                            <View style={styles.Form} >
                                <Card.Title> {props.title} </Card.Title>
                                <Card.Divider />
                                <View style={styles.Spacio2} />
                                {props.Cardr}
                                <View style={styles.Spacio2} />
                            </View>
                        </View>
                    } />
            </ImageBackground>
        </View>
    )
}


export const TouchsAlert = (prop) => {
    return (
        <TouchableOpacity
            onPress={prop.onPress}
            style={{ ...styles.openButton, backgroundColor: 'rgba(117, 117, 117, 0.753)' }}
        >
            <Text style={styles.textStyle}>{prop.txt}</Text>
        </TouchableOpacity>

    )
}

export const Cuadro = (prop) => {
    return (
        <View style={styles.cuadro} >
            <Testo title='Que Deceas' sty={styles.a} />
            <Testo title={prop.title} sty={{ ...styles.a, fontSize: 15, margin: 10 }} />
            {prop.Icon}

        </View>
    )
}


