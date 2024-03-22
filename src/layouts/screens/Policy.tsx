import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeaderScreen from './HeaderScreen'

const Policy = ({ navigation }: any) => {

    const openUrl = (url: string) => {
        Linking.openURL(url).catch((err) => console.error('Error opening URL: ' + err));
    };

    return (
        <View style={styles.container}>
            <HeaderScreen />
            <View style={styles.HeadView}>
                <Text style={styles.text}>Return Policy</Text>
                <TouchableOpacity onPress={() => openUrl('https://lfksingapore.com/return-policy')}>
                    <Text style={styles.url}>https://lfksingapore.com/return-policy</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.HeadView}>
                <Text style={styles.text}>Terms and Condition</Text>
                <TouchableOpacity onPress={() => openUrl('https://lfksingapore.com/terms')}>
                    <Text style={styles.url}>https://lfksingapore.com/terms</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.HeadView}>
                <Text style={styles.text}>Data Protection Policy</Text>
                <TouchableOpacity onPress={() => openUrl('https://lfksingapore.com/data-protection-policy')}>
                    <Text style={styles.url}>https://lfksingapore.com/data-protection-policy</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.HeadView}>
                <Text style={styles.text}>Privacy Policy</Text>
                <TouchableOpacity onPress={() => openUrl('https://lfksingapore.com/privacy-policy')}>
                    <Text style={styles.url}>https://lfksingapore.com/privacy-policy</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Policy

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    HeadView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    text: {
        color: 'black',
        fontSize: 22,
    },
    url: {
        fontSize: 14,
        color: 'blue',
        marginTop: 5,
    },
})