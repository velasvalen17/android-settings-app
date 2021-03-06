import {
    PERIOD_DS_DB_TRIMMING,
    PERIOD_DS_DOWNLOAD,
} from '../../constants/data-set-settings'

export const parseValueBySettingType = (name, value) => {
    switch (name) {
        case PERIOD_DS_DOWNLOAD:
        case PERIOD_DS_DB_TRIMMING:
            return value ? parseInt(value) : 0
        default:
            return value
    }
}
