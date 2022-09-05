import React from 'react';
import Page from '../components/layouts/Page';
import { Row, Col } from 'react-bootstrap';
import Content from '../components/layouts/Content';

function HomePage() {
  return (
    <Page wide={false} pageTitle="Movie Form">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-warning">
            <h1 class="text-light">React Chat Engine Experiment</h1>
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default HomePage;
