const fs = require('fs');
const { URL } = require('url');

function procurarLinksArquivo(nomeArquivo) {
  // Leitura síncrona do arquivo
  const conteudo = fs.readFileSync(nomeArquivo, 'utf8');

  // Padrão de expressão regular para procurar links
  const padraoLink = /http://[^\s'"<>]+(?:=ts|plus|m3u)\b/g;

  // Procurar links usando a expressão regular
  const linksEncontrados = conteudo.match(padraoLink)  [];

  // Retornar os links encontrados
  return linksEncontrados;
}

// Função para extrair o domínio, nome de usuário e senha de uma URL
function extrairInformacoesLink(url) {
  const parsedUrl = new URL(url);
  const domain = parsedUrl.hostname;
  const params = parsedUrl.searchParams;
  const username = params.get('username')  '';

  const password = params.get('password') || '';

  return { domain, username, password };
}

// Exemplo de uso
const nomeDoArquivo = 'arquivo.txt'; // substitua pelo nome do arquivo que deseja procurar os links
const linksEncontrados = procurarLinksArquivo(nomeDoArquivo);

// Processar cada link e extrair as informações desejadas
linksEncontrados.forEach((link) => {
  const { domain, username, password } = extrairInformacoesLink(link);
  console.log('Link:', link);
  console.log('Domínio:', domain);
  console.log('Nome de usuário:', username);
  console.log('Senha:', password);
  console.log();
});

// Imprimir o número de resultados encontrados
const numResultados = linksEncontrados.length;
console.log('Número de resultados encontrados:', numResultados);