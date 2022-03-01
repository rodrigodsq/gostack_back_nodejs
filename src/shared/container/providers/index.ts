// vs-code-organize-imports-disable-next-line
// desabilitar o auto-import
import './StorageProvider';
import './MailTemplateProvider';
import './MailProvider';


// o container desse arquivo, sera alocado no index do shared/container, para ser usado como injeção de dependencia;
// registerInstance :   para que execute o constructor do "EtherealMailProvider"; cria uma instancia de "EtherealMailProvider";

// fazemos imports sem o 'Parametro' (import'./MailProvider';), pois esta pegando tudo que exite neles e atribuindo aqui, necessariamente nessa ordem;