interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}

//  [key: string]: string | number  :   `define que o nome da chave tem q ser uma string, independente que nome seja, e o valor seja um numero ou string ;`
