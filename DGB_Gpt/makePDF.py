from reportlab.platypus import BaseDocTemplate, Frame\
    , PageTemplate, Paragraph, Spacer, Image\
    , Table, TableStyle, PageBreak
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import Color, black
from reportlab.lib.pagesizes import letter
import json, time as t

class MakePDF:
    def __init__(self):
        self.__fontPath = "/usr/share/fonts/truetype/nanum/NanumGothic.ttf"
        self.__boldFontPath = "/usr/share/fonts/truetype/nanum/NanumGothicBold.ttf"
        self.__fontName = "NanumGothic"
        self.__boldFontName = "NanumGothicBold"
        self.__fileName : str

        self.__colors = [Color(0,141/255,79/255), Color(245/255,121/255,33/255), Color(98/255,94/255,170/255)]

        pdfmetrics.registerFont(TTFont(self.__fontName, self.__fontPath))
        pdfmetrics.registerFont(TTFont(self.__boldFontName, self.__boldFontPath))
        pdfmetrics.registerFontFamily(self.__fontName, normal=self.__fontName, bold=self.__boldFontName)

        self.__doc : BaseDocTemplate

    def __fotter(self, canv, _):
        canv.saveState()
        pageNumber = canv.getPageNumber()
        canv.setFont(self.__fontName, 9)
        canv.drawCentredString(550, 35, f"- {pageNumber} -")
        canv.restoreState()
    
    def __createDoc(self, fileName):
        self.__fileName = fileName
        self.__doc = BaseDocTemplate(f'./PDF/{self.__fileName}', pagesize=A4,
                                   leftMargin=40,
                                   rightMargin=40,
                                   topMargin=40,
                                   bottomMargin=40)
        frame = Frame(self.__doc.leftMargin, self.__doc.bottomMargin, self.__doc.width, self.__doc.height)
        template = PageTemplate(id=self.__fileName, frames=frame, onPage=self.__fotter)
        self.__doc.addPageTemplates(template)

    def __setFont(self, name, size, alignment, fontName, color, leftIndent, leading):
        return ParagraphStyle(
                    name=name, 
                    fontName=fontName, 
                    fontSize=size, 
                    leading=leading,
                    alignment=alignment,
                    textColor=color,
                    leftIndent = leftIndent
                    )

    def __preprocessing(self, content):
        contents = {}

        for T, answers in content.items():
            contents[T] = []
            for values in answers.values():
                ans = values['ans']
                _type = values['type']
                contents[T].append([_type, ans])
        return contents
    
    def __genText(self, text, fDesc, size,
            fontName = "NanumGothic",
            align = TA_LEFT,
            color = black, 
            leftIndent = 0,
            leading=15):
        return Paragraph(
            text,
            self.__setFont(
                    name = fDesc,
                    size = size,
                    fontName = fontName,
                    alignment = align,
                    color = color,
                    leftIndent = leftIndent,
                    leading=leading
                )
            )
    
    def __genTable(self, itemList, col=None, row=None, style=None):
        table = Table(
            itemList,
            colWidths=col,
            rowHeights=row,
        )
        table.setStyle(TableStyle(style))
        
        return table

    def create(self, ID, desc, response, imgFileName):
        texts = []
        self.__createDoc(f'{ID}_{t.gmtime().tm_year}-{t.gmtime().tm_mon}-{t.gmtime().tm_mday}_{t.time()}.pdf')
        image = Image(f'./Logo/{imgFileName}', width=200, height=200)
        genTime = f'{t.gmtime().tm_year}-{t.gmtime().tm_mon}-{t.gmtime().tm_mday}'
        ESG = ['Environment', 'Social', 'Governance']

        contents = self.__preprocessing(response)

        texts.extend([
            Spacer(0, 40),
            self.__genText("ESG 경영 보고서",'title', 50, fontName=self.__boldFontName, align=TA_CENTER, color=Color(0.06, 0.4, 0.67)),
            Spacer(0, 80),
            self.__genText(genTime, 'date', 25, align=TA_CENTER),
            Spacer(0, 380),
            self.__genTable(
                [
                    [
                        image,
                        self.__genTable(
                            [
                                [Spacer(1,1)],
                                [self.__genText(ID, ID, 25, align=TA_CENTER)],
                                [self.__genText(desc, "desc", 10, align=TA_JUSTIFY)]
                            ],
                            col = [(self.__doc.width-20)/2],
                            row = [20,50,130],
                            style = [('VALIGN', (0, 0), (-1, -1), 'TOP')]
                        )
                    ]
                ],
                col = [(self.__doc.width-20)/2, (self.__doc.width-20)/2],
                row = [200],
                style=[('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                    ('ALIGN', (0, 0), (-1, -1), 'CENTER')]
            )
        ])

        for i, T in enumerate(contents.keys()):
            texts.extend([
                PageBreak(),
                self.__genTable(
                    [
                        [
                            self.__genText(T, T, 35, fontName = self.__boldFontName, color=self.__colors[i]),
                            [
                                self.__genText(ESG[i], ESG[i], 18, color=self.__colors[i]),
                                Spacer(0,15)
                            ]
                        ]
                    ],
                    col=[30, self.__doc.width-30],
                    row=[66],
                    style=[('VALIGN', (0, 0), (0, 0), 'TOP'),
                        ('VALIGN', (1, 0), (1, 0), 'BOTTOM'),
                        ('ALIGN', (0, 0), (-1, -1), 'LEFT')]
                ),
            ])
            for _type, ans in contents[T]:
                texts.extend([
                    self.__genText(_type, _type, 14, fontName=self.__boldFontName,leftIndent=10),
                    Spacer(0, 10),
                    self.__genText(ans, 'ans', 14, align=TA_JUSTIFY, leftIndent=18,leading=20),
                    Spacer(0, 20)
                ])

        self.__doc.build(texts)
        # except Exception as e:
        #     return False, e

        return True, self.__fileName
 

if __name__ == "__main__":
    doc = MakePDF()
    doc.create('test','test','1', 'c959e746-ea0f-42e1-9bc9-5929b349236d.png')
