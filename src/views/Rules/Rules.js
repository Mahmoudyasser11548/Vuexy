import React, { useState } from 'react'
import { Button, Card, CardBody } from 'reactstrap'
import { Plus } from 'react-feather'
import List from './List'
import CustomModal from '../../Components/CustomModal'
import AddRule from './AddRule'

const Rules = () => {
  const [modalCreate, setModalCreate] = useState(false)
  const createToggle = () => setModalCreate(!modalCreate)
  
  return (
    <>
    <Card>
      <CardBody>
        <div className='d-flex justify-content-between align-items-center'>            
          <h2 className='mb-0'>Rules</h2>
          <Button
            color="primary"
            className="btn-primary ml-2 rounded-pill"
            onClick={() => createToggle()}
          >
            <Plus size={14} />
            <span className="align-middle ml-25 ms-1">
              Create Rule
            </span>
          </Button>
        </div>
        <hr />
        <List />
        <CustomModal 
          title="Create Rule"
          toggle={createToggle}
          modal={modalCreate}
          body={<AddRule />}
          modalFooter={false}
        />
      </CardBody>
    </Card>
    </>
  )
}

export default Rules