class FirstName {
  constructor(value) {
    this.value = this.validate(value);
  }

  validate(value) {

    if (value == null) {
      throw new Error('First name is required');
    }
    if (typeof value !== 'string') {
      throw new Error('First name must be a string');
    }
    if (value.length < 2 || value.length > 50) {
      throw new Error('First name must be between 2 and 50 characters');
    }
    return value.trim();
  }

  getValue() {
    return this.value;
  }
}

module.exports = FirstName;
