import { useEffect } from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import { Input } from '@rneui/themed';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PropsTaskUpdate } from '../../interface/Task';
import _get from 'lodash/get';
import _map from 'lodash/map';
import * as yup from 'yup';
import { statusDefault } from '../../utils';
import { styles } from './styles';
import { useWindowDimensions } from 'react-native';

const schema = yup.object({
  name: yup.string().required("O nome é obrigatório."),
  description: yup.string().required("A descrição é obrigatória."),
});

const TaskUpdateModule = ({ backAllTasks, updateActualTask, setSelectedStatus, selectedStatus, taskData, loading }: PropsTaskUpdate): JSX.Element => {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({ resolver: yupResolver(schema) });
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (taskData) {
      setValue('name', _get(taskData, "name", ""))
      setValue('description', _get(taskData, "description", ""))
    };
  }, [taskData]);

  return (
    <View style={{ width: width <= 1023 ? "100%" : "50%" }}>
      <Text style={styles.title}>Atualizar Atividade</Text>
      <Text style={styles.description}>Preencha os campos abaixo para atualizar sua atividade.</Text>
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
        <Text style={styles.labelModal}>Status:</Text>
        <View style={[styles.flexBadge, { gap: width < 719 ? 6 : 18 }]}>
          {_map(statusDefault, (item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedStatus(item.value)}
              style={[styles.badge, { borderColor: (selectedStatus || _get(taskData, "status")) === item.value ? "#00BE78" : "#004C6D" }]}
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
            <TouchableOpacity style={styles.btnPrimary} onPress={handleSubmit(updateActualTask)}>
              <Text style={styles.btnPrimaryText}>Atualizar</Text>
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

export default TaskUpdateModule;