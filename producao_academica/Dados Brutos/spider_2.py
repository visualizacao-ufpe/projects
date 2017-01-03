#!/usr/bin/python
# -*- coding: UTF-8 -*-
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
import time
import json

class Author(object):
	"""docstring for Author"""
	def __init__(self, order, name, category):
		self.order = order
		self.name = name
		self.category = category

	def toJSON(self):
		return json.dumps(self, default=lambda o: o.__dict__, 
			sort_keys=True, indent=4)
		

class Document(object):
	
	def __init__(self, ies, program, year, name, type_, subtype_, authors, area, researchLine, researchProjet):
		self.ies = ies
		self.program = program
		self.year = year
		self.name = name
		self.type_ = type_
		self.subtype_ = subtype_
		self.authors = authors
		self.area = area
		self.researchLine = researchLine
		self.researchProjet = researchProjet
		self.extension = None

	def setExtension(self, DocExtension):
		self.extension = DocExtension

	def toJSON(self):
		return json.dumps(self, default=lambda o: o.__dict__, 
			sort_keys=True, indent=4)

class DocExtension(object):
	def __init(self):
		self.info = "Doc Extension"

	def toJSON(self):
		return json.dumps(self, default=lambda o: o.__dict__, 
			sort_keys=True, indent=4)

class Periodico(DocExtension):
	def __init__(self, issn, nature, volume, fasciculo, serie, n_finalPage, n_startPage, idiom, advertising, url, observation, editor, city, doi):
		self.issn = issn
		self.nature = nature
		self.volume = volume
		self.fasciculo = fasciculo
		self.serie = serie
		self.n_finalPage = n_finalPage
		self.n_startPage = n_startPage
		self.idiom = idiom
		self.advertising = advertising
		self.url = url
		self.observation = observation
		self.editor = editor
		self.city = city
		self.doi = doi


class Journal(DocExtension):
	def __init__(self, title, data, n_finalPage, n_startPage, idiom, city, country, issn, advertising, url, observation, english_title=None, doi=None):
		self.title = title
		self.data = data
		self.n_finalPage = n_finalPage
		self.n_startPage = n_startPage
		self.idiom = idiom
		self.city = city
		self.country = country
		self.issn = issn
		self.advertising = advertising
		self.url = url
		self.observation = observation
		self.english_title = english_title
		self.doi = doi

class Other(DocExtension):
	def __init__(self, nature, publisher, publisher_city, contry, idiom, page_count, isbn_issn, advertising, url, observation):
		self.nature = nature
		self.publisher = publisher
		self.publisher_city = publisher_city
		self.contry = contry
		self.idiom = idiom
		self.page_count = page_count
		self.isbn_issn = isbn_issn
		self.advertising = advertising
		self.url = url
		self.observation = observation

class Livro(DocExtension):
	def __init__(self, nature, editor, city_country, page_count, isbn, url, observation, title, year_fst_pusblish, tiragem, reedition, reimpresion, advertising_mode, idiom, editor_type, funding, name_funding, editorial_conselor, distribution, parecer, indice, contribution_type, award, award_date, reference_work, institution, indication_date, content_nature, author_info, page_count_contribution, editorial_city=None, extra_param=None):
		self.nature = nature
		self.editor = editor
		self.city_country = city_country
		self.page_count = page_count
		self.isbn = isbn
		self.url = url
		self.observation = observation
		self.title = title
		self.year_fst_pusblish = year_fst_pusblish
		self.tiragem = tiragem
		self.reedition = reedition
		self.reimpresion = reimpresion
		self.advertising_mode = advertising_mode
		self.idiom = idiom
		self.editor_type = editor_type
		self.funding = funding
		self.name_funding = name_funding
		self.editorial_conselor = editorial_conselor
		self.distribution = distribution
		self.parecer = parecer
		self.indice = indice
		self.contribution_type = contribution_type
		self.award = award
		self.award_date = award_date
		self.reference_work = reference_work
		self.institution = institution
		self.indication_date = indication_date
		self.content_nature = content_nature
		self.author_info = author_info
		self.page_count_contribution = page_count_contribution
		self.editorial_city = editorial_city
		self.extra_param = extra_param

class Anais(DocExtension):
	def __init__(self, nature, title, volume, fasciculo, serie, n_finalPage, n_startPage, event_name, event_city, event_country, idiom, isbn_issn, advertising, url, observation, edition):
		self.nature = nature
		self.title = title
		self.volume = volume
		self.fasciculo = fasciculo
		self.serie = serie
		self.n_finalPage = n_finalPage
		self.n_startPage = n_startPage
		self.event_name = event_name
		self.event_city = event_city
		self.event_country = event_country
		self.idiom = idiom
		self.isbn_issn = isbn_issn
		self.advertising = advertising
		self.url = url
		self.observation = observation
		self.edition = edition

