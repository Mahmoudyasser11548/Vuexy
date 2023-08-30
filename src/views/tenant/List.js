import React, { useState } from 'react'
import CustomCard from '../../Components/shared/CustomCard'
import { Trans } from '@lingui/react'
import { Button } from 'reactstrap'
import { Plus } from 'react-feather'
import CustomDataTable from '../../Components/Datatable/customDataTable'
import CustomModal from '../../Components/shared/CustomModal'
import { useNavigate } from 'react-router-dom'
import { FilterMatchMode } from 'primereact/api'
import {Columns} from './Columns'
const data = [
  {
    id: 1,
    name: 'tenant1',
    phoneNumber: '010010101010',
    isActive: true
  },
  {
    id: 2,
    name: 'tenant2',
    phoneNumber: '010010101010',
    isActive: true
  },
  {
    id: 3,
    name: 'tenant3',
    phoneNumber: '010010101010',
    isActive: false
  }
]

const List = () => {
  const navigate = useNavigate()
  const [tenant, setTenant] = useState()
  const [modalToggle, setModalToggle] = useState(false)

  const filterFieldsSet = {
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phoneNumber: { value: null, matchMode: FilterMatchMode.CONTAINS }
  }

  // Toggle Modals functions
  const toggle = () => setModalToggle(!modalToggle)

  // handlers 
  const deleteHandler = () => {
    toggle()
  }

  const editHandler = () => {
  }

  return (
    <CustomCard 
      title={<Trans id="Tenants" />}
      cardHeaderToolbar={
        <>
          <Button
            color="primary"
            className="btn-icon"
            outline
            onClick={() => navigate('/tenant/details/new')}
          >
            <Plus size={14} />
            <span className="align-middle ml-25 ms-1">
              <Trans id="Create Tenant" />
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
            globalFilterFields={['name', 'phoneNumber']}
            columns={Columns(deleteHandler, editHandler)}
            data={data}
            selectionMode='single'
            selection={tenant} 
            onSelectionChange={(e) => setTenant(e.value)}
            rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]}
            emptyMessage={<Trans id="No Tenants found" />}
            tableStyle={{ minWidth: '50rem' }}
          /> 
          <CustomModal
            title={<Trans id="delete_tenant" />}
            toggle={toggle}
            modal={modalToggle}
            body={
              <h3>
                <Trans id="are_you_sure_you_want_to_delete" />
              </h3>
            }
            cancelTitle={<Trans id="No" />}
            confirmTitle={<Trans id="Yes" />}
          />
        </>
      }
    />
  )
}

export default List