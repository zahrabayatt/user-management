import { FC } from "react";
import { Table, Flex } from "@radix-ui/themes";

const LoadingUsersTableSkeleton: FC = () => (
  <Table.Body>
    {[...Array(20)].map((_, index) => (
      <Table.Row key={index}>
        <Table.Cell>
          <Flex align="center" gap="2">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
          </Flex>
        </Table.Cell>
        <Table.Cell>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
        </Table.Cell>
        <Table.Cell>
          <Flex align="center" justify="between" gap="2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-12" />
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
          </Flex>
        </Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
);

export default LoadingUsersTableSkeleton;
