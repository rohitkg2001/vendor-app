import { combineReducers } from 'redux';
import { taskReducer } from './taskReducer';
import { siteReducer } from './siteReducer';
import { projectReducer } from './projectReducer';
import { inventoryReducer } from './inventoryReducer';
import { vendorReducer } from './vendorReducer';


const reducer = combineReducers({
    tasks: taskReducer,
    site: siteReducer,
    project: projectReducer,
    vendor: vendorReducer,
    inventory: inventoryReducer,
});

export default reducer;