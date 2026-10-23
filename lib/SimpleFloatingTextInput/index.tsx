import React, { createRef, useCallback, useEffect, useState } from "react";
import {
  TextInput,
  Animated,
  TextInputProps,
  TextStyle,
  Platform,
} from "react-native";
import { StyledTextView } from "./styles";

interface IProps extends TextInputProps {
  label: string;
  colorError?: string;
  isError?: boolean;
}

export function SimpleFloatingTextInput({
  label,
  colorError,
  isError,
  ...props
}: IProps) {
  const inputRef = createRef<TextInput>();

  const [isFocused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [animated, setAnimated] = useState(new Animated.Value(0));

  const style = props.style as Array<TextStyle>;
  const fontSize = style[0].fontSize || 16;
  const borderColor = style[0].borderColor || "#676879";
  const height = Number(style[0].height) || 50;
  const calcHeight = height - 50 <= 0 ? 0 : (height - 50) / 2;

  const labelColor = isError ? colorError || "#dd1717" : "#000";
  const customBorderColor = isError ? labelColor : borderColor;

  useEffect(() => {
    if (props.value === undefined || props.value === "") {
      setHasValue(false);
    } else {
      setHasValue(true);
    }

    Animated.timing(animated, {
      toValue: isFocused || hasValue ? 1 : 0,
      duration: 30,
      useNativeDriver: false,
    }).start();
  }, [isFocused, hasValue]);

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);

  return (
    <StyledTextView
      customBorderColor={customBorderColor.toString()}
      {...props}
      onStartShouldSetResponder={() => {
        inputRef.current?.focus();
        return true;
      }}
    >
      <Animated.Text
        style={{
          position: "absolute",
          left: 0,
          paddingLeft: 15,
          top: animated.interpolate({
            inputRange: [0, 1],
            outputRange: [
              Platform.OS === "ios" ? 16 + calcHeight : 12 + calcHeight,
              Platform.OS === "ios" ? 4 : 2,
            ],
          }),
          fontSize: animated.interpolate({
            inputRange: [0, 1],
            outputRange: [fontSize, 11],
          }),
          color: animated.interpolate({
            inputRange: [0, 1],
            outputRange: ["#aaa", labelColor],
          }),
        }}
      >
        {label}
      </Animated.Text>
      <TextInput
        style={{
          // position: 'absolute',
          fontSize: fontSize,
          color: "#000",
          marginTop: (Platform.OS === "ios" ? 20 : 8) + calcHeight,
          // marginLeft: Platform.OS === 'ios' ? 0 : 0,
        }}
        underlineColorAndroid="transparent"
        value={props.value}
        onChange={props.onChange}
        onChangeText={props.onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        blurOnSubmit
        ref={inputRef}
      />
    </StyledTextView>
  );
}
