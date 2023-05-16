const fs = require('fs');
const { URL } = require('url');

function procurarLinksArquivo(nomeArquivo) {
  const conteudo = fs.readFileSync(nomeArquivo, 'utf8');
  const padraoLink = /http:\/\/[^\s'"<>]+(?:\m3u|plus|ts)\b/g;
  const linksEncontrados = conteudo.match(padraoLink) || [];
  return linksEncontrados;
}

function extrairInformacoesLink(link) {
  function extrairInformacoesLink(link) {
  const parsedUrl = new URL(link);
  const domain = parsedUrl.origin;
  const searchParams = parsedUrl.searchParams;
  const username = searchParams.get('username') || '';
  const password = searchParams.get('password') || '';
  return { domain, username, password };
}
const nomeDoArquivo = 'listas.txt';
const linksEncontrados = procurarLinksArquivo(nomeDoArquivo);

linksEncontrados.forEach((link) => {
  const { domain, username, password } = extrairInformacoesLink(link);
  console.log('URL:', 'http://' + domain);
  console.log('Nome de usuário:', username);
  console.log('Senha:', password);
  console.log('\n');
console.log('Possíveis portas: 80, 8080, 25461 e nada');
console.log('resultados:',linksEncontrados.length);
