import React from "react";
import { Box, VStack, Input, Flex, Button } from "@chakra-ui/react";

const LinkCard = ({ children }) => {
    return (
        <Box bg="white" w="full" p={8} borderRadius="md">
            <VStack>
                <Input placeholder='Name' />
                <Input placeholder='Link' />
                <Flex spacing="10px">
                </Flex>
            </VStack>
        </Box>
    );
};

export default LinkCard;
