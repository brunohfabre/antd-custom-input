import React from "react";
import { Form, Input } from "antd";
import VMasker from "vanilla-masker";

export default function CustomInput({
  form,
  name,
  rules,
  placeholder,
  mask,
  type
}) {
  const { getFieldDecorator } = form;

  function options() {
    if (mask) {
      switch (mask) {
        case "money":
          return {
            normalize: value => VMasker.toMoney(value ? value : ""),
            rules
          };
        case "date":
          return {
            normalize: value =>
              VMasker.toPattern(value ? value : "", "99/99/9999"),
            rules
          };
        case "zipCode":
          return {
            normalize: value =>
              VMasker.toPattern(value ? value : "", "99999-999"),
            rules
          };
        case "rg":
          return {
            normalize: value =>
              VMasker.toPattern(value ? value : "", "99.999.999-9"),
            rules
          };
        case "cpf":
          return {
            normalize: value =>
              VMasker.toPattern(value ? value : "", "999.999.999-99"),
            rules
          };
        case "cnpj":
          return {
            normalize: value =>
              VMasker.toPattern(value ? value : "", "99.999.999/9999-99"),
            rules
          };
        case "verificationCode":
          return {
            normalize: value => VMasker.toPattern(value ? value : "", "999999"),
            rules
          };
        case "telephone":
          return {
            getValueFromEvent: e => {
              if (e.target.value.length <= 14) {
                return VMasker.toPattern(
                  e.target.value ? e.target.value : "",
                  "(99) 9999-9999"
                );
              }
              if (e.target.value.length === 15) {
                return VMasker.toPattern(
                  e.target.value ? e.target.value : "",
                  "(99) 99999-9999"
                );
              }
            },
            rules
          };

        default:
          return {
            normalize: value => VMasker.toPattern(value ? value : "", mask),
            rules
          };
      }
    }

    return { rules };
  }

  function renderInput() {
    switch (type) {
      case "password":
        return <Input.Password placeholder={placeholder} size="large" />;
      default:
        return <Input placeholder={placeholder} size="large" />;
    }
  }

  return (
    <Form.Item label={placeholder}>
      {getFieldDecorator(name, options())(renderInput())}
    </Form.Item>
  );
}
