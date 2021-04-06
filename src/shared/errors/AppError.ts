class AppError {
  // readonly: deixa meio que private para alterar o valor da propriedade(var);
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
