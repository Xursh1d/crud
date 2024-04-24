import { Text } from '@gravity-ui/uikit'
import React from 'react'

export default function EmptyContent() {
    return (
        <div className='text-center py-2'>
            <Text variant='code-3' color="danger">Not Found!</Text>
        </div>
    )
}
