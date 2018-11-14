// Map Data 
/* 
	Because I was not able to asynchronously load all the data from the API before the Knockout Binding
	I manually used the api to populate the locations. Next time, if making a dynamic web site
	I would prefer to save all this information in a relational database
*/

// Couldn't successfully use a AJAX call to get the route information for the respective station, so made a helper function to get the value
function route_identifier(id){
  if(Math.floor(id/100) === 803) return 803;
  else if(Math.floor(id/100) === 804) return 804;
  else if(id >= 80210) return 805;
  else if(Math.floor(id/100) === 802) return 802;
  else if(id >= 80123  && id <=80150) return 806;
  else return 801
}


// Ex) http://api.metro.net/agencies/lametro-rail/routes/806/info/
var id_color = { 801:"#004dac",802:"#ee3a43", 803:"#2eab00", 804:"#da7c20", 805:"#9561a9", 806:"#0177a5"};


// Ex) http://api.metro.net/agencies/lametro-rail/routes/
var lanes = [
	{
		id: 801,
		display_name: "Metro Blue Line (801)"
	},
	{
		id: 802,
		display_name: "Metro Red Line (802)"
	},
	{
		id: 803,
		display_name: "Metro Green Line (803)"
	},
	{
		id: 804,
		display_name: "Metro Gold Line (804)"
	},
	{
		id: 805,
		display_name: "Metro Purple Line (805)"
	},
	{
		id: 806,
		display_name: "Metro Expo Line (806)"
	}
]



