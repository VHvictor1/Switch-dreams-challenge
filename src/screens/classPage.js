import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth";
import Header from "../components/header";
import Footer from "../components/footer";
import moment from "moment";

const ClassPage = ({ navigation, route }) => {
  const [time, setTime] = useState();
  const [duration, setDuration] = useState();
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const time = route.params.class.start_time;
    setTime(moment.utc(time).format("HH:mm"));
    setDuration(route.params.class.duration / 60);
  });
  return (
    <>
      <Header></Header>
      <View style={styles.container}>
        <Image
          source={require("../../src/assets/academy.png")}
          style={styles.image}
        />
        <View style={styles.infoBox}>
          <Text style={styles.text}>Name:</Text>
          <Text style={styles.textInfo}>{route.params.class.name}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>Professor:</Text>
          <Text style={styles.textInfo}>{route.params.class.teacher_name}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>Duração:</Text>
          <Text style={styles.textInfo}>{duration + " min"}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>Início:</Text>
          <Text style={styles.textInfo}>{time}</Text>
        </View>
        <View Text style={{marginLeft: 10}}>
          <Text style={styles.text}>Descrição:</Text>
          <Text style={styles.textDescription}>
            {route.params.class.description}
          </Text>
        </View>
        {user.role === "teacher" || user.role === "admin" ? (
          <View style={styles.editContainer}>
            <Pressable
              onPress={() =>
                navigation.navigate("editPage", { class: route.params.class })
              }
            >
              <Image source={require("../../src/assets/pencil.png")}></Image>
            </Pressable>
          </View>
        ) : (
          <></>
        )}
      </View>
      <Footer></Footer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    marginBottom: 90,
    width: "100%",
    backgroundColor: "#ECFFF8",
  },
  editContainer: {
    flex: 1,
    position: "absolute",
    bottom: 10,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  infoBox: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 40,
    width: "40%",
    marginBottom: 10,
    marginLeft: 10,
  },
  image: {
    width: "100%",
    height: "40%",
    marginBottom: 10,
  },
  text: {
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#230E49",
  },
  textInfo: {
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#230E49",
    marginLeft: 10,
  },

  textDescription: {
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#230E49",
    marginLeft: 10,
  },
});

export default ClassPage;
