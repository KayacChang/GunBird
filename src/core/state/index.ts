import { createStore, combineReducers, Store } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { EntitiesReducer } from './entity';
import { SystemReducer } from './system';

const root = combineReducers({ entity: EntitiesReducer, system: SystemReducer });
const store: Store = createStore(root, devToolsEnhancer({}));

export type AppState = ReturnType<typeof root>;

export { store };
