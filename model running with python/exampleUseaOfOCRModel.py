from rapidocr import RapidOCR

engine = RapidOCR()

img_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWbQ-e7P8B1cS_96Emg2odA0pHe3lAD1LeNA&s"
result = engine(img_url)
textResult = "\n".join(result.txts)
print("txts joined:", textResult)

result.vis("vis_result.jpg")