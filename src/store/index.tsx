import React from 'react';
import { create } from 'mobx-persist';
import _map from 'lodash/map';
import _includes from 'lodash/includes';
import { Login } from '../hooks/loginStore';
import { Task } from '../hooks/taskStore';

export interface Stores {
  login: Login,
  task: Task,
};

const stores = {
  login: new Login(),
  task: new Task(),
};

const hydrate = create();

const blacklist: any = ["login", "task"];

_map(stores, (store, name) => {
  if (_includes(blacklist, name)) {
    return;
  };

  hydrate(name, store);
});

export const storesContext = React.createContext<Stores>(stores);