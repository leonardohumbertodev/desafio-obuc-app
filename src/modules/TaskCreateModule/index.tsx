import { TouchableOpacity, View, Text, ActivityIndicator, useWindowDimensions } from 'react-native';
import { Input } from '@rneui/themed';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PropsTaskCreate } from '../../interface/Task';
import _get from 'lodash/get';
import _map from 'lodash/map';
import * as yup from 'yup';
import { statusDefault } from '../../utils';
import { styles } from './styles';

const schema = yup.object({
  name: yup.string().required("O nome é obrigatório."),
  description: yup.string().required("A descrição é obrigatória."),
});

const TaskCreateModule = ({ backAllTasks, createNewTask, setSelectedStatus, selectedStatus, loading }: PropsTaskCreate): JSX.Element => {
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const { width } = useWindowDimensions();

  return (
    <View style={{ width: width <= 1023 ? "100%" : "50%" }}>
      <Text style={styles.title}>Nova Atividade</Text>
      <Text style={styles.description}>Preencha os campos abaixo para criar uma atividade.</Text>
      <View style={styles.mb14}>
        <Text style={styles.labelModal}>Nome:</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Digite o nome da atividade"
              disabled={loading}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              selectionColor="#004C6D"
              cursorColor="#004C6D"
              errorMessage={errors.name && `${_get(errors.name, "message", "")}`}
              containerStyle={{ paddingHorizontal: 0 }}
              inputContainerStyle={[styles.inputContainer, { borderColor: !errors.name ? "#004C6D" : "FF4D4F" }]}
              inputStyle={styles.inputText}
              errorStyle={styles.errorInput}
            />
          )}
        />
      </View>
      <View style={styles.mb14}>
        <Text style={styles.labelModal}>Descrição:</Text>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Digite a descrição da atividade"
              disabled={loading}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              selectionColor="#004C6D"
              cursorColor="#004C6D"
              errorMessage={errors.description && `${_get(errors.description, "message", "")}`}
              containerStyle={{ paddingHorizontal: 0 }}
              inputContainerStyle={[styles.inputContainer, { borderColor: !errors.description ? "#004C6D" : "FF4D4F" }]}
              inputStyle={styles.inputText}
              errorStyle={styles.errorInput}
            />
          )}
        />
      </View>
      <View>
        <Text style={styles.labelModal}>Selecione um status:</Text>
        <View style={[styles.flexBadge, { gap: width < 719 ? 6 : 18 }]}>
          {_map(statusDefault, (item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedStatus(item.value)}
              style={[styles.badge, { borderColor: selectedStatus === item.value ? "#00BE78" : "#004C6D" }]}
            >
              <Text style={styles.badgeText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {loading ? (
        <View style={styles.mt32}>
          <ActivityIndicator size="large" color="#004C6D" />
        </View>
      ) : (
        <>
          <View style={styles.mt32}>
            <TouchableOpacity style={styles.btnPrimary} onPress={handleSubmit(createNewTask)}>
              <Text style={styles.btnPrimaryText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mt32}>
            <TouchableOpacity style={styles.btnSecondary} onPress={backAllTasks}>
              <Text style={styles.btnSecondaryText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default TaskCreateModule;