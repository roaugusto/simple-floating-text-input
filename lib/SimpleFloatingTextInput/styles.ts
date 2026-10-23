import { Platform } from "react-native";
import styled from "styled-components/native";

type IProps = {
  customBorderColor: string;
};

export const StyledTextView = styled.View<IProps>`
  border-radius: 8px;
  border-width: 1px;
  border-color: ${(props) => props.customBorderColor};
  padding-left: ${Platform.OS === "ios" ? "15px" : "10px"};
  padding-right: ${Platform.OS === "ios" ? "15px" : "10px"};
  padding-bottom: ${Platform.OS === "ios" ? "5px" : "-2px"};
  height: 50px;
`;

export const StyledTextInput = styled.TextInput`
  display: flex;
  height: 25px;
  min-height: 25px;
  width: 200px;
  font-size: 16px;
  color: #000;
`;
