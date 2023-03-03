import React from 'react'
import { Button, Link } from '@chakra-ui/react'
const LinkItem = (props) => {
    return (
        <Button as={Link} size="md" w="100%"  href={props.url} isExternal colorScheme="blue" variant="outline">
            {props.name}
        </Button>
    )
}

export default LinkItem