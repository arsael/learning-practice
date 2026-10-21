export const logError = (error) => {
  console.error(`${new Date().toISOString()} ${error.message}`);
};
