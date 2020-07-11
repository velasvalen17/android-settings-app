import React from 'react'

import {
    dataOptions,
    maxValues,
    metadataOptions,
} from '../../../constants/android-settings'
import { ButtonStrip, CheckboxField, Help } from '@dhis2/ui-core'
import { ReactFinalForm } from '@dhis2/ui'
import {
    Button,
    InputFieldFF,
    SingleSelectFieldFF,
    composeValidators,
    createMinNumber,
    createMaxNumber,
    createMinCharacterLength,
    createPattern,
    number,
    integer,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'

import buttonStyles from '../../../styles/Button.module.css'
import formStyles from '../../../styles/Form.module.css'
import { phoneRegex } from '../../../modules/general/validatePhoneNumber'

const { Field } = ReactFinalForm

const GeneralForm = ({
    handleSaveDialog,
    handleForm,
    handleDisableSettings,
}) => {
    return (
        <ReactFinalForm.Form onSubmit={handleSaveDialog.open}>
            {({ handleSubmit, pristine, form }) => (
                <form onSubmit={handleSubmit}>
                    <div className={formStyles.row}>
                        <Field
                            {...handleForm.getSelect('metadataSync')}
                            label={i18n.t('How often should metadata sync?')}
                            component={SingleSelectFieldFF}
                            options={metadataOptions}
                        />
                    </div>

                    <div className={formStyles.row}>
                        <Field
                            {...handleForm.getSelect('dataSync')}
                            label={i18n.t('How often should data sync?')}
                            component={SingleSelectFieldFF}
                            options={dataOptions}
                        />
                    </div>

                    <div className={formStyles.row}>
                        <Field
                            {...handleForm.getPhoneNumber('numberSmsToSend')}
                            label={i18n.t('SMS Gateway phone number')}
                            helpText={i18n.t(
                                'This phone number is not valid. Must start with + and be at least 4 characters long.'
                            )}
                            component={InputFieldFF}
                            validate={composeValidators(
                                createPattern(phoneRegex),
                                createMinCharacterLength(4)
                            )}
                        />
                    </div>

                    <div className={formStyles.row}>
                        <Field
                            {...handleForm.getPhoneNumber(
                                'numberSmsConfirmation'
                            )}
                            label={i18n.t('SMS Result Sender phone number')}
                            helpText={i18n.t(
                                'This phone number is not valid. Must start with + and be at least 4 characters long.'
                            )}
                            component={InputFieldFF}
                            validate={composeValidators(
                                createPattern(phoneRegex),
                                createMinCharacterLength(4)
                            )}
                        />
                    </div>

                    <div className={formStyles.row}>
                        <Field
                            {...handleForm.getInputNumber('reservedValues')}
                            label={i18n.t(
                                'Reserved values downloaded per TEI attribute'
                            )}
                            type="number"
                            component={InputFieldFF}
                            parse={value => value && parseInt(value)}
                            validate={composeValidators(
                                number,
                                integer,
                                createMinNumber(0),
                                createMaxNumber(maxValues.reservedValues)
                            )}
                        />
                    </div>

                    <div className={formStyles.row}>
                        <CheckboxField
                            label={i18n.t('Encrypt device database')}
                            helpText={i18n.t(
                                'Encrypt all data stored on device. Data can be lost if there are problems with an encrypted database. This will not affect the DHIS2 database stored on an external server.'
                            )}
                            {...handleForm.getCheckbox('encryptDB', pristine)}
                        />
                    </div>

                    <div className={formStyles.rowMargin}>
                        <Button
                            onClick={handleDisableSettings.open}
                            disabled={handleForm.fields.disableAll}
                        >
                            {i18n.t('Disable all settings')}
                        </Button>
                        <Help>
                            {i18n.t(
                                'This will disable and remove all General, Program and Data set settings.'
                            )}
                        </Help>
                    </div>

                    <ButtonStrip className={buttonStyles.container__padding}>
                        <Button
                            primary
                            type="submit"
                            className={buttonStyles.button_marginLeft}
                            disabled={pristine}
                        >
                            {i18n.t('Save')}
                        </Button>
                        <Button
                            //onClick={handleForm.handleReset}
                            // onClick={form.reset(androidSettingsDefault)}
                            disabled={handleForm.fields.disableAll}
                        >
                            {i18n.t('Reset all values to default')}
                        </Button>
                    </ButtonStrip>
                </form>
            )}
        </ReactFinalForm.Form>
    )
}

GeneralForm.propTypes = {
    handleForm: PropTypes.object.isRequired,
    handleSaveDialog: PropTypes.object.isRequired,
    handleDisableSettings: PropTypes.object.isRequired,
}

export default GeneralForm
