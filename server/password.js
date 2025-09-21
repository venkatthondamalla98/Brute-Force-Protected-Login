const bcrypt = require("bcrypt");

async function run() {
//   const hash = await bcrypt.hash("password@123", 10);
  const isMatch = await bcrypt.compare("password@123", '$2b$10$lZVm1ADN6mXYMArfV.cFq.NGNrRDg23ar.AoHSiHGokCsqqVXNg5a');
  console.log(isMatch);
}

run();
