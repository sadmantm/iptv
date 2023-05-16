import re 
def procurarlink(listas):
   padraolink = r"http://.*?(?:=ts|plus|m3u)\b"
   with open(listas,"r") as arquivo:
      conteudo = arquivo.read()
      links_encontrados= re.findall(padraolink,conteudo)

      return links_encontrados
   nome_do_arquivo ="listas.txt"
   links_encontrados = procurar_links_arquivo(nome_do_arquivo)
   for link in links_encontrados:
    print(link)
   



