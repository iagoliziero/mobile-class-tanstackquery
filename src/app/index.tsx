import { useQuery } from "@tanstack/react-query";
import { Activity, useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator, SafeAreaViewBase, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type Tweet = {
  id: string;
  name: string;
  text: string;
};

export default function Index() {
  const queryKey = "tweets"; // key to identify the query

  const [get, setGet] = useState<Tweet[]>([]); // state to hold the fetched tweets
  const queryFn = async () => {
    try {
      const response = await fetch(
        "https://6a73bea615e0453fe1b42b81.mockapi.io/Tweets"
      );
      if (!response.ok) {
        throw new Error("Network response wasn`t ok");
      }

      const obj = await response.json();
      return obj;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // destructuring the result of useQuery to get isLoading, isError, and data
  const { isLoading, isError, data } = useQuery({
    queryKey: [queryKey],
    queryFn: queryFn,
  });

  if (isLoading) {
    return <ActivityIndicator />; // early return if the query is loading
  }

  if (isError) {
    return <Text>Error: Unable to fetch tweets. Please try again later.</Text>;
  }

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
          <ScrollView>
            <Text>Edit src/app/index.tsx to ed it this screen.</Text>
            <View>
              {data && (
                <View>
                  {data.map((item: Tweet) => (
                    <View key={item.id} style={{ marginBottom: 10 }}>
                      <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                      <Text>{item.text}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
