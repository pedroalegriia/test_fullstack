class PhoneNumber {
  constructor(value) {
    this.value = this.validate(value);
  }

  validate(value) {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Ejemplo de regex para validación de teléfono internacional
    if (!phoneRegex.test(value)) {
      throw new Error('Invalid phone number format');
    }

    return value.trim();
  }

  getValue() {
    return this.value;
  }
}

module.exports = PhoneNumber;