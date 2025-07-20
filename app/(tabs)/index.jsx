import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to THEMIS</Text>
      <Button title="Go to Profile Page" onPress={() => router.push('/_ProfilePage')} />
    </View>
  );
}




