import { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useStore } from '../../hooks/useStore';
import { RootStackParamList } from '../../interface/General';
import _get from 'lodash/get';
import TaskModule from '../../modules/TaskModule';
import { baseStyles } from '../../styles/global';
import { activeToast } from '../../utils';
import { AuthContext } from '../../hooks/context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loading from '../../components/Loading';
type TaskProps = NativeStackScreenProps<RootStackParamList, "Task">;

const Task = ({ navigation }: TaskProps): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [tasksList, setTasksList] = useState<[]>([]);
  const [taskData, setTaskData] = useState<{}>({});
  const [openBottom, setOpenBottom] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { signOut } = useContext(AuthContext);
  const { task } = useStore();
  const { allTasks, taskById, taskDelete } = task;

  const handleRetriveAllTasks = async () => {
    setLoading(true);

    const response: any = await allTasks(filterStatus);

    if (response.status === 200 || response.status === 201 || response.status === 204) {
      setTasksList(response.data);
      setOpenBottom(false)
      setLoading(false);
    } else {
      setOpenBottom(false)
      setLoading(false);
      activeToast("error", "Houve um problema", response.message);
    };
  };

  useEffect(() => {
    handleRetriveAllTasks();
  }, []);

  const handleTaskFindById = async (id: string) => {
    setLoading(true);

    const response: any = await taskById(id);

    if (response.status === 200 || response.status === 201 || response.status === 204) {
      setTaskData(response.data);
      setOpenModal(true);
      setLoading(false);
    } else {
      setOpenModal(false);
      setLoading(false);
      activeToast("error", "Houve um problema", response.message);
    };
  };

  const handleActualTaskDelete = async (id: any) => {
    setLoading(true);

    const response: any = await taskDelete(id);

    if (response.status === 200 || response.status === 201 || response.status === 204) {
      const newResponse: any = tasksList.filter((item: any) => item.id !== id);
      setTaskData(newResponse);
      activeToast("success", "Deu tudo certo!", "Atividade foi excluída com sucesso.");
      setOpenModal(false);
      setLoading(false);
    } else {
      setOpenModal(false);
      setLoading(false);
      activeToast("error", "Houve um problema", response.message);
    };
  };

  const handleCreateAndUpdateTask = (type: string) => {
    if (type === "create") {
      navigation.navigate("TaskCreate");
    } else {
      setOpenModal(!openModal);
      navigation.navigate("TaskUpdate", { id: _get(taskData, "id", "") });
    };
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading && (
          <Loading />
        )}
        <View style={baseStyles.flexExit}>
          <TouchableOpacity style={baseStyles.rowExit} onPress={signOut}>
            <Text style={baseStyles.textExit}>Sair</Text>
            <Ionicons name="exit-outline" size={22} color="#000000" style={baseStyles.ml10} />
          </TouchableOpacity>
        </View>
        <View style={baseStyles.container}>
          <TaskModule
            tasksList={tasksList}
            taskData={taskData}
            filterStatus={filterStatus}
            openBottom={openBottom}
            openModal={openModal}
            setFilterStatus={setFilterStatus}
            setOpenBottom={setOpenBottom}
            setOpenModal={setOpenModal}
            retriveAllTasks={handleRetriveAllTasks}
            taskFindById={handleTaskFindById}
            actualTaskDelete={handleActualTaskDelete}
            createAndUpdateTask={handleCreateAndUpdateTask}
            signOut={signOut}
          />
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default Task;