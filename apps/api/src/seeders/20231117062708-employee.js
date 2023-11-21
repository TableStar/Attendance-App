"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */ await queryInterface.bulkInsert("employees", [
      {
        username: "HR-001-Jack",
        email: "bfn68289@zslsz.com",
        password: "blackjoke",
        role: "humanResource",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "HR-002-Siti",
        email: "emailer@gmail.com",
        password: "blackjoke",
        role: "humanResource",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
