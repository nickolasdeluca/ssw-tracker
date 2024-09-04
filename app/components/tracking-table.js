import {
  Flex,
  Button,
  Container,
  Center,
  Card,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  useBreakpointValue,
} from '@chakra-ui/react';
import MoreInfoModal from './more-info';

export default function TrackingTable({ tracking }) {
  const isVertical = useBreakpointValue({ base: true, md: false });

  return (
    <Container maxWidth={'80%'} marginY={5} minWidth={'375px'} paddingX={2}>
      <Center>
        <Card padding={5}>
          <Text fontSize={'xl'} as={'b'}>
            Informações de rastreio
          </Text>
          <Center marginTop={5}>
            {isVertical ? (
              <Box width='100%'>
                {tracking.map((item, index) => (
                  <Box
                    key={index}
                    marginBottom={4}
                    padding={4}
                    border='1px solid #ddd'
                    borderRadius='md'
                  >
                    <Box>
                      <Text as='b'>Data/Hora Efetiva:</Text>{' '}
                      <Text display='inline'>{item.data_hora_efetiva}</Text>
                    </Box>
                    <Box>
                      <Text as='b'>Cidade:</Text>{' '}
                      <Text display='inline'>{item.cidade}</Text>
                    </Box>
                    <Box>
                      <Text as='b'>Situação:</Text>{' '}
                      <Text display='inline'>{item.descricao}</Text>
                    </Box>
                    <Flex width={'100%'} marginTop={3}>
                      <MoreInfoModal tracking={item}></MoreInfoModal>
                    </Flex>
                  </Box>
                ))}
              </Box>
            ) : (
              <Table
                variant={'striped'}
                colorScheme={'teal'}
                padding={5}
                size={'sm'}
              >
                <Thead>
                  <Tr>
                    <Th>Data/Hora</Th>
                    <Th>Cidade</Th>
                    <Th>Situação</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tracking.map((item, index) => (
                    <Tr key={index}>
                      <Td>{item.data_hora_efetiva}</Td>
                      <Td>{item.cidade}</Td>
                      <Td>{item.descricao}</Td>
                      <Td>
                        <MoreInfoModal tracking={item}>
                          <Button size='xs' colorScheme='teal'>
                            Info
                          </Button>
                        </MoreInfoModal>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </Center>
        </Card>
      </Center>
    </Container>
  );
}
