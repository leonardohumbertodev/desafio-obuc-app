import Toast from 'react-native-toast-message';

export const activeToast = (type: string, title: string, message: string) => {
  return Toast.show({
    type: type,
    text1: title,
    text2: message,
    position: "bottom"
  });
};

export const statusFilter = [
  { label: "Ver Todas", value: "" },
  { label: "Não iniciada", value: "NOT_STARTED" },
  { label: "Em andamento", value: "IN_PROGRESS" },
  { label: "Concluída", value: "COMPLETED" }
];

export const statusDefault = [
  { label: "Não iniciada", value: "NOT_STARTED" },
  { label: "Em andamento", value: "IN_PROGRESS" },
  { label: "Concluída", value: "COMPLETED" }
];