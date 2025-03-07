import isImageUrl from './isImageUrl'

/**
 * Validates that a trust object of a domain follows the BRC-68 protocol
 * @param {object} trust - BRC-68 trust object
 * @param {object} obj
 * @param {boolean} [obj.skipNote = false]
 * @returns
 */
const validateTrust = async (trust, { skipNote = false } = {}) => {
  if (trust.name.length < 5 || trust.name.length > 30) {
    const e = new Error('Trust validation failed, name must be 5-30 characters')
    e.field = 'name'
    throw e
  }
  if (!skipNote) {
    if (trust.note.length < 5 || trust.note.length > 50) {
      const e = new Error('Trust validation failed, note must be 5-50 characters')
      e.field = 'note'
      throw e
    }
  }
  const iconValid = await isImageUrl(trust.icon)
  if (!iconValid) {
    const e = new Error('Trust validation failed, icon image URL is invalid')
    e.field = 'icon'
    throw e
  }
  if (/^(02|03)[a-f0-9]{64}$/.test(trust.identityKey) !== true) {
    const e = new Error('Trust validation failed, public key is invalid')
    e.field = 'publicKey'
    throw e
  }
  return true
}

export default validateTrust
