import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import React from "react";
import {ChevronRightIcon} from "@chakra-ui/icons";

// import { ChevronRightIcon } from "@chakra-ui/icons";

function NavigationShow({ routes }) {
  return (
    <>
      <Breadcrumb
          spacing="8px"
          py={4}
          px={10}
          separator={<ChevronRightIcon color="gray.500" />}
        >
          {routes?.map((routName,i) => (
            <BreadcrumbItem key={i}>
              <BreadcrumbLink>{routName}</BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
    </>
  );
}

export default NavigationShow;
