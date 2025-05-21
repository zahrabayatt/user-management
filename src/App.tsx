import { useState, useEffect } from "react";
import {
  Container,
  Flex,
  Heading,
  Table,
  Text,
  IconButton,
  TextField,
} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { CreateUserDialog } from "./components/CreateUserDialog";
import {
  CaretUpIcon,
  CaretDownIcon,
  DragHandleDots2Icon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  age: number;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = (query = "") => {
    setLoading(true);
    const searchParam = query ? `?username=${query}` : "";
    fetch(
      `https://682e10ed746f8ca4a47bc516.mockapi.io/api/v1/users${searchParam}`
    )
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            return []; // Return empty array for no results
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data ?? []);
        setLoading(false);
        setError(""); // Clear any previous errors
      })
      .catch((err) => {
        setError("Failed to fetch users. Error: " + err.message);
        setUsers([]); // Clear users on error
        setLoading(false);
      });
  };

  const handleSort = () => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);

    const sortedUsers = [...users].sort((a, b) => {
      if (newDirection === "asc") {
        return a.age - b.age;
      }
      return b.age - a.age;
    });

    setUsers(sortedUsers);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const items = [...users];
    const draggedItem = items[draggedIndex];
    items.splice(draggedIndex, 1);
    items.splice(index, 0, draggedItem);

    setUsers(items);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchUsers(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  useEffect(() => {
    fetchUsers();
  }, []);

  if (error)
    return <Text className="text-center text-red-500 p-4">{error}</Text>;

  return (
    <Container className="py-8">
      <Flex direction="column" gap="4">
        <Flex justify="between" align="center">
          <Heading size="6">Users List</Heading>
          <CreateUserDialog onUserCreated={() => fetchUsers(searchQuery)} />
        </Flex>

        <TextField.Root
          placeholder="Search by username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-xs"
        >
          <TextField.Slot>
            <MagnifyingGlassIcon
              height="16"
              width="16"
              className="text-gray-400"
            />
          </TextField.Slot>
        </TextField.Root>

        {loading ? (
          <Text className="text-center text-xl font-semibold p-4">
            Loading...
          </Text>
        ) : (
          <Table.Root variant="surface">
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
                    <IconButton variant="ghost" onClick={handleSort}>
                      {sortDirection === "asc" ? (
                        <CaretUpIcon />
                      ) : (
                        <CaretDownIcon />
                      )}
                    </IconButton>
                  </Flex>
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {loading ? (
                <Table.Row>
                  <Table.Cell colSpan={3}>
                    <Flex align="center" justify="center" className="py-8">
                      <Text className="text-gray-500">Loading users...</Text>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ) : users.length === 0 ? (
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
              ) : (
                users.map((user, index) => (
                  <Table.Row
                    key={user.id}
                    className={`hover:bg-gray-50 ${
                      draggedIndex === index ? "bg-gray-100" : ""
                    }`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                  >
                    <Table.Cell>
                      <Flex align="center" gap="2">
                        <DragHandleDots2Icon className="text-gray-400 cursor-move" />
                        {user.firstName} {user.lastName}
                      </Flex>
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell className="text-center">{user.age}</Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table.Root>
        )}
      </Flex>
    </Container>
  );
}

export default App;
