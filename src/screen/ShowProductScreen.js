import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet , Linking} from 'react-native'
import React, {useEffect, useState} from 'react'
import realm from '../../store/realm'
import {Icon, CheckBox} from 'react-native-elements'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen-hooks'
import {ButtonComponent} from '../component/ButtonComponent'

const ShowProductScreen = (props) => {
    const {navigation} = props
    const {route} = props;
    const category = route.params.categoryId
    const [data, setData] = useState([])
    const [isRemove, SetIsRemove] =useState(false)
    const [isBuy, setIsBuy] = useState(false)

    const collectData = () => {
        const allData = realm.objects('productFood').filtered(`category = ${category}`)
        const newData = allData.map((item) => {
            item.checkedStatus = false;
            return item
        })

        setData(newData)
        console.log(data)
    }
    useEffect(()=> {
        const productPage = navigation.addListener('focus', ()=> {
            collectData()
        })
        console.log(data)
        return productPage
    }, [])


    const setCheckBox = (id, status) => {
        const newData =data.map ((item) => {
            if(item.id === id){
                item.checkedStatus = !status
            }
            return item;
        })
        setData(newData)
    }

    const onCancel = () => {
        const newData = data.map((item) => {
            item.checkedStatus = false
            return item
        })
        setData(newData)
        SetIsRemove(false)
    }

    const onDelete = () => {
        const checkedTrue = []
        data.forEach((item) => {
            if(item.checkedStatus) {
                checkedTrue.push(item.id)
            }
        });
        if(checkedTrue.length !== 0) {
            realm.write(() => {
                for(i =0; i<checkedTrue.length; i++) {
                    const removeData = realm.objects('productFood').filtered(`id = ${checkedTrue[i]}`)
                    realm.delete(removeData)
                }
            })
            alert("Successfully remove the products !")
            SetIsRemove(false)
            collectData()
        }else{
            alert('Nothing to remove')
        }
    }
    return (
        <View style={styles.mainContainer}>
            <FlatList data={data} contentContainerStyle={styles.flatListContainer} keyExtractor={(item)=> item.id } renderItem = {({item}) => {
                return(
                    <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('EditProduct', {idProduct : item.id})}
                    onLongPress={() =>SetIsRemove(true)}
                    >
                        <View style={styles.productContainer}>
                            <TouchableOpacity onPress={() =>navigation.navigate("ImageZoom", {
                                imagePath : item.imagePath
                            })}>
                                <Image style={styles.image} source={{uri: item.imagePath}} />
                            </TouchableOpacity>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{item.foodName}</Text>
                                <Text style={styles.text}>{item.description}</Text>
                                <Text style={styles.text}>${item.price}</Text>
                            </View>
                        </View>
                        {
                            isRemove ?
                            <CheckBox size={30} containerStyle={styles.checkBox}
                            onPress={() =>setCheckBox(item.id, item.checkedStatus)}
                            checked={item.checkedStatus}
                            />
                            :
                            <TouchableOpacity onPress={() => {
                                buyProduct(item.phoneNumber, item.instagram, item.facebook)
                            }}>
                                <Icon name="shoppingcart" type="antdesign" size={30} />
                            </TouchableOpacity>
                        }

                    </TouchableOpacity>
                )
            }}
            ListEmptyComponent={
                <View style={{alignItems: 'center', margin: 8, color: 'red'}}>
                    <Text>
                        WARNING!
                    </Text>
                    <Text> 
                        No Items, you can add your item!
                    </Text>
                </View>
            }
            />
            {
                isBuy ?
                <View style={styles.modalContainer}>
                    <View style={styles.box}>
                        <TouchableOpacity style={styles.cancel} onPress={()=>setIsBuy(false)}>
                            <Icon name="close" type="antdesign" size={18} />
                        </TouchableOpacity>
                        <Text stye={[styles.sellerText, styles.title]}>
                            Contact the seller through this media :
                        </Text>
                    </View>
                </View>
                : null
            }
            {
                isRemove ?
                <View style={styles.buttonContainer}>
                    <ButtonComponent backgroundColor="red" title="Delete" onPress={() => onDelete()} />
                    <ButtonComponent backgroundColor="green" title="Cancel" onPress={() => onCancel()} />
                </View>
                : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        flex: 1,
        backgroundColor : '#7D7463'
    }, flatListContainer : {
        padding: 8
    }, itemButton : {
        margin : 8,
        padding: 16,
        borderColor: '#EF6262',
        borderWidth: 5,
        backgroundColor: '#A8A196',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }, productContainer : {
        flex: 1,
        flexDirection: 'row',
    }, image : {
        width: wp('25%'),
        height: wp('25%')
    }, textContainer : {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center'
    }, title : {
        color: 'black',
        fontSize : hp('2.5%'),
        fontWeight: 'bold'
    }, text : {
        color: 'black',
        fontSize : hp('2%')
    }, modalContainer : {
        backgroundColor: 'rgba(255,255,255, 0.9)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }, box : {
        width: '80%',
        backgroundColor : 'white',
        padding: 16,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center'
    }, cancel : {
        padding: 8,
        position: 'absolute',
        right: 8,
        top: 8
    }, sellerText : {
        marginBottom : 8,
        marginTop : 32
    }, checkBox : {
        position: 'absolute',
        right : 0
    }, buttonContainer : {
        flexDirection: 'row',
        height : hp('7%')
    }
})

export default ShowProductScreen