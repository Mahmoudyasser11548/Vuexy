import React, { useState } from 'react'
import { Button } from 'reactstrap'
import CustomCard from '../../Components/shared/CustomCard'
import { Plus } from 'react-feather'
import CustomDataTable from '../../Components/Datatable/customDataTable'
import { Columns } from './Columns'
import {FilterMatchMode} from 'primereact/api'
import { useNavigate } from 'react-router-dom'
import CustomModal from '../../Components/shared/CustomModal'

const data = [
  {
    id: 1,
    name: 'spin1',
    tenant: 'spin1'
  },
  {
    id: 2,
    name: 'spin2',
    tenant: 'spin2'
  },
  {
    id: 3,
    name: 'spin3',
    tenant: 'spin3'
  }
]

const List = () => {
  const navigate = useNavigate()
  const [selectedSpin, setSelectedSpin] = useState({})
  const [modalToggle, setModalToggle] = useState(false)

  // Toggle Modals functions
  const toggle = () => setModalToggle(!modalToggle)

  // handlers 
  const deleteHandler = () => {
    toggle()
  }

  const downloadHandler = () => {
    toggle()
  }

  const editHandler = () => {}

  const filterFieldsSet = {
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    tenant: { value: null, matchMode: FilterMatchMode.CONTAINS }
  }

  return (
    <CustomCard 
      title={'Spinning Wheels'}
      cardHeaderToolbar={
        <>
          <Button
            color="primary"
            className="btn-icon"
            outline
            onClick={() => navigate('/spinWheel/tabs/new')}
          >
            <Plus size={14} />
            <span className="align-middle ml-25 ms-1">
              Add Spinning Wheel
            </span>
          </Button>
        </>
      }
      body={
        <>
          <CustomDataTable 
            dataKey="id"
            headerSearch={true}
            filterFieldsSet={filterFieldsSet}
            filterDisplay={false} 
            globalFilterFields={['name', 'tenant']}
            columns={Columns(deleteHandler, downloadHandler, editHandler)}
            data={data}
            selectionMode='single'
            selection={selectedSpin} 
            onSelectionChange={(e) => setSelectedSpin(e.value)}
            rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]}
            emptyMessage="No Spinning wheels found"
            tableStyle={{ minWidth: '50rem' }}
          /> 
          <CustomModal
            title={'Delete Spin'}
            toggle={toggle}
            modal={modalToggle}
            body={
              <h3>
                are_you_sure_you_want_to_delete?
              </h3>
            }
            cancelTitle={'No'}
            confirmTitle={'Yes'}
          />
        </>
      }
    />
  )
}

export default List