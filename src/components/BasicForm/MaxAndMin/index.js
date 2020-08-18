/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-08-18 20:05:05
 * @LastEditTime: 2020-08-18 21:13:35
 */
import React, {useEffect} from 'react';
import { Form, Input, InputNumber } from 'antd';

const InputGroup = Input.Group;

function MaxAndMin(props) {
  const { 
    number = [],
    min= 0,
    max= 100,
    onChangeNumber,
    form:{getFieldDecorator, setFieldsValue, getFieldsValue, getFieldValue, validateFields}
  } = props;

  useEffect(()=>{
    initSelect()
  },[initSelect])

  const initSelect = () => {
    console.log(1111)
    for(var i in number){
      (function(i){
        switch(i){
          case '0':
            setFieldsValue({'Minimum':number[i]});
            break;
          case '1':
            setFieldsValue({'Maximum':number[i]});
            break;
        }
      })(i);
    }
  } 

  const onBlurChange = (type, value) =>{
    if(type == 'Minimum'){
      let Maximum = getFieldValue('Maximum') || 100;
      console.log(Maximum)
      if(value >= Maximum){
        setFieldsValue({'Minimum': ''})
      } 
    }
    if(type == 'Maximum'){
      let Maximum = getFieldValue('Minimum') || 0;
      console.log(Maximum)
      if(value <= Maximum){
        setFieldsValue({'Maximum': ''})
      } 
    }

    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        onChangeNumber([getFieldValue('Minimum'),getFieldValue('Maximum')])
      }else{
        onChangeNumber('')
      }
    });
  }

  
  return (
    <div>
      <InputGroup compact>
        {
          getFieldDecorator('Minimum', {
            rules: [{ required: true}],
            // initialValue: formValues.name5,
          })(<InputNumber min={min} max={max} onBlur={e=>onBlurChange('Minimum', e.currentTarget.value)}></InputNumber>)
        }
        {
          getFieldDecorator('Maximum', {
            rules: [{ required: true}],
            // initialValue: formValues.name5,
          })(<InputNumber min={min} max={max} onBlur={e=>onBlurChange('Maximum', e.currentTarget.value)}></InputNumber>)
        }
        </InputGroup>
    </div>
  )
}

export default Form.create({})(MaxAndMin);
