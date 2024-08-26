import { Text, TouchableOpacity, View } from 'react-native';
import { ListItem } from '@rneui/themed';
import { PropsTask } from '../../interface/Task';
import _map from 'lodash/map';
import _size from 'lodash/size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalFilter from './ModalFilter';
import ModalDetails from './ModalDetails';
import { styles } from './styles';

const TaskModule = ({
  tasksList,
  taskData,
  filterStatus,
  openBottom,
  openModal,
  setFilterStatus,
  setOpenBottom,
  setOpenModal,
  retriveAllTasks,
  taskFindById,
  actualTaskDelete,
  createAndUpdateTask
}: PropsTask): JSX.Element => {
  return (
    <View>
      <Text style={styles.title}>Atividades - {_size(tasksList)}</Text>
      <Text style={styles.description}>
        Veja e gerencie todas as suas atividades e toque em uma tarefa para mais detalhes ou edição.
      </Text>
      <View style={styles.filterFlex}>
        <TouchableOpacity style={{ marginRight: 12 }} onPress={() => createAndUpdateTask("create")}>
          <Ionicons name="create-outline" size={42} color="#004C6D" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOpenBottom(!openBottom)}>
          <Ionicons name="search-circle" size={42} color="#004C6D" />
        </TouchableOpacity>
      </View>
      <View style={styles.mt24}>
        {_map(tasksList, (item) => (
          <TouchableOpacity key={item.id} onPress={() => taskFindById(item.id)}>
            <ListItem containerStyle={styles.listItemContainer} topDivider>
              <ListItem.Content>
                <ListItem.Title style={styles.listItemTitle}>{item.name}</ListItem.Title>
                <ListItem.Subtitle style={{ marginTop: 6 }}>
                  <View style={styles.badgeStatus}>
                    <Text style={styles.badgeStatusText}>
                      {item.status === "NOT_STARTED" ? "Não iniciada" : item.status === "IN_PROGRESS" ? "Em andamento" : "Concluída"}
                    </Text>
                  </View>
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        ))}
      </View>
      <ModalFilter
        filterStatus={filterStatus}
        openBottom={openBottom}
        setFilterStatus={setFilterStatus}
        setOpenBottom={setOpenBottom}
        retriveAllTasks={retriveAllTasks}
      />
      <ModalDetails
        taskData={taskData}
        openModal={openModal}
        setOpenModal={setOpenModal}
        actualTaskDelete={actualTaskDelete}
        createAndUpdateTask={createAndUpdateTask}
      />
    </View>
  );
};

export default TaskModule;