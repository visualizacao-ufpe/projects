#!/usr/bin/python
# -*- coding: UTF-8 -*-
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
import time
import json

class Evaluator(object):
	"""docstring for Author"""
	def __init__(self, name, category):
		self.name = name
		self.category = category

	def toJSON(self):
		return json.dumps(self, default=lambda o: o.__dict__, 
			sort_keys=True, indent=4)

class Sponsor(object):
	"""docstring for Author"""
	def __init__(self, name, months):
		self.name = name
		self.months = category

	def toJSON(self):
		return json.dumps(self, default=lambda o: o.__dict__, 
			sort_keys=True, indent=4)

class Document(object):
	
	def __init__(self, ies, program, title, autor, type_, data, abstract_pt, keywords_pt, abstract_en, keywords_en, volume, page_count, idiom, library, area, researchLine, researchProjet, sensei, evaluators, tpVinc, tpVes, tpExpc, sameArea, sponsors):
		self.ies = ies
		self.program = program
		self.title = title
		self.autor = autor
		self.type_ = type_
		self.data = data
		self.abstract_pt = abstract_pt
		self.keywords_pt = keywords_pt
		self.abstract_en = abstract_en
		self.keywords_en = keywords_en
		self.volume = volume
		self.page_count = page_count
		self.idiom = idiom
		self.library = library
		self.area = area
		self.researchLine = researchLine
		self.researchProjet = researchProjet
		self.sensei = sensei
		self.evaluators = evaluators
		self.tpVinc = tpVinc
		self.tpVes = tpVes
		self.tpExpc = tpExpc
		self.sameArea = sameArea
		self.sponsors = sponsors

	def toJSON(self):
		return json.dumps(self, default=lambda o: o.__dict__, 
			sort_keys=True, indent=4)

driver = webdriver.Chrome()
driver.get("https://sucupira.capes.gov.br/sucupira/public/consultas/coleta/trabalhoConclusao/listaTrabalhoConclusao.jsf")
assert "Plataforma Sucupira" in driver.title
try:
	universidade_in = driver.find_element_by_id("form:j_idt45:inst:input")
	universidade_in.clear();
	universidade_in.send_keys("UFPE")
	time.sleep(3)
	select = Select(driver.find_element_by_id("form:j_idt45:inst:listbox"))
	select.select_by_visible_text("25001019 UNIVERSIDADE FEDERAL DE PERNAMBUCO (UFPE)")
	time.sleep(2)
	course = Select(driver.find_element_by_name("form:j_idt45:j_idt117"))
	# course.select_by_visible_text(u"CIÊNCIAS DA COMPUTAÇÃO (25001019004P6)")
	course.select_by_visible_text(u"CIÊNCIAS DA COMPUTAÇÃO (25001019062P6)")
	# doc_type = Select(driver.find_element_by_name("form:tipo"))
	# doc_type.select_by_visible_text(u"BIBLIOGRÁFICA")

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
			reg_year = int(driver.find_elements(By.XPATH, "//div[@id='form:j_idt83:div_paginacao']/ul/li")[0].text.split("de")[1].split(" ")[1])
			
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

		ies = driver.find_element_by_id("ies").text
		program = driver.find_element_by_id("programa").text
		title = driver.find_element_by_id("nome").text
		autor = driver.find_element_by_id("autor").text
		type_ = driver.find_element_by_id("tipo").text
		date = driver.find_element_by_id("data").text

		abstract_pt = None
		keywords_pt = None
		abstract_en = None
		keywords_en = None

		try:
			abstract_pt = driver.find_element_by_id("resumo").text
			keywords_pt = driver.find_element_by_id("palavras").text.split(",")
			# import pdb; pdb.set_trace()
		except Exception as e:
			pass
		
		try:
			abstract_en = driver.find_element_by_id("abstract").text
			keywords_en = driver.find_element_by_id("keywords").text.split(",")
			# import pdb; pdb.set_trace()
		except Exception as e:
			pass	

		volume = driver.find_element_by_id("volume").text
		page_count = driver.find_element_by_id("paginas").text
		idiom = driver.find_element_by_id("idioma").text
		library = driver.find_element_by_id("biblioteca").text
		area = driver.find_element_by_id("area").text
		researchLine = driver.find_element_by_id("linha").text

		researchProjet = None

		try:
			researchProjet = driver.find_element_by_id("projeto").text
		except Exception as e:
			pass

		sensei = driver.find_element_by_id("orientador").text
		evaluators = driver.find_elements(By.XPATH, "//table[@class='listagem']")[0].find_elements_by_tag_name("tr")

		evaluators_list = []

		for z in xrange(1,len(evaluators)):
			data = evaluators[z].find_elements_by_tag_name("td")
			evaluators_list.append(Evaluator(data[0].text, data[1].text))

		sponsors_list = []
		try:
			sponsors = driver.find_elements(By.XPATH, "//table[@class='listagem']")[1].find_elements_by_tag_name("tr")

			for z in xrange(1,len(sponsors)):
				data = evaluators[z].find_elements_by_tag_name("td")
				sponsors_list.append(Sponsor(data[0].text, data[1].text))
		except Exception as e:
			pass

		tpVinc = driver.find_element_by_id("tp_vinc").text
		tpVes = driver.find_element_by_id("tp_ies").text
		tpExpc = driver.find_element_by_id("tp_expc").text
		sameArea = driver.find_element_by_id("m_area").text

		doc = Document(ies, program, title, autor, type_, date, abstract_pt, keywords_pt, abstract_en, keywords_en, volume, page_count, idiom, library, area, researchLine, researchProjet, sensei, evaluators_list, tpVinc, tpVes, tpExpc, sameArea, sponsors_list)
		
		# subdata = driver.find_elements(By.XPATH, "//table[@class='listagem']/tbody/tr/td/div/div[@class='form-grid-3']")
		# if subtype_ == u"ARTIGO EM PERIÓDICO":
		# 	doc.setExtension(Periodico(*extract_arguments(subdata)))
		# elif subtype_ == u"LIVRO":
		# 	doc.setExtension(Livro(*extract_arguments(subdata)))
		# elif subtype_ == u"TRABALHO EM ANAIS":
		# 	doc.setExtension(Anais(*extract_arguments(subdata)))
		# elif subtype_ == u"ARTIGO EM JORNAL OU REVISTA":
		# 	doc.setExtension(Journal(*extract_arguments(subdata)))
		# elif subtype_ == u"OUTRO":
		# 	doc.setExtension(Other(*extract_arguments(subdata)))
		# else:
		# 	print "Novo subtipo" + subtype_
		
		print doc.toJSON() + ","

	print "]"
	driver.close()
finally:
	# import pdb; pdb.set_trace()
	driver.quit()