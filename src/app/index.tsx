import { useQuery } from "@tanstack/react-query";
import { Activity, useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";

type Tweet = {
  id: string;
  name: string;
};

export default function Index() {
  const queryKey = "tweets"; // chave que identifica a query

  const [get, setGet] = useState<Tweet[]>([]); // estado para armazenar os dados da api
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

  const query = useQuery({
    queryKey: [queryKey],
    queryFn: queryFn,
  });

  if (query.isLoading) {
    return <ActivityIndicator />; // early return if the query is loading
  }

  if (query.isError) {
    return <Text>Error: {query.error instanceof Error ? query.error.message : 'Unknown error'}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to ed it this screen.</Text>
      <View>

        {query.data && (
          <View>
            {query.data.map((item: Tweet) => (
              <View key={item.id}>
                <Text>{item.name}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
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
