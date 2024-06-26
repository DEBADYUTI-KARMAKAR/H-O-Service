import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import GlobalApi from "../../Utils/GlobalApi";
import BusinessListItem from "./BusinessListItem";
import PageHeading from "../../Components/PageHeading";

export default function BusinessListByCategoryScreen() {
  const param = useRoute().params;

  const [businessList, setBusinessList] = useState([]);
  useEffect(() => {
    param && getbusinessByCategory();
  }, [param]);

  const getbusinessByCategory = () => {
    GlobalApi.getBusinessListByCategory(param.category).then((resp) => {
      setBusinessList(resp.businessLists);
    });
  };
  return (
    <View style={{ padding: 20, paddingTop: 30 }}>
      <PageHeading title={param.category} />
      {businessList?.length > 0 ? (
        <FlatList
          data={businessList}
          renderItem={({ item, index }) => (
            <View>
              <BusinessListItem business={item} />
            </View>
          )}
        />
      ) : (
        <Text
          style={{
            fontFamily: "outfit-mid",
            color: "gray",
            fontSize: 20,
            textAlign: "center",
            marginTop: "20%",
          }}
        >
          No Business Found
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  categoryName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  navContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
