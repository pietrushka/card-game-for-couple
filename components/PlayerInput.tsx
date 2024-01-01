import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native'
import { Player } from '@/types'
import Icon from 'react-native-vector-icons/FontAwesome5';

interface AddPlayerFormProps {
    player: Player
    modifyPlayer: (data: Player) => void
}

export default function PlayerInput({ player, modifyPlayer }: AddPlayerFormProps) {
    const setName = (text: string) => modifyPlayer({ ...player, name: text })
    const toggleGender = () => modifyPlayer({ ...player, gender: player.gender === 'male' ? 'female' : 'male' })
    return (
        <View>
            <View style={styles.container}>
                <TextInput
                    // TODO: fix behaviour on ios https://github.com/facebook/react-native/issues/41988
                    selectTextOnFocus
                    onChangeText={setName}
                    value={player.name}
                    style={styles.nameInput}
                />
                <Pressable style={styles.genderInput} onPress={toggleGender}>
                    <Icon style={[styles.genderOption, ...(player.gender === 'male' ? [styles.genderOption_active] : [])]} name="mars" size={30} />
                    <Icon style={[styles.genderOption, ...(player.gender === 'female' ? [styles.genderOption_active] : [])]} name="venus" size={30} color="#000" />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 2,
        borderColor: 'black',
        borderWidth: 2,
    },
    nameInput: {
        padding: 5,
        backgroundColor: 'white',
        flex: 1,
    },
    genderInput: {
        display: "flex",
        flexDirection: 'row',
    },
    genderOption: {
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'white',
        color: 'black'
    },
    genderOption_active: {
        backgroundColor: 'black',
        color: 'white'
    }
});