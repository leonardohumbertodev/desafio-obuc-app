import { ActivityIndicator, Modal, View } from 'react-native';
import { baseStyles } from '../../styles/global';

const Loading = (): JSX.Element => {
  return (
    <Modal visible={true} transparent animationType="fade">
      <View style={baseStyles.loadingContainer}>
        <View>
          <ActivityIndicator size="large" color="#004C6D" />
        </View>
      </View>
    </Modal>
  );
};

export default Loading;