import React, { useState } from 'react'
import {Columns} from './Columns'
import { FilterMatchMode } from 'primereact/api'
import CustomCard from '../../Components/shared/CustomCard'
import CustomDataTable from '../../Components/Datatable/customDataTable'
import { Trans } from '@lingui/react'

const data = [
  {
    id: 1,
    name: 'guest1',
    mobile: '010101010010',
    email: 'example@gmail.com',
    reward: 'football',
    spinningWheel: 'PUBG'
  },
  {
    id: 2,
    name: 'guest1',
    mobile: '010101010010',
    email: 'example@gmail.com',
    reward: 'football',
    spinningWheel: 'PUBG'
  },
  {
    id: 3,
    name: 'guest1',
    mobile: '010101010010',
    email: 'example@gmail.com',
    reward: 'football',
    spinningWheel: 'PUBG'
  },
  {
    id: 4,
    name: 'guest1',
    mobile: '010101010010',
    email: 'example@gmail.com',
    reward: 'football',
    spinningWheel: 'PUBG'
  }
]

const List = () => {
  const [guest, setGuest] = useState({})

  const filterFieldsSet = {
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS }
  }

  return (
    <>
      <CustomCard
        title={<Trans id="Guests" />}
        body={
          <CustomDataTable
            dataKey="id"
            headerSearch={true}
            filterFieldsSet={filterFieldsSet}
            filterDisplay={false} 
            globalFilterFields={['name', 'mobile', 'email', 'reward', 'spinningWheel']}
            columns={Columns()}
            data={data}
            selectionMode='single'
            selection={guest} 
            onSelectionChange={(e) => setGuest(e.value)}
            rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]}
            emptyMessage={<Trans id="No Guests found" />}
            tableStyle={{ minWidth: '50rem' }}
          />
        }
      />
    </>
  )
}

export default List