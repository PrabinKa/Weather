import { Dimensions } from "react-native";

import { PixelRatio } from "react-native";

const fontScale = PixelRatio.getFontScale();
const {height, width} = Dimensions.get('window');

export const responsiveFont = (size) => {
    return fontScale * size
}

export const verticalSpace = (size) => {
    return height * size
}

export const horizontalSpace = (size) => {
    return width * size
}



