import { useMutation } from "@tanstack/react-query";
import { Pressable, Text, View } from "react-native";

type Tweet = {
  id: string;
  name: string;
  text: string;
  createdAt: string;
  avatar: string;
};

async function createTweet(tweet: Omit<Tweet, "id" | "createdAt">) {
  const response = await fetch(
    "https://6a73bea615e0453fe1b42b81.mockapi.io/Tweets",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tweet),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export default function NovoTweetScreen() {
  const { mutate, isPending, isError, isSuccess, data, error } = useMutation({
    mutationFn: createTweet, // mutation function to create a new tweet
  });

  if (isPending) {
    return <Text>Creating tweet...</Text>;
  }

  const handleOnPress = () => {
    mutate({
      name: "Claudiup",
      avatar: "https://i.pravatar.cc/150?img=1",
      text: "A experiência foi muito boa e o aplicativo funcionou como esperado.",
    });
  };

  if (isError) {
    return (
      <Text>
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </Text>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable onPress={handleOnPress}>
        <Text>Novo Tweet</Text>
      </Pressable>
    </View>
  );
}
