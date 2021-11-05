class EmptyError extends Error {
  constructor(field, options = []) {
    let optionsText = '';
    if (options.length > 0) {
      const lastOption = options.pop();
      optionsText = `${options.join(', ')} or ${lastOption}`;
    }
    super(`Empty ${field}, please provide a non-empty ${field}${optionsText}`);
  }
}
module.exports = EmptyError;
