import { Modal, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { PropsModalFilter } from '../../../interface/Task';
import _map from 'lodash/map'
import { statusFilter } from '../../../utils';
import { styles } from '../styles';

const ModalFilter = ({ retriveAllTasks, setOpenBottom, setFilterStatus, openBottom, filterStatus }: PropsModalFilter): JSX.Element => {
  const { width } = useWindowDimensions();

  return (
    <Modal visible={openBottom} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { width: width < 1023 ? "95%" : "35%" }]}>
          <Text style={styles.titleBottom}>Filtrar</Text>
          <Text style={styles.descriptionBottom}>Selecione um dos status abaixo para realizar o filtro:</Text>
          <View style={[styles.flexBadgeModalFilter, { flexWrap: width < 719 ? "wrap" : "nowrap", gap: width < 719 ? 6 : 18 }]}>
            {_map(statusFilter, (item, index) => (
              <TouchableOpacity key={index} onPress={() => setFilterStatus(item.value)}>
                <View style={[styles.badgeModal, { borderColor: filterStatus === item.value ? "#00BE78" : "#004C6D" }]}>
                  <Text style={styles.badgeModalText}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.mt24}>
            <TouchableOpacity style={styles.btnPrimary} onPress={retriveAllTasks}>
              <Text style={styles.btnPrimaryText}>Buscar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mt24}>
            <TouchableOpacity style={styles.btnSecondary} onPress={() => setOpenBottom(!openBottom)}>
              <Text style={styles.btnSecondaryText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalFilter;