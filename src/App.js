import React, { useState } from "react";
import "./styles.css";
import { Layout, Row, Col, Form } from "antd";

import CustomInput from "./CustomInput";

function App({ form }) {
  const [formValue, setFormValue] = useState();

  const { Header, Sider, Content } = Layout;

  function handleSubmit(e) {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (err) {
        console.log(err);
      } else {
        console.log(values);
      }
    });
  }

  return (
    <Layout>
      <Sider>sider</Sider>

      <Layout>
        <Header>header</Header>

        <Content style={{ padding: "20px" }}>
          <Row>
            <Col lg={12}>
              <Form onSubmit={e => handleSubmit(e)}>
                <CustomInput
                  name="username"
                  form={form}
                  placeholder="Nome de usuário"
                  rules={[
                    { required: true, message: "Este campo é obrigatório!" }
                  ]}
                  mask="money"
                />

                <CustomInput
                  name="date"
                  form={form}
                  placeholder="Data de nascimento"
                  rules={[
                    { required: true, message: "Este campo é obrigatório!" }
                  ]}
                  mask="date"
                  inputValue={formValue}
                />

                <CustomInput
                  name="telephone"
                  form={form}
                  placeholder="Número de celular"
                  rules={[
                    { required: true, message: "Este campo é obrigatório!" }
                  ]}
                  mask="telephone"
                  inputValue={formValue}
                />

                <CustomInput
                  name="password"
                  form={form}
                  placeholder="Senha"
                  rules={[
                    { required: true, message: "Este campo é obrigatório!" }
                  ]}
                  type="password"
                />

                <CustomInput
                  name="search"
                  form={form}
                  placeholder="Pesquisar..."
                  rules={[]}
                  type="search"
                />

                <CustomInput
                  name="text"
                  form={form}
                  placeholder="Lorem..."
                  rules={[]}
                  type="textarea"
                />

                <button type="submit">teste</button>
              </Form>

              <button
                onClick={() =>
                  setFormValue({
                    date: "21062000",
                    telephone: "18997812225"
                  })
                }
              >
                formulario
              </button>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Form.create({ name: "profile" })(App);