// Ex) http://api.metro.net/agencies/lametro-rail/routes/<route_i>/stops
var metros = [
	{
		title: "Firestone Station",
		id: 80114,
		lat: 33.9596099,
		lng: -118.2432
	},

	{
		title: "Del Amo Station",
		id: 80109,
		lat: 33.8482199,
		lng: -118.21102
	},

	{
		title: "Compton Station",
		id: 80111,
		lat: 33.8974899,
		lng: -118.22425
	},

	{
		title: "Florence Station",
		id: 80115,
		lat: 33.9737399,
		lng: -118.24327
	},

	{
		title: "5th Street Station",
		id: 80154,
		lat: 33.7735999,
		lng: -118.18941
	},

	{
		title: "Downtown Long Beach Station",
		id: 80101,
		lat: 33.7680699,
		lng: -118.19292
	},

	{
		title: "103rd Street / Watts Towers Station",
		id: 80113,
		lat: 33.9422199,
		lng: -118.24316
	},

	{
		title: "Pacific Ave Station",
		id: 80102,
		lat: 33.7722599,
		lng: -118.1937
	},

	{
		title: "1st Street Station",
		id: 80153,
		lat: 33.7687399,
		lng: -118.18936
	},

	{
		title: "7th Street / Metro Center Station - Metro Blue & Expo Lines",
		id: 80122,
		lat: 34.0486099,
		lng: -118.25882
	},

	{
		title: "Wardlow Station",
		id: 80108,
		lat: 33.8198599,
		lng: -118.19609
	},

	{
		title: "Willowbrook - Rosa Parks Station - Metro Blue Line",
		id: 80112,
		lat: 33.9280499,
		lng: -118.23755
	},

	{
		title: "Anaheim Street Station",
		id: 80105,
		lat: 33.7818299,
		lng: -118.18938
	},

	{
		title: "Willow Street Station",
		id: 80107,
		lat: 33.8070799,
		lng: -118.18983
	},

	{
		title: "Pico Station",
		id: 80121,
		lat: 34.0407299,
		lng: -118.26612
	},

	{
		title: "Vernon Station",
		id: 80117,
		lat: 34.0029199,
		lng: -118.2433
	},

	{
		title: "Grand / Lattc Station",
		id: 80120,
		lat: 34.0331599,
		lng: -118.26933
	},

	{
		title: "Slauson Station",
		id: 80116,
		lat: 33.9887599,
		lng: -118.2434
	},

	{
		title: "Artesia Station",
		id: 80110,
		lat: 33.8760799,
		lng: -118.2225
	},

	{
		title: "Washington Station",
		id: 80118,
		lat: 34.0196499,
		lng: -118.24308
	},

	{
		title: "Pacific Coast Hwy Station",
		id: 80106,
		lat: 33.7890899,
		lng: -118.18938
	},

	{
		title: "San Pedro Street Station",
		id: 80119,
		lat: 34.0268099,
		lng: -118.2555
	},

	{
		title: "North Hollywood Station",
		id: 80201,
		lat: 34.1684999,
		lng: -118.37681
	},

	{
		title: "Universal / Studio City Station",
		id: 80202,
		lat: 34.1399999,
		lng: -118.3627
	},

	{
		title: "Hollywood / Western Station",
		id: 80205,
		lat: 34.1017399,
		lng: -118.30812
	},

	{
		title: "Hollywood / Vine Station",
		id: 80204,
		lat: 34.1016299,
		lng: -118.32518
	},

	{
		title: "Vermont / Beverly Station",
		id: 80208,
		lat: 34.0765299,
		lng: -118.29169
	},

	{
		title: "Civic Center / Grand Park Station",
		id: 80213,
		lat: 34.0548999,
		lng: -118.24606
	},

	{
		title: "7th Street / Metro Center Station - Metro Red & Purple Lines",
		id: 80211,
		lat: 34.0486299,
		lng: -118.25868
	},

	{
		title: "Hollywood / Highland Station",
		id: 80203,
		lat: 34.1015499,
		lng: -118.33855
	},

	{
		title: "Westlake / Macarthur Park Station",
		id: 80210,
		lat: 34.0563699,
		lng: -118.27488
	},

	{
		title: "Vermont / Sunset Station",
		id: 80206,
		lat: 34.0977099,
		lng: -118.29176
	},

	{
		title: "Pershing Square Station",
		id: 80212,
		lat: 34.0493199,
		lng: -118.25126
	},

	{
		title: "Vermont / Santa Monica Station",
		id: 80207,
		lat: 34.0899099,
		lng: -118.29173
	},

	{
		title: "Union Station - Metro Red & Purple Lines",
		id: 80214,
		lat: 34.0561999,
		lng: -118.23425
	},

	{
		title: "Wilshire / Vermont Station",
		id: 80209,
		lat: 34.0626999,
		lng: -118.29008
	},

	{
		title: "Crenshaw Station",
		id: 80307,
		lat: 33.9251999,
		lng: -118.32655
	},

	{
		title: "El Segundo Station",
		id: 80303,
		lat: 33.9160599,
		lng: -118.38654
	},

	{
		title: "Harbor Freeway Station",
		id: 80309,
		lat: 33.9287099,
		lng: -118.2811
	},

	{
		title: "Hawthorne / Lennox Station",
		id: 80306,
		lat: 33.9334099,
		lng: -118.3516
	},

	{
		title: "Mariposa Station",
		id: 80304,
		lat: 33.9231999,
		lng: -118.38757
	},

	{
		title: "Norwalk Station",
		id: 80314,
		lat: 33.9140299,
		lng: -118.10472
	},

	{
		title: "Long Beach Blvd Station",
		id: 80312,
		lat: 33.9248799,
		lng: -118.20994
	},

	{
		title: "Aviation / Lax Station",
		id: 80305,
		lat: 33.9296199,
		lng: -118.37713
	},

	{
		title: "Vermont / Athens Station",
		id: 80308,
		lat: 33.9286799,
		lng: -118.29173
	},

	{
		title: "Douglas Station",
		id: 80302,
		lat: 33.9052999,
		lng: -118.38311
	},

	{
		title: "Avalon Station",
		id: 80310,
		lat: 33.9274599,
		lng: -118.26522
	},

	{
		title: "Willowbrook - Rosa Parks Station - Metro Green Line",
		id: 80311,
		lat: 33.9282599,
		lng: -118.23805
	},

	{
		title: "Redondo Beach Station",
		id: 80301,
		lat: 33.8946399,
		lng: -118.3692
	},

	{
		title: "Lakewood Blvd Station",
		id: 80313,
		lat: 33.9130699,
		lng: -118.1406
	},

	{
		title: "Westlake / Macarthur Park Station",
		id: 80210,
		lat: 34.0563699,
		lng: -118.27488
	},

	{
		title: "Civic Center / Grand Park Station",
		id: 80213,
		lat: 34.0548999,
		lng: -118.24606
	},

	{
		title: "Pershing Square Station",
		id: 80212,
		lat: 34.0493199,
		lng: -118.25126
	},

	{
		title: "Union Station - Metro Red & Purple Lines",
		id: 80214,
		lat: 34.0561999,
		lng: -118.23425
	},

	{
		title: "Wilshire / Western Station",
		id: 80216,
		lat: 34.0616899,
		lng: -118.30876
	},

	{
		title: "7th Street / Metro Center Station - Metro Red & Purple Lines",
		id: 80211,
		lat: 34.0486299,
		lng: -118.25868
	},

	{
		title: "Wilshire / Normandie Station",
		id: 80215,
		lat: 34.0617499,
		lng: -118.30146
	},

	{
		title: "Wilshire / Vermont Station",
		id: 80209,
		lat: 34.0626999,
		lng: -118.29008
	},

	{
		title: "East La Civic Center Station",
		id: 80402,
		lat: 34.0333599,
		lng: -118.16121
	},

	{
		title: "Highland Park Station",
		id: 80414,
		lat: 34.1111799,
		lng: -118.19261
	},

	{
		title: "Memorial Park Station",
		id: 80418,
		lat: 34.1483599,
		lng: -118.14751
	},

	{
		title: "Maravilla Station",
		id: 80403,
		lat: 34.0333199,
		lng: -118.16814
	},

	{
		title: "South Pasadena Station",
		id: 80415,
		lat: 34.1151899,
		lng: -118.15789
	},

	{
		title: "Heritage Square / Arroyo Station",
		id: 80412,
		lat: 34.0872299,
		lng: -118.21321
	},

	{
		title: "Fillmore Station",
		id: 80416,
		lat: 34.1335199,
		lng: -118.14813
	},

	{
		title: "Lincoln Heights / Cypress Park Station",
		id: 80411,
		lat: 34.0809499,
		lng: -118.22043
	},

	{
		title: "Chinatown Station",
		id: 80410,
		lat: 34.0638599,
		lng: -118.23584
	},

	{
		title: "Little Tokyo / Arts District Station",
		id: 80408,
		lat: 34.0500999,
		lng: -118.2379
	},

	{
		title: "Azusa Downtown Station",
		id: 80426,
		lat: 34.1358599,
		lng: -117.90663
	},

	{
		title: "Monrovia Station",
		id: 80423,
		lat: 34.1331599,
		lng: -118.00347
	},

	{
		title: "Lake Station",
		id: 80419,
		lat: 34.1518099,
		lng: -118.13139
	},

	{
		title: "Del Mar Station",
		id: 80417,
		lat: 34.1419099,
		lng: -118.14821
	},

	{
		title: "Irwindale Station",
		id: 80425,
		lat: 34.1290499,
		lng: -117.93251
	},

	{
		title: "Indiana Station",
		id: 80404,
		lat: 34.0342999,
		lng: -118.19218
	},

	{
		title: "Sierra Madre Villa Station",
		id: 80421,
		lat: 34.1477499,
		lng: -118.08121
	},

	{
		title: "Apu / Citrus College Station",
		id: 80427,
		lat: 34.1368099,
		lng: -117.89164
	},

	{
		title: "Southwest Museum Station",
		id: 80413,
		lat: 34.0982399,
		lng: -118.20671
	},

	{
		title: "Duarte / City Of Hope Station",
		id: 80424,
		lat: 34.1325199,
		lng: -117.96768
	},

	{
		title: "Soto Station",
		id: 80405,
		lat: 34.0437499,
		lng: -118.21006
	},

	{
		title: "Arcadia Station",
		id: 80422,
		lat: 34.1428599,
		lng: -118.0292
	},

	{
		title: "Union Station - Metro Gold Line",
		id: 80409,
		lat: 34.0560599,
		lng: -118.23476
	},

	{
		title: "Allen Station",
		id: 80420,
		lat: 34.1524199,
		lng: -118.11435
	},

	{
		title: "Pico / Aliso Station",
		id: 80407,
		lat: 34.0476299,
		lng: -118.22594
	},

	{
		title: "Mariachi Plaza / Boyle Heights Station",
		id: 80406,
		lat: 34.0472199,
		lng: -118.21965
	},

	{
		title: "Atlantic Station",
		id: 80401,
		lat: 34.0333999,
		lng: -118.15447
	},

	{
		title: "Expo / La Brea / Ethel Bradley Station",
		id: 80130,
		lat: 34.0247999,
		lng: -118.35516
	},

	{
		title: "Expo Park / Usc Station",
		id: 80125,
		lat: 34.0182299,
		lng: -118.28573
	},

	{
		title: "La Cienega / Jefferson Station",
		id: 80131,
		lat: 34.0263599,
		lng: -118.37212
	},

	{
		title: "Pico Station",
		id: 80121,
		lat: 34.0407299,
		lng: -118.26612
	},

	{
		title: "Farmdale Station",
		id: 80129,
		lat: 34.0239799,
		lng: -118.34609
	},

	{
		title: "17th Street / Smc Station",
		id: 80138,
		lat: 34.0231599,
		lng: -118.48037
	},

	{
		title: "Downtown Santa Monica Station",
		id: 80139,
		lat: 34.0140099,
		lng: -118.49138
	},

	{
		title: "7th Street / Metro Center Station - Metro Blue & Expo Lines",
		id: 80122,
		lat: 34.0486099,
		lng: -118.25882
	},

	{
		title: "Westwood / Rancho Park Station",
		id: 80134,
		lat: 34.0368199,
		lng: -118.42458
	},

	{
		title: "Expo / Bundy Station",
		id: 80136,
		lat: 34.0317099,
		lng: -118.4529
	},

	{
		title: "Lattc / Ortho Institute Station",
		id: 80123,
		lat: 34.0291099,
		lng: -118.2736
	},

	{
		title: "Expo / Vermont Station",
		id: 80126,
		lat: 34.0182399,
		lng: -118.29154
	},

	{
		title: "Expo / Crenshaw Station",
		id: 80128,
		lat: 34.0225299,
		lng: -118.33508
	},

	{
		title: "Palms Station",
		id: 80133,
		lat: 34.0293199,
		lng: -118.40425
	},

	{
		title: "26th Street / Bergamot Station",
		id: 80137,
		lat: 34.0279899,
		lng: -118.46912
	},

	{
		title: "Jefferson / Usc Station",
		id: 80124,
		lat: 34.0221199,
		lng: -118.27812
	},

	{
		title: "Expo / Western Station",
		id: 80127,
		lat: 34.0183299,
		lng: -118.30891
	},

	{
		title: "Expo / Sepulveda Station",
		id: 80135,
		lat: 34.0354099,
		lng: -118.43423
	},

	{
		title: "Culver City Station",
		id: 80132,
		lat: 34.0278999,
		lng: -118.38899
	}
]























