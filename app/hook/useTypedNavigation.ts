import {NavigationProp, useNavigation} from "@react-navigation/native";
import {TypeRootStackParamList} from "../navigation/navigationTypes";

export const useTypedNavigation = () => useNavigation<NavigationProp<TypeRootStackParamList>>()