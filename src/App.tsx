import { useState, useEffect } from 'react'
import { Container, Flex, Heading, Table, Text, IconButton } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { CreateUserDialog } from './components/CreateUserDialog'
import { CaretUpIcon, CaretDownIcon } from '@radix-ui/react-icons'

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  age: number;
}

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null)

  const fetchUsers = () => {
    setLoading(true)
    fetch('https://682e10ed746f8ca4a47bc516.mockapi.io/api/v1/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to fetch users. Error:' + err.message)
        setLoading(false)
      })
  }

  const handleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    setSortDirection(newDirection)

    const sortedUsers = [...users].sort((a, b) => {
      if (newDirection === 'asc') {
        return a.age - b.age
      }
      return b.age - a.age
    })

    setUsers(sortedUsers)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) return <Text className="text-center text-xl font-semibold p-4">Loading...</Text>
  if (error) return <Text className="text-center text-red-500 p-4">{error}</Text>

  return (
    <Container className="py-8">
      <Flex justify="between" align="center" mb="6">
        <Heading size="6">Users List</Heading>
        <CreateUserDialog onUserCreated={fetchUsers} />
      </Flex>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="font-semibold">Full Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="font-semibold">Username</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="font-semibold text-center">
              <Flex align="center" justify="center" gap="2">
                Age
                <IconButton variant="ghost" onClick={handleSort}>
                  {sortDirection === 'asc' ? <CaretUpIcon /> : <CaretDownIcon />}
                </IconButton>
              </Flex>
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user => (
            <Table.Row key={user.id} className="hover:bg-gray-50">
              <Table.Cell>{user.firstName} {user.lastName}</Table.Cell>
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell className="text-center">{user.age}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Container>
  )
}

export default App