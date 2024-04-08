import { REG_UPPERCASE_LETTERS, REG_LETTERS, REG_ONLY_SPEC_CHARACTERS } from "@js/constants"

export const hasLetters = (value) => value.replace(REG_LETTERS, '').length

export const hasUppercaseLetters = (value) => value.replace(REG_UPPERCASE_LETTERS, '').length

export const hasSpecCharacter = (value) => value.replace(REG_ONLY_SPEC_CHARACTERS, '').length