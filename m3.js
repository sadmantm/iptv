const fs = require('fs');
const { URL } = require('url');

function procurarLinksArquivo(nomeArquivo) {
  const conteudo = fs.readFileSync(nomeArquivo, 'utf8');
  const padraoLink = /http:\/\/[^\s'"<>]+(?:\m3u|plus|ts)\b/g;
  const linksEncontrados = conteudo.match(padraoLink) || [];
  return linksEncontrados;
}

function extrairInformacoesLink(link) {
  const parsedUrl = new URL(link);
  const domain = parsedUrl.host;
  const colonIndex = domain.indexOf(':');
  const port = colonIndex !== -1 ? domain.substring(colonIndex + 1) : null;
  const searchParams = parsedUrl.searchParams;
  const username = searchParams.get('username') || '';
  const password = searchParams.get('password') || '';
  return { domain, port, username, password };
}






const nomeDoArquivo = 'listas.txt';
const linksEncontrados = procurarLinksArquivo(nomeDoArquivo);

linksEncontrados.forEach((link) => {
  const { domain, username, password } = extrairInformacoesLink(link);
  console.log('URL:', domain);
  console.log('Nome de usuário:', username);
  console.log('Senha:', password);
  console.log('\n');
});
console.log('resultados:',linksEncontrados.length);
