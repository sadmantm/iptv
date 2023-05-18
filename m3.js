const fs = require('fs');
const { URL } = require('url');
const axios = require('axios');
const iptv = require('iptv-playlist-parser');

function procurarLinksArquivo(nomeArquivo) {
  const conteudo = fs.readFileSync(nomeArquivo, 'utf8');
  const padraoLink = /http:\/\/[^\s'"<>]\b/g;
  const linksEncontrados = conteudo.match(padraoLink) || [];
  return linksEncontrados;
}

function extrairInformacoesLink(link) {
  const parsedUrl = new URL(link);
  const domain = parsedUrl.origin;
  const searchParams = parsedUrl.searchParams;
  const username = searchParams.get('username') || '';
  const password = searchParams.get('password') || '';
  return { domain, username, password };
}

async function verificarLinkIPTV(link) {
  try {
    const response = await axios.get(link, { validateStatus: false });
    const playlist = iptv.parse(response.data);
    if (playlist.items && playlist.items.length > 0) {
      return 'Funcionando';
    } else {
      return 'Playlist vazia ou inválida';
    }
  } catch (error) {
    return 'Erro de conexão';
  }
}

const nomeDoArquivo = 'tv.txt';
const linksEncontrados = procurarLinksArquivo(nomeDoArquivo);
(async () => {
  for (const link of linksEncontrados) {
    const { domain, username, password } = extrairInformacoesLink(link);
    console.log('Host:', domain);
    console.log('Nome de usuário:', username);
    console.log('Senha:', password);
    console.log('Link:', link);
    const status = await verificarLinkIPTV(link);
    console.log('Status:', status);

    console.log('\n');
  }

  console.log('Resultados:', linksEncontrados.length);
})();
