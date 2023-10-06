import pandas as pd

filename = '../ingredient_info.csv'

df_excel = pd.read_excel(filename)

print(df_excel)