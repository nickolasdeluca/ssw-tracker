'use client';

import {
  Button,
  Card,
  CardBody,
  ChakraProvider,
  Checkbox,
  Container,
  extendTheme,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import TrackingTable from './tracking-table';

export default function Tracker() {
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState([]);
  const [tracking, setTracking] = useState([]);
  const [chaveNfe, setChaveNfe] = useState('');
  const [timerEnabled, setTimerEnabled] = useState(false);
  const toast = useToast();

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: '#E9E9E9',
        },
      },
    },
  });

  const handlePaste = (event) => {
    event.preventDefault();

    const text = event.clipboardData
      .getData('text/plain')
      .replace(/\s/g, '')
      .replace(/\n/g, '')
      .replace(/\t/g, '');

    event.target.value = text;

    handleInputChange(event);
  };

  const handleInputChange = (event) => {
    setChaveNfe(event.target.value);
    localStorage.setItem('chaveNfe', event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setTimerEnabled(event.target.checked);
  };

  const showToast = (title, description, status) => {
    return toast({
      position: 'bottom-left',
      title: title,
      description: description,
      status: status,
      duration: 9000,
      isClosable: true,
    });
  };

  useEffect(() => {
    const chaveNfe = localStorage.getItem('chaveNfe');
    if (chaveNfe) {
      setChaveNfe(chaveNfe);
    }
  }, []);

  useEffect(() => {
    let timer;

    if (timerEnabled) {
      requestTrackingData();

      timer = setInterval(() => {
        requestTrackingData();

        console.info(
          `Consulta automática ativada: ${timerEnabled ? 'Sim' : 'Não'}`
        );

        !timerEnabled ?? clearInterval(timer);
      }, 600000);
    }
    return () => clearInterval(timer);
  }, [timerEnabled]);

  const requestTrackingData = async () => {
    toast.closeAll();

    if (loading === false) setLoading(true);

    if (chaveNfe === '') {
      return showToast(
        '',
        'Informe a chave da nota fiscal eletrônica!',
        'warning'
      );
    }

    if (chaveNfe.length !== 44) {
      return showToast(
        'Chave da nota fiscal eletrônica inválida',
        'Uma chave de nota fiscal eletrônica deve conter 44 digitos!',
        'error'
      );
    }

    try {
      const response = await fetch(`https://ssw.inf.br/api/trackingdanfe`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chave_nfe: chaveNfe,
        }),
      });

      const data = await response.json();

      if (data.success === false) {
        return showToast(
          'Erro ao consultar o transporte da nota fiscal eletrônica',
          `Retorno do serviço de rastreamento: ${data.message}`,
          'error'
        );
      }

      const header = data.documento.header;
      const tracking = data.documento.tracking;

      tracking.forEach((element) => {
        let dataHora = new Date(element.data_hora);
        element.data_hora =
          dataHora.toLocaleDateString() + ' ' + dataHora.toLocaleTimeString();

        let dataHoraEfetiva = new Date(element.data_hora_efetiva);
        element.data_hora_efetiva =
          dataHoraEfetiva.toLocaleDateString() +
          ' ' +
          dataHoraEfetiva.toLocaleTimeString();
      });

      setHeader(header);
      setTracking(tracking);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Container maxWidth={'40%'} marginTop={5} minWidth={'375px'} paddingX={2}>
        <Card maxWidth={'100%'}>
          <Text marginX={5} marginTop={5} fontSize={'xl'} as={'b'}>
            SSW Tracking
          </Text>
          <Text marginX={5} marginTop={5}>
            <Input
              placeholder='Chave da nota fiscal eletrônica'
              size={'md'}
              type='text'
              name='chave_nfe'
              value={chaveNfe}
              onChange={handleInputChange}
              onPaste={handlePaste}
            />
          </Text>
          <Checkbox
            defaultChecked={false}
            marginX={5}
            marginTop={5}
            onChange={handleCheckboxChange}
          >
            Consultar automaticamente a cada 10 minutos
          </Checkbox>
          <Button onClick={requestTrackingData} margin={5} colorScheme={'teal'}>
            Rastrear
          </Button>
        </Card>
      </Container>
      {loading ? null : (
        <Container
          maxWidth={'40%'}
          marginTop={5}
          minWidth={'375px'}
          paddingX={2}
        >
          <Card colorScheme={'teal'}>
            <CardBody>
              <Text fontSize={'xl'} as={'b'}>
                Dados do emissor/destinatário
              </Text>
              <Text marginTop={5}>
                <Text as={'b'}>Remetente</Text>: {header.remetente}
              </Text>
              <Text>
                <Text as={'b'}>Destinatário</Text>: {header.destinatario}
              </Text>
              <Text>
                <Text as={'b'}>Número da nota fiscal eletrônica</Text>:{' '}
                {header.nro_nf}
              </Text>
              <Text>
                <Text as={'b'}>Número do pedido</Text>: {header.pedido}
              </Text>
            </CardBody>
          </Card>
        </Container>
      )}
      {loading ? null : <TrackingTable tracking={tracking}></TrackingTable>}
    </ChakraProvider>
  );
}
