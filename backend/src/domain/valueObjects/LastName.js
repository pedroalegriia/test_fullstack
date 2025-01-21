class LastName {
  constructor(value) {
    this.value = this.validate(value);
  }

  validate(value) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error('Last name is required and cannot be empty');
    }

    if (value.length < 2 || value.length > 50) {
      throw new Error('Last name must be between 2 and 50 characters');
    }

    return value.trim();
  }

  getValue() {
    return this.value;
  }
}

module.exports = LastName;