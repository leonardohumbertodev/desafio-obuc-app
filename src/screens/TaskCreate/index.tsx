import { useState } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useStore } from '../../hooks/useStore';
import { RootStackParamList } from '../../interface/General';
import TaskCreateModule from '../../modules/TaskCreateModule';
import { activeToast } from '../../utils';
import { baseStyles } from '../../styles/global';

type TaskCreateProps = NativeStackScreenProps<RootStackParamList, "TaskCreate">;

const TaskCreate = ({ navigation }: TaskCreateProps): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const { task } = useStore();
  const { taskCreate } = task;

  const handleCreateNewTask = async (body: any) => {
    if (!selectedStatus) return;

    setLoading(true);

    const response: any = await taskCreate({ ...body, status: selectedStatus });

    if (response.status === 200 || response.status === 201 || response.status === 204) {
      setLoading(false);
      activeToast("success", "Deu tudo certo!", "Atividade criada com sucesso.");
      navigation.navigate("Task");
    } else {
      setLoading(false);
      activeToast("error", "Houve um problema", response.message);
    };
  };

  const handleBackAllTasks = (): void => {
    navigation.navigate("Task");
  };

  return (
    <View style={[baseStyles.container, { flex: 1, justifyContent: "center", alignItems: "center" }]}>
      <TaskCreateModule
        loading={loading}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        createNewTask={handleCreateNewTask}
        backAllTasks={handleBackAllTasks}
      />
    </View>
  );
};

export default TaskCreate;