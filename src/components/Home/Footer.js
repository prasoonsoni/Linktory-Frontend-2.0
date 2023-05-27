import React from "react";
import { Center, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Text fontSize="xl" color="gray">
      Made with ❤️ by <Link href="https://prasoonsoni.com" isExternal color="blue.500">Prasoon Soni</Link>
    </Text>
  );
};

export default Footer;
