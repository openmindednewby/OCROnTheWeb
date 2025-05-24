from rapidocr import RapidOCR

engine = RapidOCR()

img_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWbQ-e7P8B1cS_96Emg2odA0pHe3lAD1LeNA&s"
result = engine(img_url)
textResult = "\n".join(result.txts)
# result.img
# print('START OCR RESULT')
# # print("Text:", result.text)
# # print("boxes:", result.boxes)
# print("txts:", result.txts)
# " ".join(result.txts) 
print("txts joined:", textResult)
# print("word_results:", result.word_results)

# print("result.to_json()", result.to_json())
# print(result)
# print('END OCR RESULT')

result.vis("vis_result.jpg")