import React from "react";
import { View } from "react-native";
import { Appbar, List, Text } from "react-native-paper";
import { styles } from "./styles";

const HelpPage = () => {
  return (
    <>
      <Appbar.Header
        mode="small"
        style={styles.header}
        theme={{ colors: { primary: "green", secondary: "red" } }}
      >
        <Appbar.Content title="Suporte" color="#F6F6F6" />
      </Appbar.Header>

      <View style={styles.container}>
        <List.AccordionGroup>
          <List.Accordion title="Cliente não quis pagar a corrida" id="1">
            <List.Item title="Item 1" />
          </List.Accordion>
          <List.Accordion title="Não estou conseguindo aceitar corridas" id="2">
            <List.Item title="Item 2" />
          </List.Accordion>
          <View>
         
            <List.Accordion title="Não estou recebendo pagamentos" id="3">
              <List.Item title="Item 3" />
            </List.Accordion>
          </View>
        </List.AccordionGroup>
      </View>
    </>
  );
};

export default HelpPage;
