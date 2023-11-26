import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

const TransactionDetail = ({route}) =>{
    const {transaction} = route.params;
    const {_id} = transaction;
    const [data, setData] = useState([]);
    const filePath = "https://kami-backend-5rs0.onrender.com/transactions/"+_id;
    useEffect(() =>{
        axios.get(filePath)
        .then(response =>{
            setData(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    },[]);
    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={[styles.box,{flex: 3}]}>
                <Text style={styles.title}>General information</Text>
                <View style={styles.content}>
                    <Text style={styles.contentTitle}>Transaction code</Text>
                    <Text style={styles.data}>{data.id}</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.contentTitle}>Customer</Text>
                    <Text style={styles.data}>{data.customer && data.customer.name}</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.contentTitle}>Creation time</Text>
                    <Text style={styles.data}>{moment(data.createdAt).format('MM/DD/YYYY h:mm:ss')}</Text>
                </View>
                
            </View>
            <View style={[styles.box, {flex: 4}]}>
                <Text style={styles.title}>Service list</Text>
                <FlatList data={data.services}
                renderItem={({item})=>(
                    <View style={styles.content}>
                        <Text style={{width: 180}}>{item.name}</Text>
                        <Text>x{item.quantity}</Text>
                        <Text style={styles.data}>{item.price*item.quantity} ₫</Text>
                    </View>
                )}/>
                <View style={{borderWidth: 1, borderColor: "#ebe8e8"}}/>
                <View style={styles.content}>
                    <Text style={styles.contentTitle}>Total:</Text>
                    <Text style={styles.data}>{data.priceBeforePromotion} ₫</Text>
                </View>
            </View>
            <View style={[styles.box,{flex: 3}]}>
                <Text style={styles.title}>Cost</Text>
                <View style={styles.content}>
                    <Text style={styles.contentTitle}>Account of money</Text>
                    <Text style={styles.data}>{data.priceBeforePromotion} ₫</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.contentTitle}>Discount</Text>
                    <Text style={styles.data}>{data.priceBeforePromotion-data.price===0?0:-(data.priceBeforePromotion-data.price)} ₫</Text>
                </View>
                <View style={{borderWidth: 1, borderColor: "#ebe8e8"}}/>
                <View style={styles.content}>
                    <Text style={styles.data}>Total payment</Text>
                    <Text style={styles.payment}>{data.price} ₫</Text>
                </View>
            </View>
            <View style={{flex: 1}}/>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    box: {
        backgroundColor: "#fff",
        borderRadius: 10,
        borderColor: "#757575",
        padding: 10,
        margin: 10
    },
    title: {
        color: "#EF506B",
        fontWeight: "bold",
        paddingBottom: 10
    },
    content:{
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    contentTitle: {
        color: "#807e7e",
        fontWeight: "800"
    },
    data: {
        fontWeight: "900"
    },
    payment: {
        fontSize: 20,
        fontWeight: "900",
        color: "#EF506B"
    }
})
export default TransactionDetail;