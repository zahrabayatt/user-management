import { FC } from 'react';
import { Table, Flex, Text } from "@radix-ui/themes";

interface EmptyStateProps {
  searchQuery?: string;
}

export const EmptyState: FC<EmptyStateProps> = ({ searchQuery }) => (
  <Table.Body>
    <Table.Row>
      <Table.Cell colSpan={3}>
        <Flex
          direction="column"
          align="center"
          justify="center"
          className="py-8 gap-2"
        >
          <Text className="text-gray-500">No users found</Text>
          {searchQuery && (
            <Text className="text-sm text-gray-400">
              Try adjusting your search query
            </Text>
          )}
        </Flex>
      </Table.Cell>
    </Table.Row>
  </Table.Body>
);