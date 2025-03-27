import { View, Text, Alert, TextInput } from 'react-native'
import React, {useState} from 'react'
import axios from 'axios'
import Constants from 'expo-constants'

const API_URL = Constants.expoConfig?.extra?.API_URL;
const Register = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    fName: '',
    lName:'',
  })
  const handleChange = (key:string, value:string) => {
    setForm({...form,[key]: value})
  }
  const handleSubmit = async () => {
    if(!form.email || !form.password || !form.fName || !form.lName) {
      console.log('กรุณากรอกข้อมูลให้ครบ')
      return;
    }
    try {
      await axios.post(`${API_URL}/register`, form)
      Alert.alert('Success', 'สมัครสมาชิกสำเร็จ');
      setForm({email:'',password:'',fName:'',lName:''});
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'สมัครสมาชิกไม่สำเร็จ');
    }
  }
  return (
    <View>
      <Text>Register</Text>
    </View>
  )
}

export default Register