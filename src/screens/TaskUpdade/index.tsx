import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useStore } from '../../hooks/useStore';
import { RootStackParamList } from '../../interface/General';
import _get from 'lodash/get';
import TaskUpdateModule from '../../modules/TaskUpdateModule';
import { activeToast } from '../../utils';
import { baseStyles } from '../../styles/global';

type TaskUpdateProps = NativeStackScreenProps<RootStackParamList, "TaskUpdate">;

const TaskUpdate = ({ route, navigation }: TaskUpdateProps): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [taskData, setTaskData] = useState<{}>({});
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const { task } = useStore();
  const { taskUpdate, taskById } = task;
  const { id } = route?.params;

  const handleTaskFindById = async () => {
    setLoading(true);

    const response: any = await taskById(id);

    if (response.status === 200 || response.status === 201 || response.status === 204) {
      setTaskData(response.data);
      setLoading(false);
    } else {
      activeToast("error", "Houve um problema", response.message);
      setLoading(false);
    };
  };

  useEffect(() => {
    if (!id) {
      navigation.navigate("Task");
    };

    handleTaskFindById();
  }, []);

  const handleUpdateActualTask = async (body: any) => {
    if (!selectedStatus) return;

    setLoading(true);

    const response: any = await taskUpdate(_get(taskData, "id"), { ...body, status: selectedStatus });

    if (response.status === 200 || response.status === 201 || response.status === 204) {
      setLoading(false);
      activeToast("success", "Deu tudo certo!", "Atividade atualizado com sucesso.");
      navigation.navigate("Task");
    } else {
      activeToast("error", "Houve um problema", response.message);
      setLoading(false);
    };
  };

  const handleBackAllTasks = (): void => {
    navigation.navigate("Task");
  };

  return (
    <View style={[baseStyles.container, { flex: 1, justifyContent: "center", alignItems: "center" }]}>
      <TaskUpdateModule
        loading={loading}
        taskData={taskData}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        updateActualTask={handleUpdateActualTask}
        backAllTasks={handleBackAllTasks}
      />
    </View>
  );
};

export default TaskUpdate;