import React from 'react'
import Rules from './Rules'
import {renderWithProviders} from '../../../test-utils'
import {screen} from '@testing-library/react'

describe('Rules Components', () => {
    test('render Correctly', () => { 
        renderWithProviders(<Rules />)

        const titleName = screen.getByRole('heading', {
            name: 'Rules',
            level: 2
        })

        expect(titleName).toBeInTheDocument
    })
})