def extract_arguments(data):
	result = []
	for dt in data:
		result.append(dt.text)

	return result

driver = webdriver.Chrome()
driver.get("https://sucupira.capes.gov.br/sucupira/public/consultas/coleta/producaoIntelectual/listaProducaoIntelectual.jsf")
assert "Plataforma Sucupira" in driver.title

universidade_in = driver.find_element_by_id("form:j_idt45:inst:input")
universidade_in.clear();
universidade_in.send_keys("UFPE")
time.sleep(3)
select = Select(driver.find_element_by_id("form:j_idt45:inst:listbox"))
select.select_by_visible_text("25001019 UNIVERSIDADE FEDERAL DE PERNAMBUCO (UFPE)")
time.sleep(2)
course = Select(driver.find_element_by_name("form:j_idt45:j_idt122"))
# course.select_by_visible_text(u"CIÊNCIAS DA COMPUTAÇÃO (25001019004P6)")
course.select_by_visible_text(u"CIÊNCIAS DA COMPUTAÇÃO (25001019062P6)")
doc_type = Select(driver.find_element_by_name("form:tipo"))
doc_type.select_by_visible_text(u"BIBLIOGRÁFICA")

documents_links = []

for x in xrange(2013,2017):
	submit = driver.find_element_by_id("form:consultar")
	year = driver.find_element_by_id("form:j_idt45:ano")
	year.clear()
	year.send_keys(x)
	submit.click()
	time.sleep(3)

	#checking if there is results available
	warning = ""

	
	try:
		warning = driver.find_element_by_class_name("aviso").text
	except Exception as e:
		pass

	if(warning is not None and warning == u'N\xe3o existem dados cadastrados para a pesquisa realizada.'):
		print "Sem resultados para o ano " + str(x)
	else:
		reg_year = int(driver.find_elements(By.XPATH, "//div[@id='form:j_idt88:div_paginacao']/ul/li")[0].text.split("de")[1].split(" ")[1])
		
		for x in xrange(1,reg_year, 50):

			links_page = len(driver.find_elements(By.XPATH, "//table/tbody/tr/td/a"))
			default_handler = driver.window_handles[0]

			links = driver.find_elements(By.XPATH, "//table/tbody/tr/td/a[@href]")
			
			for link in links:
				documents_links.append(link.get_attribute("href"))
		
			if reg_year > 50:
				driver.find_element_by_class_name("pag-proxima").click()
				time.sleep(3)

	time.sleep(3)

print "["
for link in documents_links:
	driver.get(link)
	time.sleep(1)
	authors = driver.find_elements(By.XPATH, "//table[@class='listagem']")[0].find_elements_by_tag_name("tr")

	authors_arr = []

	for z in xrange(1,len(authors)):
		data = authors[z].find_elements_by_tag_name("td")
		authors_arr.append(Author(int(data[0].text), data[1].text, data[2].text))

	ies = driver.find_element_by_id("formView:ies").text
	program = driver.find_element_by_id("formView:programa").text
	year = driver.find_element_by_id("formView:periodo").text
	name = driver.find_element_by_id("formView:nome").text
	type_ = driver.find_element_by_id("formView:tipo").text
	subtype_ = driver.find_element_by_id("formView:subtipo").text
	context = driver.find_elements(By.XPATH, "//div[@class='form-container']/div[@class='form-grid-3']")[-3:]
	area = context[0].text
	researchLine = context[1].text
	researchProjet = context[2].text
	doc = Document(ies, program, year, name, type_, subtype_, authors_arr, area, researchLine, researchProjet)
	
	subdata = driver.find_elements(By.XPATH, "//table[@class='listagem']/tbody/tr/td/div/div[@class='form-grid-3']")
	if subtype_ == u"ARTIGO EM PERIÓDICO":
		doc.setExtension(Periodico(*extract_arguments(subdata)))
	elif subtype_ == u"LIVRO":
		doc.setExtension(Livro(*extract_arguments(subdata)))
	elif subtype_ == u"TRABALHO EM ANAIS":
		doc.setExtension(Anais(*extract_arguments(subdata)))
	elif subtype_ == u"ARTIGO EM JORNAL OU REVISTA":
		doc.setExtension(Journal(*extract_arguments(subdata)))
	elif subtype_ == u"OUTRO":
		doc.setExtension(Other(*extract_arguments(subdata)))
	else:
		print "Novo subtipo" + subtype_

	print doc.toJSON() + ","

print "]"
driver.close()