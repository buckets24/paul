/**
 * Maybe this can also be moved to sanity as global defaults that can be changes?
 * We'll have to see. For now will focus on item specific errors from sanity and
 * these will serve as the default.
 */
export const defaultErrorMessages = {
  globalRequiredMsg: 'Dieses Feld ist erforderlich. Bitte geben Sie es an.',
  globalMinLengthMsg: 'Muss mindestens ${min} Zeichen lang sein',

  invalidEmailMsg:
    'Die angegebene E-Mail-Adresse scheint nicht zu existieren oder ist eine temporäre Adresse. Geben Sie bitte eine andere an.',
  requiredEmailMsg: 'Geben Sie bitte eine E-Mail-Adresse an.',
  emailAlreadyExist: 'E-Mail Adresse wird bereits verwendet',

  requiredNumberMsg: 'Dieses Feld ist erforderlich. Bitte geben Sie es an.',
  invalidNumberFormatMsg: 'Dieses Feld darf nur Zahlen enthalten.',
  numberTooLowMsg: 'Diese Zahl ist zu klein. Geben Sie mindestens ${min} ein.',
  numberTooHighMsg: 'Diese Zahl ist zu groß. Geben Sie maximal ${max} ein.',

  invalidPhoneNumberMsg: 'Ungültige Telefonnummer',

  checkboxRequired: 'Dieses Feld ist erforderlich. Bitte geben Sie es an.',

  invalidPasswordMsg:
    'Wählen Sie bitte ein sicheres Passwort aus. Es soll mindestens 8 Zeichen lang sein. Mindestens ein Klein-, ein Großbuchstaben und eine Zahl enthalten.',
  passwordMismatchMsg: 'Passwort stimmt nicht überein',

  usernameAlreadyExists: 'Kürzel wird bereits verwendet',

  roleDefinedMsg: 'Rolle muss definiert werden',
  salutationOneOfMsg: 'Die Anrede muss einer der folgenden Werte sein: Frau, Herr',
};
