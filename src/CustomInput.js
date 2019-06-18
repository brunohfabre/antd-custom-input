import React from "react";
import { Form, Input } from "antd";
import VMasker from "vanilla-masker";

export default function CustomInput({
  form,
  name,
  rules,
  placeholder,
  mask,
  type,
  maxLength,
  inputValue = null
}) {
  const { getFieldDecorator } = form;
  const { Password, Search, TextArea } = Input;

  function selectMaskType(value) {
    if (value && mask) {
      switch (mask) {
        case "money":
          return VMasker.toMoney(value);
        case "date":
          return VMasker.toPattern(value, "99/99/9999");
        case "zipCode":
          return VMasker.toPattern(value, "99999-999");
        case "rg":
          return VMasker.toPattern(value, "99.999.999-9");
        case "cpf":
          return VMasker.toPattern(value, "999.999.999-99");
        case "cnpj":
          return VMasker.toPattern(value, "99.999.999/9999-99");
        case "verificationCode":
          return VMasker.toPattern(value, "999999");
        case "telephone":
          if (value && value.length <= 10) {
            return VMasker.toPattern(value, "(99) 9999-9999");
          }
          if (value && value.length >= 11) {
            return VMasker.toPattern(value, "(99) 99999-9999");
          }
          break;
        default:
          return VMasker.toPattern(value, mask);
      }
    }

    return value;
  }

  function options() {
    if (mask === "telephone") {
      return {
        initialValue: selectMaskType(inputValue && inputValue[name]),
        getValueFromEvent: e => {
          if (e.target.value.length <= 14) {
            return VMasker.toPattern(
              e.target.value ? e.target.value : "",
              "(99) 9999-9999"
            );
          }
          if (e.target.value.length >= 15) {
            return VMasker.toPattern(
              e.target.value ? e.target.value : "",
              "(99) 99999-9999"
            );
          }
        },
        rules
      };
    } else {
      return {
        initialValue: selectMaskType(inputValue && inputValue[name]),
        normalize: value => selectMaskType(value),
        rules
      };
    }

    return { rules };
  }

  function renderInput() {
    switch (type) {
      case "password":
        return (
          <Password
            placeholder={placeholder}
            size="large"
            maxLength={maxLength}
          />
        );
      case "search":
        return (
          <Search
            placeholder={placeholder}
            size="large"
            maxLength={maxLength}
          />
        );
      case "textarea":
        return (
          <TextArea
            placeholder={placeholder}
            autosize={{ minRows: 3 }}
            size="large"
          />
        );
      default:
        return (
          <Input placeholder={placeholder} size="large" maxLength={maxLength} />
        );
    }
  }

  return (
    <Form.Item label={placeholder}>
      {getFieldDecorator(name, options())(renderInput())}
    </Form.Item>
  );
}
