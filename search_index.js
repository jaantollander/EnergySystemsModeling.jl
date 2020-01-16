var documenterSearchIndex = {"docs":
[{"location":"#EnergySystemModel.jl-1","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"","category":"section"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"Documentation for EnergySystemModel.jl","category":"page"},{"location":"#Model-1","page":"EnergySystemModel.jl","title":"Model","text":"","category":"section"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"Mathematical reference of the energy system model. The model presented here is similar to the model in [1].","category":"page"},{"location":"#Indexes-and-Sets-1","page":"EnergySystemModel.jl","title":"Indexes and Sets","text":"","category":"section"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"gG: Generation technologies\nG^rG: Renewable generation technologies\nnN: Nodes\nlL: Transmission lines, bidimensional vectors (ij) where ijN\ntT: Time steps, depending on the number of clusters per month","category":"page"},{"location":"#Parameters-1","page":"EnergySystemModel.jl","title":"Parameters","text":"","category":"section"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"A_g01: Availability of technology g\nI_g^G: Annualised investment cost for generation per MW of technology g [€/MW]\nM_g^G: Annualised maintenance cost for generation per MW of technology g [€/MW]\nC_g^G: Operational cost per MWh of technology g [€/MWh]\nτ_t: Cluster size of t\nC: Shedding cost [€/MWh]\nD_nt: Clustered demand per node n per time step t  [MWh]\nκ01: Renewables participation required by the system\nI_l^F: Annualised investment cost for transmission per line l [€/MW]\nM_l^F: Annualised maintenance cost for transmission per line l [€/MW]\nC_l^F: Transmission cost per line l [€/MWh]\nξ: Battery's roundtrip efficiency\nI^S: Annualised investment cost for storage per MW [€/MWh]\nC^S: Storage operational cost [€/MW]\nb_n^0: Initial storage at node n [MWh]\nr_g^-: Relative ramp-down limit of technology g\nr_g^+: Relative ramp-up limit of technology g\nB_l: Susceptance per line l","category":"page"},{"location":"#Variables-1","page":"EnergySystemModel.jl","title":"Variables","text":"","category":"section"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"p_gnt0: Dispatch from technology g at node n in each time step t [MWh]\nbarp_gn0: Generation capacity invested in each technology g at node n [MW]\nσ_nt0: Loss of load at node n in each time step t [MWh]\nf_lt0: Transmission flow per line l in each time step t [MWh]\nbarf_l0: Transmission capacity per line l [MW]\nb_nt0: Storage level at node n in each time step t [MWh]\nbarb_n0: Storage capacity at node n [MWh]\nb_nt^+0: Charging at node n in each time step t [MWh]\nb_nt^-0: Discharging at node n in each time step t [MWh]\nθ_nt0: Voltage angle at node n in each time step t\nθ_nt0: Voltage angle at node n in each time step t","category":"page"},{"location":"#Objective-1","page":"EnergySystemModel.jl","title":"Objective","text":"","category":"section"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"Minimize for p_gt barp_g σ_t f_lt barf_l b_nt^+ b_nt^-","category":"page"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"beginaligned\n sum_gn (I_g^G+M_g^G)barp_gn + \n sum_gnt C_g^G p_gtn τ_t + \n sum_nt C σ_t τ_t + \n sum_l (I_l^F+M_l^F) barf_l + \n sum_lt C_l^F  f_tl τ_t + \n sum_n I^S barb_n + \n sum_nt C^S (b_tn^++d_tn^-) τ_t\nendaligned","category":"page"},{"location":"#Constraints-1","page":"EnergySystemModel.jl","title":"Constraints","text":"","category":"section"},{"location":"#Balance-1","page":"EnergySystemModel.jl","title":"Balance","text":"","category":"section"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"Energy balance t=1","category":"page"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"sum_g p_gnt + σ_nt + sum_(ij)=lLj=n f_lt - sum_(ij)=lLi=n f_lt + ξ b_nt = D_ntquad nt=1","category":"page"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"Energy balance t1","category":"page"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"sum_g p_gnt + σ_nt + sum_(ij)=lLj=n f_lt - sum_(ij)=lLi=n f_lt + ξ (b_nt-b_nt-1) = D_ntquad nt1","category":"page"},{"location":"#Generation-/-Shedding-1","page":"EnergySystemModel.jl","title":"Generation / Shedding","text":"","category":"section"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"Generation capacity","category":"page"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"p_gnt  A_g barp_gquad gnt","category":"page"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"Minimum renewables share","category":"page"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"sum_gG^rnt p_gnt  κ sum_gnt p_gnt","category":"page"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"Shedding upper bound","category":"page"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"σ_nt  C D_ntquad nt","category":"page"},{"location":"#Transmission-1","page":"EnergySystemModel.jl","title":"Transmission","text":"","category":"section"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"Transmission capacity","category":"page"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"f_lt  barf_lquad lt","category":"page"},{"location":"#Storage-1","page":"EnergySystemModel.jl","title":"Storage","text":"","category":"section"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"Charge and discharge at t=1","category":"page"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"beginaligned\n b_nt^+b_nt - b_n^0quad nt=1 \n b_nt^-b_nt - b_n^0quad nt=1\nendaligned","category":"page"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"Charge and discharge at t1","category":"page"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"beginaligned\n b_nt^+b_nt - b_nt-1quad nt1 \n b_nt^-b_nt - b_nt-1quad nt1\nendaligned","category":"page"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"Storage capacity","category":"page"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"b_ntbarb_nquad nt","category":"page"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"Storage","category":"page"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"b_nt=t_end = b_nt=0quad n","category":"page"},{"location":"#Ramping-Limits-1","page":"EnergySystemModel.jl","title":"Ramping Limits","text":"","category":"section"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"beginaligned\np_gnt - p_gnt-1  r_g^+ quad gnt1 \np_gnt - p_gnt-1  -r_g^- quad gnt1\nendaligned","category":"page"},{"location":"#Voltage-Angles-1","page":"EnergySystemModel.jl","title":"Voltage Angles","text":"","category":"section"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"(θ_nt - θ_nt) B_l = p_gnt - p_gnt quad glnnt1","category":"page"},{"location":"#API-1","page":"EnergySystemModel.jl","title":"API","text":"","category":"section"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"Specs","category":"page"},{"location":"#EnergySystemModel.Specs","page":"EnergySystemModel.jl","title":"EnergySystemModel.Specs","text":"Specs\n\n\n\n\n\n","category":"type"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"energy_system_model","category":"page"},{"location":"#EnergySystemModel.energy_system_model","page":"EnergySystemModel.jl","title":"EnergySystemModel.energy_system_model","text":"Create energy system model.\n\n\n\n\n\n","category":"function"},{"location":"#References-1","page":"EnergySystemModel.jl","title":"References","text":"","category":"section"},{"location":"#","page":"EnergySystemModel.jl","title":"EnergySystemModel.jl","text":"[1]: Pineda, S., & Morales, J. M. (2018). Chronological time-period clustering for optimal capacity expansion planning with storage. IEEE Transactions on Power Systems, 33(6), 7162–7170. https://doi.org/10.1109/TPWRS.2018.2842093","category":"page"}]
}
