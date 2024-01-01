import React from 'react';
import { StyleSheet, Text, Pressable, GestureResponderEvent } from 'react-native';

interface ActionButtonProps {
    onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
    text: string;
    disabled?: boolean;
    color?: string;
    variant?: 'primary' | 'secondary';
}

// "function components cannot be given refs" => class
export default class ActionButton extends React.Component<ActionButtonProps> {
    static defaultProps = {
        variant: 'primary',
        color: 'black',
        disabled: false,
    };

    render() {
        const { onPress, text, variant, color, disabled } = this.props;

        const theme = variant === 'primary' ? {
            backgroundColor: color,
            textColor: 'white',
            borderColor: color,
        } : {
            backgroundColor: 'white',
            textColor: color,
            borderColor: color,
        };

        const buttonStyles = {
            ...styles.button,
            backgroundColor: disabled ? 'grey' : theme.backgroundColor,
            borderColor: theme.borderColor
        };

        const buttonTextStyles = {
            ...styles.buttonText,
            color: disabled ? 'lightgrey' : theme.textColor
        };

        return (
            <Pressable
                onPress={onPress}
                disabled={disabled}
                style={buttonStyles}
            >
                <Text style={buttonTextStyles}>{text}</Text>
            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        borderWidth: 2
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
});
