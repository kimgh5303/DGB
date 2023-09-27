import pymysql

class DataBase:
    def __init__(self):
        with open('./secure/dbKey.txt','r',encoding='utf-8') as f:
            self.__hostIp, self.__pw = f.read().split('\n')
        self.__conn = pymysql.connect(host=self.__hostIp,
                                      port=80,
                                      user='root',
                                      passwd=self.__pw,
                                      database='dgb')
        self.__cs = self.__conn.cursor()

    def getLogo(self, key):
        query = f"select file_name from company where company_id = '{key}'"
        self.__cs.execute(query)
        response = list(self.__cs.fetchall())
        if response:
            return response[0][0]
        else:
            return False
        
    def getDesc(self, key):
        query = f"select company_desc from company where company_id = '{key}'"
        self.__cs.execute(query)
        response = list(self.__cs.fetchall())
        if response:
            return response[0][0]
        else:return False
    
    def postReportData(self, companyID, fileName, scores, bukName):
        E, S, G = [*map(lambda x : sum(x)/len(x), scores.values())]
        print(fileName, E,S,G)
        try:
            # query = """insert into report 
            # (contract_addr, report_id, register_time, file_name, e_score, s_score, g_score)
            # values
            # ((select contract_addr from company where company_id = %s), '0', now(), %s, %s, %s, %s)"""
            query = """insert into report 
            (contract_addr, report_id, register_time, file_name, e_score, s_score, g_score)
            values
            ('5304', '0', now(), %s, %s, %s, %s)"""
            # self.__cs.execute(query, (companyID, fileName, E, S, G))
            self.__cs.execute(query, (fileName, E, S, G))
            self.__conn.commit()
            query = """insert into file values (%s, %s, now())"""
            self.__cs.execute(query, (fileName, bukName))
            self.__conn.commit()
        except Exception as e:
            print(e)
            return False, "DataBase Upload Failed"
        return True, "DataBase Upload Successed"
    
if __name__ == "__main__":
    db = DataBase()
    # db.postReportData('test','testpdf3.pdf', {"E":[10,20,30],"S":[30,30,30],"G":[20,15,10]})
    db.getLogo('test')