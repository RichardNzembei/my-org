import React  from "react";
import { Text } from "react-native";

type Props ={
    name:string
}
export const Greeting:React.FC<Props> = ({name})=>{
    return <Text style={{fontSize:20}}>Hello, {name}!</Text>
};