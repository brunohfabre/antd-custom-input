import React from "react";
import "./styles.css";
import { Layout, Row, Col, Form } from "antd";

import CustomInput from "./CustomInput";

function App({ form }) {
  const { Header, Footer, Sider, Content } = Layout;

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
                />

                <CustomInput
                  name="telephone"
                  form={form}
                  placeholder="Número de celular"
                  rules={[
                    { required: true, message: "Este campo é obrigatório!" }
                  ]}
                  mask="telephone"
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

                <button type="submit">teste</button>
              </Form>
            </Col>
          </Row>
        </Content>

        <Footer>footer</Footer>
      </Layout>
    </Layout>
  );
}

export default Form.create({ name: "profile" })(App);
