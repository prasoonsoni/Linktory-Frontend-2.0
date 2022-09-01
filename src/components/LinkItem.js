import React from 'react'
import { Button, Link } from '@chakra-ui/react'
const LinkItem = (props) => {
    return (
        <Button as={Link} width="80%"  href={props.url} isExternal colorScheme="blue" variant="outline" fontSize="xs">
            {props.name}
        </Button>
    )
}

export default LinkItem