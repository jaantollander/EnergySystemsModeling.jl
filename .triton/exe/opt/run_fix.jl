using Logging
using EnergySystemModeling
using JLD2
using JuMP
using Gurobi
using Dates
using DelimitedFiles

@info string("Starting instance (fixed capacity)",ARGS[1]," @ ",now())

WRKDIR = "/scratch/work/condeil1/EnergySystemModeling.jl/examples"
cd(WRKDIR)

@info "Loading parameters"
constants_dir = "constants"
constants_path = joinpath(WRKDIR,constants_dir)
structure_dir = "8nodes"
structures_path = joinpath(WRKDIR,"structures",structure_dir)
instances_path = joinpath(structures_path,"instances/.big_files")
instance_clust = ARGS[1]
instance_path_clust = joinpath(instances_path,instance_clust)
instance_ftr = "08n8760h_ftr"
params_path_ftr = joinpath(instances_path,instance_ftr,".big_files","parameters")

# NOTE: Change the output folder's name accordingly to the instance
instance_dir = "output_tri_nodal_rd"
results_dir = "results"

@info "Creating specifications"
# Model specifications
specs = Specs(
        transmission=true,
        renewable_target=true,
        carbon_cap=true,
        nuclear_limit=false,
        storage=true,
        ramping=true,
        voltage_angles=false,
        hydro=true,
        hydro_simple=false
)

@info "Reading variables directories"
results_path = joinpath(instance_path_clust,instance_dir,results_dir)
variables_clust = load(joinpath(results_path, "variables.jld2"));

@info "Reading parameters FTR"
# Argument nosun takes solar energy out of the optimisation"
# Updating the parameters to the clustering instance

## TODO: revise parameters (check if they are FTR)
# parameters_clust = change_time_parameters(params_path_ftr, instance_path_clust;nosun=false)
parameters = change_time_parameters(params_path_ftr, params_path_ftr;nosun=false);

@info "Creating the energy system model"
(model, VariablesDict, ObjectivesDict) = EnergySystemModel(parameters, specs)
# To write the model: write_to_file(model,joinpath(output_path, model_dir,"model.mps"))

@info "Adding capacity cuts"
# Fixing capacities
fix.(model[:p̄_gn], variables_clust["p̄_gn"]; force=true)
if specs.transmission
    fix.(model[:f̄_l], variables_clust["f̄_l"]; force=true)
end
if specs.storage
    fix.(model[:b̄_sn], variables_clust["b̄_sn"]; force=true)
end
if specs.hydro
    fix.(model[:h̄_hn], variables_clust["h̄_hn"]; force=true)
end

@info "Optimizing FTR model with capacity cuts"

optimizer = optimizer_with_attributes(Gurobi.Optimizer, "TimeLimit" => 60*60*72,
                                      "LogFile" => joinpath(output_path, "gurobi.log"))
set_optimizer(model, optimizer)
set_optimizer_attributes(model, "NumericFocus" => 1)
set_optimizer_attributes(model, "ScaleFlag" => 2)

# Scaling: ("ScaleFlag" => [-1,3])
# Numeric focus: ("NumericFocus" => [0,3])
# set_optimizer_attributes(model, "Method" => 0)
# set_optimizer_attributes(model, "Crossover" => 1)

optimize!(model)

@info "Extracting results"
variables = JuMPVar(model, VariablesDict)
objectives = JuMPObj(model, ObjectivesDict)
expressions = Expressions(parameters, specs, variables)

@info "Saving results (JLD2)"
JLD2.save(joinpath(output_path, results_dir, "variables.jld2"), variables; compress = true)
JLD2.save(joinpath(output_path, results_dir, "objectives.jld2"), objectives; compress = true)
JLD2.save(joinpath(output_path, results_dir, "expressions.jld2"), expressions; compress = true)

@info string("Ended instance ",ARGS[1]," @ ",now())