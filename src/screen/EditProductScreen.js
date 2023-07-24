import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {InputComponent} from '../component/InputComponent';
import {categoryList} from '../../data/data';
import SelectDropdown from 'react-native-select-dropdown';
import realm from '../../store/realm';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';

const EditProductScreen = props => {
  const {navigation} = props;
  const {route} = props;
  const idProduct = route.params.idProduct;
  const [productData, setProductData] = useState({
    foodName: '',
    imagePath: '',
    category: null,
    description: '',
    price: null,
  });

  useEffect(() => {
    const data = realm.objects('productFood').filtered(`id = ${idProduct}`)[0];
    setProductData({
      foodName: data.foodName,
      imagePath: data.imagePath,
      category: data.category,
      description: data.description,
      price: String(data.price),
    });
  }, [idProduct]);
  const onInputChange = (type, value) => {
    setProductData({
      ...productData,
      [type]: value,
    });
  };

  const addImage = () => {
    ImagePicker.openPicker({
      width: 2000,
      height: 2000,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setProductData({
          ...productData,
          imagePath: image.path,
        });
      })
      .catch(errorMessage => {
        console.log(errorMessage);
      });
  };

  const saveData = () => {
    const updatedData = realm
      .objects('productFood')
      .filtered(`id = ${idProduct}`)[0];
    if (
      productData.foodName === '' ||
      productData.imagePath === '' ||
      productData.description === '' ||
      productData.price === '' ||
      productData.category === null
    ) {
      alert('Please fill all ');
    } else {
      if (
        updatedData.foodName === productData.foodName &&
        updatedData.imagePath === productData.imagePath &&
        updatedData.category === productData.category &&
        updatedData.description === productData.description &&
        updatedData.price === parseInt(updatedData.price)
      ) {
        Alert.alert('Nothing Change', 'You did not change anything', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {

        realm.write(() => {
          updatedData.foodName = productData.foodName;
          updatedData.imagePath = productData.imagePath;
          updatedData.category = productData.category;
          updatedData.description = productData.description;
          updatedData.price = parseInt(productData.price);
        });
        Alert.alert('Success', 'Successfully update your product information', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    }
  };
  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => addImage()}>
            <Image
              style={{
                width: productData.imagePath !== '' ? wp('50%') : 50,
                height: productData.imagePath !== '' ? wp('50%') : 50,
              }}
              source={{
                uri:
                  productData.imagePath !== ''
                    ? productData.imagePath
                    : 'https://assets.webiconspng.com/uploads/2017/02/Photograph-Icon-PNG.png',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalContainer}>
          <InputComponent
            placeholder="Product Name"
            value={productData.foodName}
            onChangeText={text => onInputChange('foodName', text)}
          />
          <SelectDropdown
            data={categoryList}
            defaultButtonText="Select Category"
            onSelect={item => onInputChange('category', item.id)}
            buttonTextAfterSelection={item => {
              return item.name;
            }}
            rowTextForSelection={item => {
              return item.name;
            }}
            buttonStyle={styles.selectDropdown}
            buttonTextStyle={styles.selectText}
            defaultValueByIndex={productData.category - 1}
          />
        </View>
        <View style={styles.horizontalContainer}>
          <InputComponent
            placeholder="Product Description"
            value={productData.description}
            onChangeText={text => onInputChange('description', text)}
            isDescription={true}
          />
          <InputComponent
            placeholder="Price"
            keyboardType="numeric"
            value={productData.price}
            onChangeText={text => onInputChange('price', text)}
            isIcon={true}
            name="dollar"
            type="font-awesome"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => saveData()}>
            <Text style={styles.saveText}>EDIT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  scroll: {
    margin: 8,
    paddingBottom: 8,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  imageButton: {
    width: wp('50%'),
    height: wp('50%'),
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  sellerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 8,
    marginBottom: 0,
    color: 'black',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  saveButton: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'mistyrose',
  },
  saveText: {
    color: 'black',
    fontSize: hp('2.5%'),
  },
  selectDropdown: {
    borderRadius: 10,
    backgroundColor: 'skyblue',
    width: wp('40%'),
    height: hp('4%'),
    marginLeft: 8,
  },
  selectDropdown: {
    borderRadius: 10,
    backgroundColor: 'skyblue',
    width: 150,
    height: 30,
    marginLeft: 8,
  },
  selectText: {
    fontSize: hp('1.5%'),
  },
});

export default EditProductScreen;
