#!/bin/bash
#SBATCH --time=48:00:00
#SBATCH --mem-per-cpu=2G
#SBATCH --array=1-10
#SBATCH --output=slurm_out/new/%A_%a.out

n=$SLURM_ARRAY_TASK_ID
instance=`sed -n "${n} p" instances_test.txt`      # Get n-th line (1-indexed) of the file

srun julia /scratch/work/condeil1/EnergySystemModeling.jl/.triton/exe/opt/run_clust.jl ${instance}
srun julia /scratch/work/condeil1/EnergySystemModeling.jl/.triton/exe/opt/run_fix.jl ${instance}