import { FilterMatchMode } from 'primereact/api'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Columns } from './Columns'
import { Button } from 'reactstrap'
import CustomCard from '../../../Components/shared/CustomCard'
import { Trans } from '@lingui/react'
import { Plus } from 'react-feather'
import CustomDataTable from '../../../Components/Datatable/customDataTable'
import CustomModal from '../../../Components/shared/CustomModal'

const data = [
  {
    id: 1,
    name: 'Role1'
  },
  {
    id: 2,
    name: 'Role2'
  },
  {
    id: 3,
    name: 'Role3'
  }
]

const List = () => {
  const navigate = useNavigate()
  const [role, setRole] = useState({})
  const [modalToggle, setModalToggle] = useState(false)

  const filterFieldsSet = {
    name: { value: null, matchMode: FilterMatchMode.CONTAINS }
  }

  // Toggle Modals functions
  const toggle = () => setModalToggle(!modalToggle)

  const deleteHandler = () => {
    toggle()
  }
  const editHandler = () => {
    
  }

  return (
    <>
      <CustomCard
        title={<Trans id="role_list" />}
        showBackButton={false}
        cardHeaderToolbar={
          <Button
            permission="add_role"
            color="primary"
            className="btn-icon"
            outline
            onClick={() => navigate('/user-management/roles/details/new')}
          >
            <Plus size={14} />
            <span className="align-middle ml-25"><Trans id="create_role" /></span>
          </Button>
        }
        body={
          <CustomDataTable
            dataKey="id"
            headerSearch={true}
            filterFieldsSet={filterFieldsSet}
            filterDisplay={false} 
            globalFilterFields={['name']}
            columns={Columns(deleteHandler, editHandler)}
            data={data}
            selectionMode='single'
            selection={role} 
            onSelectionChange={(e) => setRole(e.value)}
            rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]}
            emptyMessage={<Trans id="No Roles found" />}
            tableStyle={{ minWidth: '50rem' }}
          />
        }
      />

      <CustomModal
        title={<Trans id="delete_role" />}
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
  )
}

export default List