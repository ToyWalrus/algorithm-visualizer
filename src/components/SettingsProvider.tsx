import React, { useState } from 'react';
import allAlgorithms from '../model/Algorithms';
import SettingsContext, { AlgorithmSettings, defaultSettings } from '../model/SettingsContext';

const storageKey = 'saved-settings';
const savedSettings = localStorage.getItem(storageKey);

const SettingsProvider = ({ children }: React.PropsWithChildren<any>) => {
	const [settings, updateSettings] = useState(() => {
		if (savedSettings) {
			const settings = Object.assign({}, defaultSettings, JSON.parse(savedSettings) as AlgorithmSettings);
			settings.algorithmOption =
				allAlgorithms.find(alg => alg.title === settings.algorithmOption.title) ||
				defaultSettings.algorithmOption;
			return settings;
		}
		return defaultSettings;
	});

	return (
		<SettingsContext.Provider
			value={{
				settings,
				updateSettings: ({ algorithmOption, sortSpeed, nodeCount, selectedColors }) => {
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

					// console.log({ nodeCount, sortSpeed, selectedColors, algorithmOption });
					const updated = {
						algorithmOption,
						nodeCount,
						sortSpeed,
						selectedColors,
					};

					localStorage.setItem(storageKey, JSON.stringify(updated));
					updateSettings(updated);
				},
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
};

export default SettingsProvider;
