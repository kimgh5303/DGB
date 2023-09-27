# 키워드 입력을 통해 ESG 경영 보고서를 작성해주는 툴
import openai as ai, numpy as np, time as t, os
from tqdm import tqdm
from makePDF import MakePDF
from AWS import Bucket
from DB import DataBase

class GPT:
    def __init__(self):
        self.QnA = {}
        self.response : str
        self.pdfPath = './PDF/'

        with open('./secure/api.txt','r',encoding='utf-8') as f:
            data = f.read().split('\n')
        ai.organization = data[0]
        ai.api_key = data[1]

        self.PDF = MakePDF()
        self.BUK = Bucket()
        self.DB = DataBase()

        self.__ID : str
        self.__imgFileName : str
        self.__Desc : str
        self.__scores = {"E":[],"S":[],"G":[]}
        self.__results = {"E":{},"S":{},"G":{}}
        self.__specialOptions = {"E":["Q2","Q7"],"S":["Q11","Q16","Q17","Q18","Q20"],"G":["Q8","Q11","Q14"]}
        self.__getQnA()

        self.__ErrorType = {1:"No Desc", 2:"No Logo File"}

    def __getQnA(self):
        with open('QnA.txt','r',encoding='utf-8') as f:
            Rubrics = f.read()
            Rubrics = [text.split('\n') for text in Rubrics.split('\n=\n')]
        for Rubric in Rubrics:
            tempDict = {}
            __options = []
            if Rubric in [['E'], ['S'], ['G']]:
                __Type = Rubric[0]
                self.QnA[__Type] = {}
            else:
                __Query = Rubric[0].split('.')
                optionRange = tuple(map(int, Rubric[1].split(',')))
                for i in range(optionRange[0]):
                    s = 2 + optionRange[1]*i
                    __options.append(Rubric[s:s+optionRange[1]])
                __scores = np.array([*map(int, Rubric[-2].split(','))]).reshape(-1,optionRange[1]).tolist()
                tempDict["type"] = Rubric[-1]
                tempDict["query"] = __Query[1]
                tempDict["option"] = __options
                tempDict["score"] = __scores
                
                self.QnA[__Type][__Query[0]] = tempDict
    
    def __GPT(self, content):
        try:
            response = ai.ChatCompletion.create(
                        model='gpt-3.5-turbo',
                        messages=[
                            {"role":"user",
                            "content":content
                            }
                        ]
                    )
        except Exception as e:
            print(f"GPT Error : {e}")
            return "", True
        return response.choices[0].message.content, False

    def __getData(self, key):
        self.__Desc = self.DB.getDesc(key)
        if not self.__Desc:
            return False, 1
        self.__imgFileName = self.BUK.getLogo(key)
        if not self.__imgFileName:
            return False, 2
        return True, 0
    
    def query(self, requests):
        s = t.time()
        # 프로그레스 바 표현
        T_pbar = tqdm(requests,desc='E ')
        # request의 key를 읽어 옴
        for _type in T_pbar:
            # Type이 ID면 ID 저장 후 continue
            if _type == "ID":
                self.__ID = requests[_type]
                result, _t = self.__getData(self.__ID)
                if not result:
                    return {"message":self.__ErrorType[_t], "code":False}
                continue
            if _type == 'P':
                continue
            # 프로그래스 desc 설정
            T_pbar.set_description(f'{_type} ')
            # 질문과 그에 대한 답변을 읽어옴
            for q, v in tqdm(requests[_type].items()):
                # 질문에 대한 답변 index int 형으로 변환
                v = [*map(int,v)]
                query = self.QnA[_type][q]["query"]
                ans = []
                if q in self.__specialOptions[_type]:
                    for V in v:
                        ans.append(self.QnA[_type][q]["option"][V-1][0])
                    n = len(v)
                    score = self.QnA[_type][q]["score"][0][0]
                    self.__scores[_type].append(0 if n <= 1 else score * (n-1))
                else:
                    for i, V in enumerate(v):
                        ans.append(self.QnA[_type][q]["option"][i][V-1])
                        self.__scores[_type].append(self.QnA[_type][q]["score"][i][V-1])
                if len(ans) > 1:
                    ans = [*map(lambda x : x.replace('다.','고, '),ans)]
                ans = "".join(ans)
                content = f'기업의 ESG 보고서 중 {_type}영역에 대한 내용을 작성할거야. 기업은 다음 질문에 다음 답으로 대답했어.\n\
                    <질문>"{query}"</질문>\n\
                    <답>"{ans}"</답>\n\
                    질문목표를 최대한 참고하고, 질문과 답을 바탕으로 다음 예시처럼 나누어 정리해줘. 내용은 잘한점을 중점으로 말해줘. 모든 내용을 합쳤을 때 200~250자 정도가 되게 해주고, 너의 답을 은행 감독관이 읽는다고 생각해줘.\n\
                    <예시>\n\
                    해당 기업의 성과는 ~ 이다.\n\
                    성과를 바탕으로 잘한점은 ~ 이다.\n\
                    </예시>\n\
                    <질문목표>조직이 책임있는 환경경영을 수행하기 위한 방향성을 명확히 설정하고 효율적인 자원 배분이 이루어지고 있는지, 또한 조직이 외부에 미치는 환경 영향을 최소화하고 내부 환경성과를 향상시키기 위한 구체적인 계획이 마련되어 있는지 점검, 조직이 수립한 환경 분야 단기/중장기 목표 구체성과 내재화 수준을 확인<\질문목표>\n\
                    '
                while True:
                    result, error = self.__GPT(content)
                    if error:
                        t.sleep(0.1)
                        continue
                    break

                self.__results[_type][q] = {"ans" : result, "type":self.QnA[_type][q]["type"]}
                os.system('clear')
            os.system('clear')
        print(f'run gpt time : {t.time()- s}s')
        #### 임시 ####
        # with open("./etc/result.json",'w',encoding="utf-8") as f:
        #     f.write(str(self.__results))
        ##############

        ## PDF 생성
        response, fileName = self.PDF.create(self.__ID, self.__Desc, self.__results, self.__imgFileName)
        if not response:
            print(f'create PDF Error : {fileName}')
            return {"message":fileName, "code":False}

        ## DataBase에 PDF 정보 업로드
        result, _t = self.DB.postReportData(self.__ID, fileName,self.__scores, self.BUK.getBucketName())
        if not result:
            print(f'post reportData Error : {_t}')
            return {"message" :_t, "code":False}
        ## S3에 PDF 파일 업로드
        result, _t = self.BUK.postPDF(f'./PDF/{fileName}')
        if not result:
            print(f'postPDF Error : {_t}')
            return {"message":_t, "code":False}
        os.remove(f'./PDF/{fileName}')
        os.remove(f'./Logo/{self.__imgFileName}')
        
        return {"messsage": "create report Sucessed", "code":True}

if __name__ == "__main__":
    gpt = GPT()
    gpt.query({'ID':'test'})