using DelimitedFiles


techtable = [
    :name          :g       :investment_cost    :fixedOM    :varOM      :fuel_cost      :efficiency     :emissions      :lifetime       :r_minus    :r_plus
    :wind_on        1       1127                35          0           0               1               0               25              1           1
    :wind_off       2       2290                80          0           0               1               0               25              1           1
    :solar          3       480                 26          0           0               1               0               25              1           1
    :biomass        4       2076                100         0           7               0.448           0.39            30              1           1
    :nuclear        5       5000                150         3           3               0.34            0               60              0.05        0.05
    :coal           6       1300                25          6           8               0.466           0.34            40              0.15        0.15
    :gas_cc         7       800                 20          4           22              0.615           0.20            30              0.3         0.3
    :gas_oc         8       400                 15          3           22              0.395           0.20            30              1           1


    ]

    writedlm("gen_technology.csv", techtable, ',')