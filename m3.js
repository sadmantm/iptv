const fs = require('fs');
const { URL } = require('url');

function procurarLinksArquivo(nomeArquivo) {
  const conteudo = fs.readFileSync(nomeArquivo, 'utf8');
  const padraoLink = /http:\/\/[^\s'"<>]+(?:=ts|plus)\b/g;
  const linksEncontrados = conteudo.match(padraoLink) || [];
  return linksEncontrados;
}

function extrairInformacoesLink(link) {
  const parsedUrl = new URL(link);
  const domain = parsedUrl.hostname;
  const searchParams = parsedUrl.searchParams;
  const username = searchParams.get('username') || '';
  const password = searchParams.get('password') || '';
  return { domain, username, password };
}

const nomeDoArquivo = 'lista.txt';
const linksEncontrados = procurarLinksArquivo(nomeDoArquivo);

linksEncontrados.forEach((link) => {
  const { domain, username, password } = extrairInformacoesLink(link);
  console.log('Link:', link);
  console.log('Domínio:', domain);
  console.log('Nome de usuário:', username);
  console.log('Senha:', password);
  console.log('\n');
});

const numResultados = linksEncontrados.length;
console.log('Número de resultados encontrados:', numResultados);
