import React from 'react'
import CustomDataTable from '../../../Components/Datatable/customDataTable'
import { Columns } from './Columns'
import { Trans } from '@lingui/react'

const data = [
  {
    id: 1,
    name: 'Reward1',
    quantity: 22,
    remaining: 22,
    consumed: 22
  },
  {
    id: 2,
    name: 'Reward2',
    quantity: 50,
    remaining: 50,
    consumed: 22
  },
  {
    id: 3,
    name: 'Reward3',
    quantity: 80,
    remaining: 80,
    consumed: 22
  }
]

const List = () => {
  return (
    <>
      <CustomDataTable 
        dataKey="id"
        headerSearch={true}
        columns={Columns()}
        data={data}
        rows={5} 
        rowsPerPageOptions={[5, 10, 25, 50]}
        emptyMessage={<Trans id="No Spinning wheels found" />}
        tableStyle={{ minWidth: '50rem' }}
      />
    </>
  )
}

export default List