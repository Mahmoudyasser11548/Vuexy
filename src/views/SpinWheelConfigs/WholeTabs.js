import React, { useState } from 'react'
import CustomCard from '../../Components/shared/CustomCard'
import { Card, CardBody, Col, Row, TabContent, TabPane } from 'reactstrap'
import Tabs from './Tabs'
import Wheel from './Wheel'
import Fields from './Fields'
import Rewards from './Rewards'
import Segmants from './Segmants'

const WholeTabs = () => {
  const [activeTab, setActiveTab] = useState("1")

  const toggleTab = (tab) => {
    setActiveTab(tab)
  }

  return (
    <>
      <CustomCard 
        title={'spinning wheels'}
        backUrl={'/spinningWheel/list'}
        body={
          <>
            <Row>
              <Col className="mb-2 mb-md-0" md="12">
                <Tabs activeTab={activeTab} toggleTab={toggleTab} />
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <Card>
                  <CardBody>

                    <TabContent activeTab={activeTab}>

                      <TabPane tabId="1">
                        <Wheel
                          activeTab={activeTab} 
                        />
                      </TabPane>

                      <TabPane tabId="2">
                        <Fields
                          activeTab={activeTab} 
                        />
                      </TabPane>

                      <TabPane tabId="3">
                        <Rewards
                          activeTab={activeTab} 
                        />
                      </TabPane>

                      <TabPane tabId="4">
                        <Segmants
                          activeTab={activeTab} 
                        />
                      </TabPane>

                    </TabContent>

                  </CardBody>
                </Card>
              </Col>
            </Row>
          </>
        }
      />
    </>
  )
}

export default WholeTabs