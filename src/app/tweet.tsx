import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function TweetScreen() {
  return (
    <View>
      <Text>Tela do Tweet</Text>
      <Link href={"/"}>Voltar para a Home</Link>
    </View>
  );
}