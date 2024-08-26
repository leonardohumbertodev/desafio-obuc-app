export interface PropsBody {
  name: string;
  email: string;
  password: string;
};

export interface PropsTask {
  loading?: boolean;
  tasksList: Array<any>;
  taskData: Object;
  filterStatus: string;
  openBottom: boolean;
  openModal: boolean;
  setFilterStatus: (filterStatus: string) => void;
  setOpenBottom: (openBottom: boolean) => void;
  setOpenModal: (openModal: boolean) => void;
  retriveAllTasks: () => void;
  taskFindById: (id: string) => void;
  actualTaskDelete: (id: string) => void;
  createAndUpdateTask: (type: string) => void;
  signOut: () => void;
};

export interface PropsModalDetails {
  loading?: boolean;
  taskData: Object;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  actualTaskDelete: (id: string) => void;
  createAndUpdateTask: (type: string) => void;
};

export interface PropsModalFilter {
  loading?: boolean;
  filterStatus: string;
  openBottom: boolean;
  setFilterStatus: (filterStatus: string) => void;
  setOpenBottom: (openBottom: boolean) => void;
  retriveAllTasks: () => void;
};

export interface PropsTaskCreate {
  loading?: boolean;
  selectedStatus: string;
  setSelectedStatus: (selectedStatus: string) => void;
  createNewTask: (body: any) => void;
  backAllTasks: () => void;
};

export interface PropsTaskUpdate {
  loading?: boolean;
  taskData: Object;
  selectedStatus: string;
  setSelectedStatus: (selectedStatus: string) => void;
  updateActualTask: (body: any) => void;
  backAllTasks: () => void;
};