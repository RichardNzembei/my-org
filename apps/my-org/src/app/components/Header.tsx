import React from "react";
import {View, Text, StyleSheet} from "react-native";

type HeaderProps = {
  title: string;
  subtitle?: string;
};

export default function Header({title, subtitle}: HeaderProps){
  return(
    <View style={styles.container}>
  <Text style={styles.title}>{title}</Text>
       <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
