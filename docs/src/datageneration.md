# Data generation

## Setup and data generation in GlobalEnergyGIS

If the user wants to generate completely new instances, they first need to set up GlobalEnergyGIS: https://github.com/niclasmattsson/GlobalEnergyGIS . Especially important is the first part "Setup and data generation". This allows the user to create datasets of renewable energy independant of EnergySystemModeling. After the user set up their Copernicus account and downloaded the auxiliary datasets, rasterized them and downloaded ERA5 data, they can start generating their own instances in EnergySystemModeling.


## Run_data_generation.jl

After the setup of GlobalEnergyGIS, the user can create a new instance by running the run_data_generation.jl file. 

The first thing the user has to do is to define the input values for the function

```
julia> create_data_sets(inputdata, sspscenario_input, sspyear_input, era_year_input, Dataset, folder, subfolder, instance, T, t, Fmin)
```

These input values are:
* inputdata: Path to the output folder of GlobalEnergyGIS
* sspscenario_input: One of three scenarios: ssp1, ssp2 or ssp3. All are scenarios of projected socioeconomic global changes up to 2100. They are used to derive greenhouse gas emissions scenarios with different climate policies.
* sspyear_input: Target year of the model.
* era_year_input: Year of the ERA5 time series to be used in the model.
* Dataset: Matrix of countries with their corresponding GADM name.
* folder: Upper most folder where the instance is being generated.
* subfolder: Lower level folder where the instance is being generated.
* instance: Name of the instance.
* T: Time period in hours.
* t: Number of technologies considered in the instance.
* Fmin: Minimum water flow for node $n$.

The country dataset gets generated by

```@example get_countries
julia> get_countries(Regions)
```
Where 
* Regions: Vector with the country or region names that the user wants. Regions available are Nordics, Eastern, Western, Central, Mediterranian.
  
This takes the countries or regions specified by the user and turns them into a structure which GlobalEnergyGIS can recognize and on base of which it creates datasets of renewable energies.

The regions contain following countries:

```
Nordics: Finland, Sweden, Norway, Denmark
```
```
Eastern: Poland, Slovakia, Hungary, Lithuania, Latvia, Estonia
```
```
Western: France, United Kingdom, Ireland, Netherlands, Belgium, Luxembourg 
```
```
Central: Germany, Austria, Switzerland, Czech Republic
```
```
Mediterranian: Spain, Portugal, Italy, Greece, Croatia, Malta, Albania, Bosnia and Herzegovina
```


If the user does not specify any set of countries or regions, he will get an instance for whole Europe: 

```@example get_countries
julia> get_countries()
```

This includes all of the following countries:
```
Albania, Armenia, Austria, Azerbaijan, Belarus, Belgium, Bosnia and Herzegovina, Bulgaria, Croatia, Cyprus, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Iceland, Ireland, Italy, Kosovo, Latvia, Lithuania, Luxembourg, Malta, Moldova, Montenegro, Netherlands, North Macedonia, Norway, Poland, Portugal, Romania, Russia, Serbia, Slovakia, Slovenia, Spain, Sweden, Switzerland, Turkey, Ukraine, United Kingdom
```

The instance itself is then created by: 
```@example create_data_sets
julia> create_data_sets(inputdata, sspscenario_input, sspyear_input, era_year_input, Dataset, folder, subfolder, instance, T, t, Fmin)
```



