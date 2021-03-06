import { populateSettingObject } from './dataset/populateSettingObject'
import { DATA_SET, DEFAULT, SPECIFIC } from '../constants/data-set-settings'
import {
    PROGRAM,
    specificSettingsDefault,
    WITH_REGISTRATION,
    WITHOUT_REGISTRATION,
} from '../constants/program-settings'
import { populateProgramObject } from './programs/populateProgramObject'
import i18n from '@dhis2/d2-i18n'

/**
 * Prepare specific settings to be save
 */
export const prepareSpecificSettingsToSave = ({
    settingType,
    states,
    specificSettings,
    specificSettingToChange,
    specificSettingsRows,
    specificSettingsNameList,
    settingsCompleteList,
}) => {
    const specificNameKey = states.specificSetting.name
    const objData = specificSettings

    const settingNameFilter = settingsCompleteList.find(
        option => option.id === specificNameKey
    )

    if (settingNameFilter) {
        let settings
        let summarySettings
        if (settingType === PROGRAM) {
            if (settingNameFilter.programType === WITH_REGISTRATION) {
                if (
                    states.specificSetting.settingDownload ||
                    states.specificSetting.teiDownload ||
                    states.specificSetting.enrollmentDownload ||
                    states.specificSetting.enrollmentDateDownload ||
                    states.specificSetting.updateDownload
                ) {
                    settings = populateProgramObject(
                        WITH_REGISTRATION,
                        states.specificSetting
                    )
                } else {
                    settings = populateProgramObject(
                        WITH_REGISTRATION,
                        specificSettingsDefault
                    )
                }
                summarySettings = i18n.t('{{teiDownload}} TEI', {
                    teiDownload: states.specificSetting.teiDownload,
                })
            } else if (settingNameFilter.programType === WITHOUT_REGISTRATION) {
                if (
                    states.specificSetting.settingDownload ||
                    states.specificSetting.eventsDownload ||
                    states.specificSetting.eventDateDownload
                ) {
                    settings = populateProgramObject(
                        WITHOUT_REGISTRATION,
                        states.specificSetting
                    )
                } else {
                    settings = populateProgramObject(
                        WITHOUT_REGISTRATION,
                        specificSettingsDefault
                    )
                }
                summarySettings = i18n.t('{{eventsDownload}} events per OU', {
                    eventsDownload: states.specificSetting.eventsDownload,
                })
            }
        } else if (settingType === DATA_SET) {
            if (states.specificSetting.periodDSDownload >= 0) {
                settings = populateSettingObject(
                    SPECIFIC,
                    states.specificSetting
                )
            } else {
                settings = populateSettingObject(DEFAULT)
            }
            summarySettings = i18n.t(
                '{{periodDSDownload}} {{periodType}} period',
                {
                    periodDSDownload: states.specificSetting.periodDSDownload,
                    periodType: settingNameFilter.periodType,
                }
            )
        }

        objData[specificNameKey] = {
            ...settings,
            id: specificNameKey,
            lastUpdated: new Date().toJSON(),
            name: settingNameFilter.name,
        }

        const newSpecificSettingRow = {
            ...objData[specificNameKey],
            summarySettings,
        }

        specificSettings = objData

        if (specificSettingToChange !== undefined) {
            specificSettingsRows = specificSettingsRows.filter(
                row => row.id !== newSpecificSettingRow.id
            )
            specificSettingsRows.push(newSpecificSettingRow)

            const nameList = specificSettingsNameList
            specificSettingsNameList = nameList.filter(
                name => name !== states.specificSetting.name
            )
        } else {
            specificSettingsRows.push(newSpecificSettingRow)
        }

        specificSettingsNameList.push(states.specificSetting.name)
    }

    return {
        specificSettings,
        specificSettingsRows,
        specificSettingsNameList,
    }
}
