import { Container, Flex, Heading } from "@radix-ui/themes";
import { FC } from "react";
import CreateUserDialog from "./components/CreateUserDialog";
import SearchUsers from "./components/SearchUsers";
import { UsersTable } from "./components/UsersTable";

const App: FC = () => {
  return (
    <Container className="py-8">
      <Flex direction="column" gap="4">
        <Flex justify="between" align="center">
          <Heading size="6">Users List</Heading>
          <CreateUserDialog />
        </Flex>
        <SearchUsers />
        <UsersTable />
      </Flex>
    </Container>
  );
};

export default App;
