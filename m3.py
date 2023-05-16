import re

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

# Imprimir os links encontrados
for link in links_encontrados:
    print(link)
     print("\n\n")
