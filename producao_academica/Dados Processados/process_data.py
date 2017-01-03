import json
import unittest
import numpy

def readJSON(data_url):
    with open('data_with_index.json') as json_data:
        dataset = json.load(json_data)
    return dataset

def getProfessorsNames(json_data):
    authors_dict = []
    for academic_work in json_data:
        for author in academic_work['authors']:
            if author['name'] not in authors_dict:
                if author['category'] == 'Docente':
                    authors_dict.append(author['name'])

    return authors_dict

def getAcademicWorkIDs(dataset, professor_name):
    academic_work_ids = []
    for academic_work in dataset:
        names = [x['name'] for x in academic_work['authors']]
        if professor_name in names:
            academic_work_ids.append(academic_work['index'])

    return academic_work_ids

def getProfessorsWorkedWith(dataset, academic_work_ids, professor_name):
    professors_worked_with = []
    for academic_work_id in academic_work_ids:
        works = [x for x in dataset if (x['index'] in academic_work_ids)]

    professors = getProfessorsNames(works)
    return [x for x in professors if x != professor_name]

def getPeople(json_data):
    people_with_duplicates = []
    for academic_work in json_data:
        for author in academic_work['authors']:
            people_with_duplicates.append(author)

    people_names = []
    people_unique = []
    index = 0
    for person in people_with_duplicates:
        if person['name'].upper() not in people_names:
            people_names.append(person['name'].upper())
            person['ID'] = index
            person['name'] = person['name'].upper()
            people_unique.append(person)
            index+=1

    return people_unique

def getPersonName(people, personID):
    print("ID: ")
    print(personID)
    return [x['name'] for x in people if x['ID'] == personID][0]

def getPersonCategory(people, person_name):
    return [x['category'] for x in people if x['name'] == person_name.upper()][0]

def getPersonID(people, person_name):
    return [x['ID'] for x in people if x['name'] == person_name][0]

def getProfessors(people):
    return [x for x in people if x['category']=='Docente']

def getDATASET1():
    export = []
    data = readJSON('data_with_index.json')
    names = getProfessorsNames(data)
    print(len(names))
    for name in names:
        a = {}
        a['name'] = name
        a['works'] = getAcademicWorkIDs(data,name)
        a['professors_worked_with'] = getProfessorsWorkedWith(data, a['works'], name)
        export.append(a)

    #print(export)
    print(len(export))
    with open('work_and_collaboration_by_professor.json' ,'w') as nf:
        json.dump(export, nf)


def getDATASET3():
    people = []
    data = readJSON('data_with_index.json')
    people_with_all_data = getPeople(data)
    for idx, val in enumerate(data):
        for jdx, val2 in enumerate(val['authors']):
            if(val2['name'].upper() not in people):
                people.append(val2['name'].upper())

    matrix = numpy.zeros(shape=(len(people),len(people)),dtype='int')
    for idx, val in enumerate(data):
        for jdx, val2 in enumerate(val['authors']):
            for kdx, val3 in enumerate(val['authors']):
                if(jdx != kdx):
                    indexAuthor1 = people.index(val2['name'].upper())
                    indexAuthor2 = people.index(val3['name'].upper())

                    matrix[indexAuthor1][indexAuthor2] = matrix[indexAuthor1][indexAuthor2] + 1

    nodes = []
    dados = []
    for idx,val in enumerate(people):
        if (matrix[4][idx]>0):
            nodes.append(people[idx])

    for idx,val in enumerate(people):
        if getPersonCategory(people_with_all_data,people[idx]) == 'Docente':
            b = {}
            b['name'] = people[idx]
            b['collaborators'] = []
            index = 0
            for jdx,val2 in enumerate(people):
                if (matrix[idx][jdx]>0):
                    a = {}
                    c = []
                    a['name'] = people[jdx]
                    a['category'] = getPersonCategory(people_with_all_data,people[jdx])
                    a['target'] = str(index)
                    a['quantity_collaborations'] = str(matrix[idx][jdx])
                    c = [people[jdx],getPersonCategory(people_with_all_data,people[jdx]),str(index),str(matrix[idx][jdx])]
                    index+=1
                    b.setdefault('collaborators', []).append(c)
                    nodes.append(a)
            dados.append(b)



    print(matrix)
    #print(nodes)
    with open('new_dataset_test_only_professors.json' ,'w') as nf:
        json.dump(dados, nf)





#getDATASET1()
#getDATASET2()
#getDATASET3()
getDATASET3()

class MyTest(unittest.TestCase):
    def testReadJSON(self):
        self.assertEqual(readJSON('data.json')[0]["ies"],"UNIVERSIDADE FEDERAL DE PERNAMBUCO")

    def testGetAuthors(self):
        data = readJSON('data_with_index.json')
        self.assertEqual(getProfessorsNames(data)[0],"JAELSON FREIRE BRELAZ DE CASTRO")

    def testGetAcacemicWorkIDs(self):
        data = readJSON('data_with_index.json')
        self.assertEqual(getAcademicWorkIDs(data, "ALUIZIO FAUSTO RIBEIRO ARAUJO"),[225, 328, 329, 519, 846, 864, 949])

    def testGetProfessorsWorkedWith(self):
        data = readJSON('data_with_index.json')
        academic_work_ids = getAcademicWorkIDs(data, "ALUIZIO FAUSTO RIBEIRO ARAUJO")
        self.assertEqual(getProfessorsWorkedWith(data, academic_work_ids, "ALUIZIO FAUSTO RIBEIRO ARAUJO"),["HANSENCLEVER DE FRANCA BASSANI"])
        academic_work_ids = getAcademicWorkIDs(data, "JAELSON FREIRE BRELAZ DE CASTRO")
        self.assertEqual(getProfessorsWorkedWith(data, academic_work_ids, "JAELSON FREIRE BRELAZ DE CASTRO"),["CARLA TACIANA LIMA LOURENCO SILVA SCHUENEMANN","ROBSON DO NASCIMENTO FIDALGO","SERGIO CASTELO BRANCO SOARES","FERNANDO JOSE CASTOR DE LIMA FILHO","PAULO HENRIQUE MONTEIRO BORBA"])

    def testGetPeople(self):
        data = readJSON('data_with_index.json')
        self.assertEqual(len(getPeople(data)),1543)

    def testGetCollaboratorsMatrix(self):
        data = readJSON('data_with_index.json')
        people = getPeople(data)
        #self.assertEqual(getCollaboratorsMatrix(data,people),"k")

    def testGetCollaborators(self):
        data = readJSON('data_with_index.json')
        people = getPeople(data)
        professors = getProfessors(people)
        matrix = getCollaboratorsMatrix(data,people)
        self.assertEqual(getCollaborators(matrix,professors),[])

    #"ALUIZIO FAUSTO RIBEIRO ARAUJO",546

#if __name__ == '__main__':
    #unittest.main()
