import {
    CLEAN,
    dataSetSettingsDefault,
    DEFAULT,
    GLOBAL,
    SPECIFIC,
} from '../../constants/data-set-settings'
const { periodDSDownload } = dataSetSettingsDefault

export const populateSettingObject = (type, settingsList) => {
    let object
    switch (type) {
        case GLOBAL:
            object = {
                periodDSDownload: settingsList.periodDSDownload,
            }
            break
        case SPECIFIC:
            object = {
                periodDSDownload: settingsList.periodDSDownload,
            }
            break
        case DEFAULT:
            object = {
                periodDSDownload,
            }
            break
        case CLEAN:
            object = {
                periodDSDownload: '',
            }
            break
        default:
            break
    }
    return object
}
