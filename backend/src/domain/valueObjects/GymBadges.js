class GymBadges {
  constructor(badges) {
    this.badges = this.validateBadges(badges);
  }

  validateBadges(badges) {
    if (!Array.isArray(badges)) {
      throw new Error('Gym badges should be an array');
    }

    // Eliminar valores vacíos
    const filteredBadges = badges.filter(badge => badge.trim() !== '');

    // Asegurarse de que no haya duplicados
    const uniqueBadges = [...new Set(filteredBadges)];

    if (filteredBadges.length !== uniqueBadges.length) {
      throw new Error('Gym badges should not contain duplicates');
    }

    return uniqueBadges;
  }

  getBadges() {
    return this.badges;
  }
}

module.exports = GymBadges;
