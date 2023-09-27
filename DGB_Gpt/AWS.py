import boto3
from DB import DataBase

class Bucket:
    def __init__(self):
        with open('./secure/aws_key.txt','r',encoding='utf-8') as f:
            self.__accessKey, self.__secretKey\
            ,self.__region, self.__LogoBucketName\
            ,self.__reportBucketName = f.read().split('\n')

        self.__objectKey : str
        self.__DB = DataBase()

        self.__s3 = boto3.client('s3', aws_access_key_id=self.__accessKey,
                       aws_secret_access_key=self.__secretKey,
                       region_name=self.__region)
        
    # https://(bucketname).s3.(region).amazonaws.com/(objectkey)
    def getLogo(self, companyID):
        self.__objectKey = self.__DB.getLogo(companyID)
        if not self.__objectKey:
            return False
        self.__s3.download_file(self.__LogoBucketName, self.__objectKey, f'./Logo/{self.__objectKey}')
        return self.__objectKey
    
    def postPDF(self, fileName):
        try :
            extra_args = {
            'ContentDisposition': 'inline'
            }
            self.__s3.upload_file(fileName, self.__reportBucketName, fileName.split('/')[-1], ExtraArgs=extra_args)
        except Exception as e:
            return False, f"File Upload Failed : \n{e}"
        return True, "File Upload Successed"
    
    def getBucketName(self):
        return self.__reportBucketName
    
if __name__ == "__main__":
    buk = Bucket()
    buk.getLogo('test')