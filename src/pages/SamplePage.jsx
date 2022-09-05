import React from 'react';
import Page from '../components/layouts/Page';
import { Row, Col } from 'react-bootstrap';
import Content from '../components/layouts/Content';

function SamplePage() {
  return (
    <Page wide={true} pageTitle='Movie Form'>
      <Row className='justify-content-center'>
        <Col sm={12}>
          <Content width='w-100' cssClassNames='bg-light'>
            <h1>This is the Sample Page</h1>
            <h4>COPY ME ...</h4>
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default SamplePage;
