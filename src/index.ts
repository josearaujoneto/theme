import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IThemeManager } from '@jupyterlab/apputils';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

/**
 * Initialization data for the theme extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'theme:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  requires: [IThemeManager],
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, manager: IThemeManager, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension theme is activated!');
    const style = 'theme/index.css';

    manager.register({
      name: 'theme',
      isLight: true,
      load: () => manager.loadCSS(style),
      unload: () => Promise.resolve(undefined)
    });

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('theme settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for theme.', reason);
        });
    }
  }
};

export default plugin;
