import { Modal, TouchableOpacity, Text, View, useWindowDimensions } from 'react-native';
import { PropsModalDetails } from '../../../interface/Task';
import _get from 'lodash/get';
import _map from 'lodash/map'
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { statusDefault } from '../../../utils';
import { styles } from "../styles";

const ModalDetails = ({ createAndUpdateTask, actualTaskDelete, setOpenModal, openModal, taskData }: PropsModalDetails): JSX.Element => {
  const { width } = useWindowDimensions();

  return (
    <Modal visible={openModal} transparent animationType="fade">
      <View style={[styles.modalContainer]}>
        <View style={[styles.modalContent, { width: width < 1023 ? "95%" : "35%" }]}>
          <Text style={styles.titleModal}>{_get(taskData, "name")}</Text>
          <View style={styles.mb14}>
            <Text style={styles.labelModal}>Descrição:</Text>
            <Text style={styles.descriptionModal}>
              {_get(taskData, "description")}
            </Text>
          </View>
          <View style={styles.mb14}>
            <Text style={styles.labelModal}>Status:</Text>
            <View style={styles.flexBadgeModal}>
              {_map(statusDefault, (item, index) => (
                <View key={index} style={[styles.badgeModal, { borderColor: _get(taskData, "status") === item.value ? "#00BE78" : "#004C6D" }]}>
                  <Text style={styles.badgeModalText}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.mb14}>
            <Text style={styles.labelModal}>Data Criação:</Text>
            <Text style={styles.descriptionModal}>{moment(_get(taskData, "created_at")).format("DD/MM/YYYY")}</Text>
          </View>
          <View style={styles.mb14}>
            <Text style={styles.labelModal}>Ultima Atualização:</Text>
            <Text style={styles.descriptionModal}>{moment(_get(taskData, "updated_at")).format("DD/MM/YYYY")}</Text>
          </View>
          <View>
            <Text style={styles.labelModal}>Ações:</Text>
            <View style={{
              display: "flex",
              flexDirection: "row"
            }}>
              <TouchableOpacity onPress={() => actualTaskDelete(_get(taskData, "id", ""))}>
                <Ionicons name="trash-outline" size={32} color="#004C6D" />
              </TouchableOpacity>
              {_get(taskData, "status") !== "COMPLETED" && (
                <TouchableOpacity onPress={() => createAndUpdateTask("update")} style={{ marginLeft: 16 }}>
                  <Ionicons name="pencil-outline" size={32} color="#004C6D" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.mt24}>
            <TouchableOpacity style={styles.btnSecondary} onPress={() => setOpenModal(!openModal)}>
              <Text style={styles.btnSecondaryText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalDetails;