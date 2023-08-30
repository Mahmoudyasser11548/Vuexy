import React from 'react'
import CustomModal from '../../../Components/shared/CustomModal'
import CustomDataTable from '../../../Components/Datatable/customDataTable'
import CustomCard from '../../../Components/shared/CustomCard'
import { Trans } from '@lingui/react'
import { Button } from 'reactstrap'
import { useState } from 'react'
import { FilterMatchMode } from 'primereact/api'
import { Plus } from 'react-feather'
import { Columns } from './Columns'
import { useNavigate } from 'react-router-dom'

const data = [
  {
    id: 1,
    name: 'user1',
    email: 'example123@gmail.com'
  },
  {
    id: 2,
    name: 'user2',
    email: 'example123@gmail.com'
  },
  {
    id: 3,
    name: 'user3',
    email: 'example123@gmail.com'
  }
]

const List = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [modalToggle, setModalToggle] = useState(false)

  const filterFieldsSet = {
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS }
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
    <>
      <CustomCard
        title={<Trans id="Users" />}
        showBackButton={false}
        cardHeaderToolbar={
          <Button
            permission="add_user"
            color="primary"
            className="btn-icon"
            outline
            onClick={() => navigate('/user-management/users/details/new')}
          >
            <Plus size={14} />
            <span className="align-middle ml-25">
              <Trans id="create_user" />
            </span>
          </Button>
        }
        body={
          <CustomDataTable
            dataKey="id"
            headerSearch={true}
            filterFieldsSet={filterFieldsSet}
            filterDisplay={false} 
            globalFilterFields={['name', 'email']}
            columns={Columns(deleteHandler, editHandler)}
            data={data}
            selectionMode='single'
            selection={user} 
            onSelectionChange={(e) => setUser(e.value)}
            rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]}
            emptyMessage={<Trans id="No Users found" />}
            tableStyle={{ minWidth: '50rem' }}
          />
        }
      />
      <CustomModal
        title={<Trans id="Delete User" />}
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