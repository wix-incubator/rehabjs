import {mockGlobal} from '../utils/mockGlobal';
import RehabModule, { ModuleActions } from './rehab-module';

export class ExperimentalModule extends RehabModule {
  constructor() {
    super('[experimental]', '[experimental]');
  }
}

export class ExperimentalModuleActions extends ModuleActions<ExperimentalModule> {
  constructor(module: ExperimentalModule) {
    super(module);
  }

  action3: () => void = () => {};
  action4: () => void = () => {};
}
