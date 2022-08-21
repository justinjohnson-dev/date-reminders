export const queryAllReminders = /* GraphQL */ `
  query MyQuery {
    listDateReminders {
      items {
        birthdays {
          birthdayDate
          birthdayName
        }
        id
        name
        phone_number
      }
    }
  }
`;
