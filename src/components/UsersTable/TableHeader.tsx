import { FC } from 'react';
import { Table, Flex, IconButton } from "@radix-ui/themes";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";

interface TableHeaderProps {
  sortDirection: "asc" | "desc";
  onSort: () => void;
}

export const TableHeader: FC<TableHeaderProps> = ({ sortDirection, onSort }) => (
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeaderCell className="font-semibold">
        Full Name
      </Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell className="font-semibold">
        Username
      </Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell className="font-semibold text-center">
        <Flex align="center" justify="center" gap="2">
          Age
          <IconButton variant="ghost" onClick={onSort}>
            {sortDirection === "asc" ? <CaretUpIcon /> : <CaretDownIcon />}
          </IconButton>
        </Flex>
      </Table.ColumnHeaderCell>
    </Table.Row>
  </Table.Header>
);