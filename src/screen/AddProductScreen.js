import {View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
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

const AddProductScreen = () => {
  const [productData, setProductData] = useState({
    productName: '',
    imagePath: '',
    category: null,
    description: '',
    price: null
  });
  const dropDownRef = useRef({});

  useEffect(() => {
    console.log(productData);
  }, [productData]);
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

  const onInputChange = (type, value) => {
    setProductData({
      ...productData,
      [type]: value,
    });
  };

  const saveData = () => {
    if (
      productData.productName === '' ||
      productData.imagePath === '' ||
      productData.description === '' ||
      productData.price === '' ||
      productData.category === null
    ) {
      alert('Please fill all ');
    }else {
      const allData = realm.objects('productFood');
      const lastId = allData.length === 0 ? 0 : allData[allData.length - 1].id;
      realm.write(() => {
        realm.create('productFood', {
          id: lastId + 1,
          foodName: productData.productName,
          imagePath: productData.imagePath,
          category: productData.category,
          description: productData.description,
          price: parseInt(productData.price),

        });
      });
      dropDownRef.current.reset();
      setProductData({
        productName: '',
        imagePath: '',
        category: null,
        description: '',
        price: '',
      });
      alert('Successfully to save the product');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.registView}>
          <Text style={styles.addFoodText}> Register your food </Text>
        </View>
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
            placeholder="Food Name"
            value={productData.productName}
            onChangeText={text => onInputChange('productName', text)}
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
            ref={dropDownRef}
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
            style={styles.save}
            onPress={() => saveData()}>
            <Text style={styles.saveText}>SAVE YOUR PRODUCT</Text>
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
  save: {
    marginTop: 16,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#E55807',

  },
  saveText: {
    color: 'white',
    fontSize: hp('2.5%'),
  },
  selectDropdown: {
    borderRadius: 10,
    backgroundColor: '#A9907E',
    width: 150,
    height: 30,
    marginLeft: 8,
  },
  selectText: {
    fontSize: hp('1.5%'),
  },
  registView: {
    backgroundColor: '#F3AA60',
    padding: 8,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center'
  },
  addFoodText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
    fontFamily: 'gothic'
  }
});

export default AddProductScreen;
