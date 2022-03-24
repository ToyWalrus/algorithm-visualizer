import React, { useState } from 'react';
import SettingsContext, { defaultSettings } from '../model/Settings';

const SettingsProvider = ({ children }: React.PropsWithChildren<any>) => {
	const [settings, updateSettings] = useState(defaultSettings);

	return <SettingsContext.Provider value={{
		settings, updateSettings: ({ algorithmOption, sortSpeed, nodeCount, selectedColors }) => {
			if (!algorithmOption) {
				algorithmOption = settings.algorithmOption;
			}

			if (sortSpeed === undefined || sortSpeed === null) {
				sortSpeed = settings.sortSpeed;
			}

			if (!nodeCount) {
				nodeCount = settings.nodeCount;
			}

			if (!selectedColors) {
				selectedColors = settings.selectedColors;
			} else {
				if (!selectedColors.primaryColor) {
					selectedColors.primaryColor = settings.selectedColors.primaryColor;
				}
				if (!selectedColors.alternateColor) {
					selectedColors.alternateColor = settings.selectedColors.alternateColor;
				}
			}

			console.log({ nodeCount, sortSpeed, selectedColors });

			updateSettings({ algorithmOption, nodeCount, sortSpeed, selectedColors, colorOptions: settings.colorOptions });
		},
	}}>{children}</SettingsContext.Provider>;
};

export default SettingsProvider;