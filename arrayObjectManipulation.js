// User data manipulation utility functions
const filterAdults = (users) => {
  // Handle edge case of empty or invalid input
  if (!Array.isArray(users) || users.length === 0) {
    return [];
  }

  // Filter users who are 18 or older
  return users.filter((user) => {
    // Type checking and validation
    if (
      typeof user !== "object" ||
      user === null ||
      typeof user.age !== "number"
    ) {
      return false;
    }
    return user.age >= 18;
  });
};

const mapUserNames = (users) => {
  // Handle edge case of empty or invalid input
  if (!Array.isArray(users) || users.length === 0) {
    return [];
  }

  // Extract names, filtering out invalid entries
  return users.reduce((names, user) => {
    if (
      typeof user === "object" &&
      user !== null &&
      typeof user.name === "string"
    ) {
      names.push(user.name);
    }
    return names;
  }, []);
};

const groupUsersByCity = (users) => {
  // Handle edge case of empty or invalid input
  if (!Array.isArray(users) || users.length === 0) {
    return {};
  }

  // Group users by city using reduce
  return users.reduce((groupedUsers, user) => {
    // Type checking and validation
    if (
      typeof user !== "object" ||
      user === null ||
      typeof user.city !== "string"
    ) {
      return groupedUsers;
    }

    // Create array for city if it doesn't exist
    if (!groupedUsers[user.city]) {
      groupedUsers[user.city] = [];
    }

    // Add user to their city's array
    groupedUsers[user.city].push(user);
    return groupedUsers;
  }, {});
};

// Test suite
const runTests = () => {
  // Sample test data
  const users = [
    { id: 1, name: "Alice", age: 17, city: "New York" },
    { id: 2, name: "Bob", age: 25, city: "Los Angeles" },
    { id: 3, name: "Charlie", age: 30, city: "New York" },
    { id: 4, name: "Diana", age: 22, city: "Chicago" },
  ];

  // Test filterAdults
  console.log("\nTesting filterAdults:");
  console.log("Normal case:", filterAdults(users));
  console.log("Empty array:", filterAdults([]));
  console.log("Invalid input:", filterAdults(null));
  console.log(
    "Mixed invalid data:",
    filterAdults([
      { id: 1, name: "Alice", age: "17" }, // Invalid age type
      { id: 2, name: "Bob", age: 25 }, // Valid
      null, // Invalid entry
      { id: 4 }, // Missing age
    ])
  );

  // Test mapUserNames
  console.log("\nTesting mapUserNames:");
  console.log("Normal case:", mapUserNames(users));
  console.log("Empty array:", mapUserNames([]));
  console.log("Invalid input:", mapUserNames(null));
  console.log(
    "Mixed invalid data:",
    mapUserNames([
      { id: 1, name: "Alice" },
      { id: 2 }, // Missing name
      null, // Invalid entry
      { id: 4, name: 123 }, // Invalid name type
    ])
  );

  // Test groupUsersByCity
  console.log("\nTesting groupUsersByCity:");
  console.log("Normal case:", groupUsersByCity(users));
  console.log("Empty array:", groupUsersByCity([]));
  console.log("Invalid input:", groupUsersByCity(null));
  console.log(
    "Mixed invalid data:",
    groupUsersByCity([
      { id: 1, name: "Alice", city: "New York" },
      { id: 2, name: "Bob" }, // Missing city
      null, // Invalid entry
      { id: 4, name: "Diana", city: 123 }, // Invalid city type
    ])
  );

  // Test data immutability
  console.log("\nTesting immutability:");
  const originalUsers = [...users];
  filterAdults(users);
  mapUserNames(users);
  groupUsersByCity(users);
  console.log(
    "Original data unchanged:",
    JSON.stringify(users) === JSON.stringify(originalUsers)
  );
};

// Run the tests
runTests();
