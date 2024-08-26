import React from 'react';
import { Stores, storesContext } from '../../store';

export const useStore = (): Stores => React.useContext(storesContext);