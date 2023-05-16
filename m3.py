import re
from urllib.parse import urlparse, parse_qs
def procurar_links_arquivo(nome_arquivo):
    # Padrão de expressão regular para procurar links
    padrao_link = r"http://[^\s'\"<>]+(?:=ts|plus)\b"

    # Abrir o arquivo para leitura
    with open(nome_arquivo, "r") as arquivo:
        conteudo = arquivo.read()

        # Procurar links usando a expressão regular
        links_encontrados = re.findall(padrao_link, conteudo)

        # Retornar os links encontrados
        return links_encontrados

# Exemplo de uso
nome_do_arquivo = "listas.txt"  # substitua pelo nome do arquivo que deseja procurar os links
links_encontrados = procurar_links_arquivo(nome_do_arquivo)
# Função para extrair o domínio, nome de usuário e senha de uma URL
def extrair_informacoes_link(url):
    parsed_url = urlparse(url)
    domain = parsed_url.netloc
    query_params = parse_qs(parsed_url.query)
    username = query_params.get('username', [''])[0]
    password = query_params.get('password', [''])[0]

    return domain, username, password

# Exemplo de uso
nome_do_arquivo = "listas.txt"  # substitua pelo nome do arquivo que deseja procurar os links
links_encontrados = procurar_links_arquivo(nome_do_arquivo)

# Processar cada link e extrair as informações desejadas
for link in links_encontrados:
    domain, username, password = extrair_informacoes_link(link)
    print("Link:", link)
    print("Domínio:", domain)
    print("Nome de usuário:", username)
    print("Senha:", password)
    print("\n\n")  # Pular linha entre os resultados
