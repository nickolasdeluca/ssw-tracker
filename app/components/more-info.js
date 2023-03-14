import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

export default function MoreInfoModal({ isOpen, onClose, tracking }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior={"inside"}
      isCentered
    >
      <ModalOverlay bg={"blackAlpha.200"} />
      <ModalContent>
        <ModalHeader>Informações detalhadas do rastreio</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            <Text as={"b"}>Data/Hora</Text>: {tracking.data_hora}
          </Text>
          <Text>
            <Text as={"b"}>Data/Hora Efetiva</Text>:{" "}
            {tracking.data_hora_efetiva}
          </Text>
          <Text>
            <Text as={"b"}>Cidade</Text>: {tracking.cidade}
          </Text>
          <Text>
            <Text as={"b"}>Descrição</Text>: {tracking.descricao}
          </Text>
          <Text>
            <Text as={"b"}>Domínio</Text>: {tracking.dominio}
          </Text>
          <Text>
            <Text as={"b"}>Filial</Text>: {tracking.filial}
          </Text>
          <Text>
            <Text as={"b"}>Nome do Recebedor</Text>:{" "}
            {tracking.nome_recebedor != ""
              ? tracking.nome_recebedor
              : "Não informado"}
          </Text>
          <Text>
            <Text as={"b"}>Documento do Recebedor</Text>:{" "}
            {tracking.nro_doc_recebedor != ""
              ? tracking.nro_doc_recebedor
              : "Não informado"}
          </Text>
          <Text>
            <Text as={"b"}>Ocorrência</Text>: {tracking.ocorrencia}
          </Text>
          <Text>
            <Text as={"b"}>Tipo</Text>: {tracking.tipo}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
