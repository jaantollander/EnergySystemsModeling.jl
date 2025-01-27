using Combinatorics: length
using DataFrames: Matrix
using MAT, DelimitedFiles, JLD, JSON, CSV, LinearAlgebra, Combinatorics, DataFrames, Statistics, GlobalEnergyGIS

include("data_generation.jl")

# name the instance that you're creating
sspscenario_input = "ssp2-26"
sspyear_input = 2050
era_year_input = 2018

# select the folder in which you want to write the files, "folder" and "subfolder" should not change
folder = "examples"
subfolder = "structures"
instance = "Europe"

# Path to the output folder of GlobalEnergyGIS
inputdata =  "/scratch/work/beranej1/Copernicus/output"       #"D:\\Eigene Dateien\\Studium\\Master\\RA\\Copernicus\\output"

# Write the countries/regions for which you want to create the dataset. Use either country Names or predifined regions: Nordics, Eastern, Western, Central, Mediterranian
Regions = ["Finland", "Norway", "Sweden", "Denmark", "France", "Germany", "United Kingdom", "Spain", "Poland", "Italy"]

# Desired time period in hours
T = 8760
# number of technologies
t = 8       # 8 since hydro is not included here 
## Value of Fmin
Fmin = 0.05

Dataset = get_countries()

create_data_sets(inputdata, sspscenario_input, sspyear_input, era_year_input, Dataset, folder, subfolder, instance, T, t, Fmin)



