import os
import openai as ai

with open('.//secure/api.txt','r',encoding='utf-8') as f:
    data = f.read().split('\n')

ai.organization = data[0]
ai.api_key = data[1]

models = ai.Model.list()
with open('./models.json','w',encoding='utf-8') as f:
    f.write(str(models))
