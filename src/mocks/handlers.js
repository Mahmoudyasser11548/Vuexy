import { rest } from 'msw'

export const handlers = [
    rest.post('http://localhost:3000/rules', (req, res, ctx) => {
        return res(ctx.json(
            {
                rule: "RefundRequest",
                property: "Integer",
                operator: "Greater than",
                value: "60",
                id: 1
            }
        ))
    })
]