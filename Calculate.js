import { memo, useState } from "react";
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';


function Calculator() {
    const [input, setInput] = useState('');
    const [toArray, setToArray] = useState([]);
    const [ptoArray, setpToArray] = useState([]);
    const [vToArray, setvToArray] = useState([]);

  function numbers(value) {
    setInput((preVal) => preVal + value);
  }

  function calculate() {
    if (input.length === 0) {
      return;
    }
    try {
      const sub_result = eval(input).toString();
      setToArray(a => [...a,sub_result]);
    } catch (error) {
      console.log('This is error : ',error);
    }
  }

  function clear() {
    setInput('');
    setToArray([]);
    setpToArray('');
    setvToArray('');
  }

  function back() {
    const reamin_nums = input.slice(0,-1);
    setInput(reamin_nums);
  }

  function percent() {
    const percentage = ((input.split('-')[1]) / (input.split('-')[0])) * 100;
    const value = ((input.split('-')[1]) * (input.split('-')[0] / 100));
    setvToArray(value);
    setpToArray(percentage);
  }
  
  return (
    <>
  <StatusBar barStyle='auto' hidden={true}/>
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {ptoArray ? 
          <Text style={styles.results}>{ptoArray} % is {vToArray}</Text>  
          : 
          toArray && toArray.map((each_array,i) => {
          return (
            <Text key={i} style={styles.results}>{each_array}</Text>
          );
        })
        }
      </ScrollView>
      <View style={styles.typeTextContainer}>
        <Text style={styles.typeText}>
          {!input ? '0' : input}
        </Text>
      </View>
        <View style={styles.touchContainer}>
          <View style={styles.numbersFuction}>
            <TouchableOpacity onPress={() => clear()}><Text style={styles.btn_ac}>AC</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => numbers('7')}><Text style={styles.btn}>7</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => numbers('4')}><Text style={styles.btn}>4</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => numbers('1')}><Text style={styles.btn}>1</Text></TouchableOpacity>
            <TouchableOpacity style={styles.btn_zero} onPress={() => numbers('0')}>
                <Text style={styles.btn_zero}>0</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.numbersFuction}>
            <TouchableOpacity onPress={() => back()}>
              <Text style={styles.btn}>
                B
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => numbers('8')}><Text style={styles.btn}>8</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => numbers('5')}><Text style={styles.btn}>5</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => numbers('2')}><Text style={styles.btn}>2</Text></TouchableOpacity>
          </View>
          <View style={styles.numbersFuction}>
            <TouchableOpacity onPress={() => percent()}><Text style={styles.btn}>%</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => numbers('9')}><Text style={styles.btn}>9</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => numbers('6')}><Text style={styles.btn}>6</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => numbers('3')}><Text style={styles.btn}>3</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => numbers('.')}><Text style={styles.btn}>.</Text></TouchableOpacity>
          </View>
          <View style={styles.pressable_functions}>
            <TouchableOpacity onPress={() => numbers('/')}><Text style={styles.function_texts}>÷</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => numbers('*')}><Text style={styles.function_texts}>×</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => numbers('-')}><Text style={styles.function_texts}>-</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => numbers('+')}><Text style={styles.function_texts}>+</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => calculate()}><Text style={styles.function_texts} >=</Text></TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      marginTop: Platform.OS === 'android' ? '25' : '27',
    },
    scrollContainer: {
      alignItems: 'flex-end',
      paddingHorizontal: 20,
      marginVertical: 10,
    },
    results: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
      paddingVertical: 5,
    },
    typeTextContainer: {
      padding: 10,
    },
    typeText: {
      color: '#fff',
      alignSelf: 'flex-end',
      fontSize: 60,
      fontWeight: 'bold',
      paddingHorizontal: 10,
    },
    touchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    pressable_functions: {
      rowGap: 10 ,
    },
    numbersFuction: {
      rowGap: 10 ,
    },
    function_texts: {
      backgroundColor: '#FF4D00',
      fontSize: 50,
      fontWeight: 'bold',
      textAlign: 'center',
      borderRadius: 50,
      width: 70,
      height: 70,
      color: '#fff',
    },
    btn: {
      backgroundColor: 'grey',
      fontSize: 50,
      fontWeight: 'bold',
      textAlign: 'center',
      borderRadius: 50,
      width: 70,
      height: 70,
      color: '#fff',
    },
    btn_ac: {
      backgroundColor: 'grey',
      fontSize: 45,
      fontWeight: 'bold',
      textAlign: 'center',
      borderRadius: 50,
      width: 70,
      height: 70,
      color: '#fff',
    },
    btn_zero: {
      position: 'absolute',
      bottom: 0,
      backgroundColor: 'grey',
      fontSize: 50,
      fontWeight: 'bold',
      borderRadius: 50,
      width: 150,
      height: 70,
      color: '#fff',
      paddingHorizontal: 30,
    },
  });

export default memo(Calculator);