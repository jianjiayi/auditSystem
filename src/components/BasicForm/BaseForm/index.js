/*
 * @Descripttion:
 * @version:
 * @Author: big bug
 * @Date: 2019-11-19 10:39:54
 * @LastEditTime: 2020-08-19 19:08:32
 */
import React, {useImperativeHandle, useRef, forwardRef} from 'react';
import { Form,Button } from 'antd';
import PropTypes from 'prop-types';
import { renderFormItem, fillFormItems, submitForm } from './extra';
import classNames from 'classnames';

import styles from './index.module.less';

import wrapAuth from '@components/WrapAuth';
const AuthButton = wrapAuth(Button);

const defaultFormLayout = {labelAlign: 'left', labelCol: { span: 5 }, wrapperCol: { span: 15 } };
const formItemLayout = {
  // labelAlign: 'left',
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

function BaseForm(props, ref) {
  const formRef = useRef();

  const {
    className,
    loading = false,
    children,
    okPerms,
    okText,
    okTextType,
    isReset = true,
    layout= 'horizontal',
    formLayout = layout === 'inline' ? null : formItemLayout,
    hideRequiredMark= false,
    form: { getFieldDecorator, validateFields, setFieldsValue, resetFields, getFieldValue, getFieldsValue },
    dataSource= [],
    formValues= {},
    onSearch = ()=>{},
    renderItem= renderFormItem,
  } = props;

  console.log(dataSource)

  // 向父组件暴露的方法
  useImperativeHandle(ref, () => ({
    getFieldValue,
    getFieldsValue,
    validateFields,
    getFieldDecorator, 
    setFieldsValue, 
    resetFields,
  }))

  /**
   * 表单提交时触发
   *
   * @param e
   */
  const onSubmit = e => {
    if (e) e.preventDefault(); // 阻止默认行为
    submit();
  };

  // 设置表单项值
  const onSetFieldsValue = (name, value)=>{
    setFieldsValue(name, value)
  }

  /**
   * 调用表单提交
   */
  const submit = () => {
    const { form, formValues, onSubmit } = props;
    submitForm(form, formValues, onSearch);
  };

  /**
   * 重置表单并搜索
   */
  const reset = () => {
    resetFields();
  };


  const formProps = {
    ref: formRef,
    layout,
    onSubmit,
    hideRequiredMark,
    className: classNames(className, styles.container), 
  }

  const AuthButtonProps = {
    loading,
    perms: okPerms,
    type: okTextType ? okTextType : 'primary',
    htmlType: "submit"
  }

  return (
    <Form {...formProps}>
      {
        fillFormItems(dataSource, formValues).map(item =>
          renderItem(item, getFieldDecorator, formLayout)
        )
      }
      <Form.Item>
        <div className={styles['button-group']}>
          <AuthButton {...AuthButtonProps}>{okText? okText : '查询'}</AuthButton>
          {isReset && <Button onClick={()=>reset()}>重置</Button>}
          { children }
        </div>
      </Form.Item>
    </Form>
  );
}
const WrappedForm = Form.create({
  // 表单项变化时调用
  onValuesChange({ onValuesChange, ...restProps }, changedValues, allValues) {
    if (onValuesChange) onValuesChange(restProps, changedValues, allValues);
  },
})(forwardRef(BaseForm));

export * from './extra';
export default WrappedForm;
