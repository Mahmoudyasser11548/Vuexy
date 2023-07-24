import React from 'react'
import { Button, Card, CardBody } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'react-feather'
import List from './List'

const Rules = () => {
  const navigate = useNavigate()

  return (
    <>
    <Card>
      <CardBody>
        <div className='d-flex justify-content-between align-items-center'>            
          <h2 className='mb-0'>Rules</h2>
          <Button
            color="primary"
            className="btn-primary ml-2 rounded-pill"
            onClick={() => navigate('/edit')}
          >
            <Plus size={14} />
            <span className="align-middle ml-25 ms-1">
              Create Rule
            </span>
          </Button>
        </div>
        <hr />
        <List />
      </CardBody>
    </Card>
    </>
  )
}

export default Rules