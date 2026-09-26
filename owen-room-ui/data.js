// Source data adapted directly from the supplied September 2026 meal planner.
// Keep this file separate so the visual room UI can evolve independently of meal data.

const MEALS = {
  1:{},2:{},3:{},4:{},5:{},
  6:{prep:true},
  7:{},
  8:{noshop:true, note:"No dinner planned"},
  9:{meal:"Caesar chicken wraps & brussels sprouts", link:"https://www.iheartnaptime.net/chicken-caesar-wraps/", source:"I Heart Naptime"},
  10:{meal:"Chicken over arugula & tomatoes with lemon pasta", link:"https://www.tiktok.com/t/ZP8c7bWkq/", source:"TikTok"},
  11:{meal:"Leftovers (Grill?)", tag:"left", note:"From 9/9 Caesar wraps"},
  12:{meal:"Homemade pizza"},
  13:{meal:"Buffalo chicken dip & blueberry pull-apart bread", link:"https://www.tiktok.com/t/ZP8c7Xxnj/", source:"TikTok (bread)", extraLink:"https://www.shugarysweets.com/buffalo-chicken-dip/", extraSource:"Shugary Sweets (dip)", prep:true},
  14:{meal:"Cilantro lime chicken sandwiches", link:"https://www.tiktok.com/t/ZP8c7tFSs/", source:"TikTok", tag:"lunch"},
  15:{meal:"Buffalo chicken quesadillas"},
  16:{meal:"Homemade chicken noodle soup", link:"https://kitchenconfidante.com/simple-chicken-noodle-soup", source:"Kitchen Confidante", tag:"lunch"},
  17:{noshop:true, note:"Red Hen dinner date"},
  18:{noshop:true, note:"Beach?"},
  19:{noshop:true, note:"Beach?"},
  20:{noshop:true, note:"Beach?", prep:true},
  21:{meal:"Chorizo kale soup", link:"https://www.tiktok.com/t/ZP8c7sYeo/", source:"TikTok"},
  22:{meal:"Ina Garten chicken thighs, creamy mustard sauce", link:"https://www.foodnetwork.com/recipes/ina-garten/chicken-thighs-with-creamy-mustard-sauce-5468298", source:"Food Network / Barefoot Contessa", tag:"lunch"},
  23:{meal:"Leftovers", tag:"left", note:"From 9/21 chorizo kale soup"},
  24:{meal:"Grilled shrimp tacos", link:"https://www.tiktok.com/t/ZP8c7HCwm/", source:"TikTok (marinade)", extraLink:"https://www.mexicoinmykitchen.com/chipotle-shrimp-tacos/", extraSource:"Mexico in My Kitchen (full recipe)"},
  25:{noshop:true, note:"No dinner planned"},
  26:{noshop:true, note:"Margate Fall Fest"},
  27:{noshop:true, note:"Pizzeria Beddia / Phillies Game", prep:true},
  28:{meal:"Lemon risotto pasta", link:"https://www.foodiecrush.com/easy-lemon-orzo-faux-risotto/", source:"Foodiecrush"},
  29:{meal:"Hot dogs & hamburgers — grill"},
  30:{noshop:true, note:"OL Cyber awards event"}
};

const DAY_INGR = {
  6:[{i:"Chicken breast or thighs (meal prep)",q:"1.5 lbs",c:"Meat & Seafood"},{i:"Rice, dry (meal prep)",q:"1.5 cups",c:"Pantry"}],
  9:[
    {i:"Large flour tortillas or flatbreads",q:"4",c:"Bread & Bakery"},
    {i:"Romaine lettuce",q:"1 head",c:"Produce"},
    {i:"Chicken breast",q:"1 lb",c:"Meat & Seafood"},
    {i:"Grape tomatoes",q:"1 cup",c:"Produce"},
    {i:"Bacon",q:"4-6 slices",c:"Meat & Seafood"},
    {i:"Avocado",q:"1",c:"Produce"},
    {i:"Caesar dressing",q:"bottled",c:"Dairy & Refrigerated"},
    {i:"Parmesan cheese",q:"shredded/shaved",c:"Dairy & Refrigerated"},
    {i:"Brussels sprouts",q:"1 lb",c:"Produce"},
    {i:"Olive oil",q:"for roasting",c:"Pantry"}
  ],
  10:[
    {i:"Chicken breast",q:"1 lb (2 breasts)",c:"Meat & Seafood"},
    {i:"Egg",q:"1",c:"Dairy & Refrigerated"},
    {i:"Italian breadcrumbs",q:"3/4 cup",c:"Pantry"},
    {i:"Parmesan cheese",q:"grated",c:"Dairy & Refrigerated"},
    {i:"Angel hair pasta",q:"8 oz",c:"Pantry"},
    {i:"Lemons",q:"3",c:"Produce"},
    {i:"Butter",q:"2 tbsp",c:"Dairy & Refrigerated"},
    {i:"Fresh parsley",q:"small bunch",c:"Produce"},
    {i:"Arugula",q:"5 oz box",c:"Produce"},
    {i:"Cherry tomatoes",q:"1 pint",c:"Produce"},
    {i:"Canola oil",q:"for frying",c:"Pantry"}
  ],
  12:[
    {i:"Pizza dough",q:"2 balls",c:"Bread & Bakery"},
    {i:"Pizza sauce",q:"1 jar",c:"Pantry"},
    {i:"Mozzarella cheese, shredded",q:"2 cups",c:"Dairy & Refrigerated"},
    {i:"Toppings of choice (pepperoni, veggies)",q:"to taste",c:"Meat & Seafood"}
  ],
  13:[
    {i:"Cream cheese",q:"2 sticks (16 oz)",c:"Dairy & Refrigerated"},
    {i:"Blue cheese dressing",q:"1 bottle",c:"Dairy & Refrigerated"},
    {i:"Shredded Mexican cheese blend",q:"1 bag",c:"Dairy & Refrigerated"},
    {i:"Shredded chicken",q:"1 large can",c:"Meat & Seafood"},
    {i:"Celery",q:"for dipping",c:"Produce"},
    {i:"Bread flour",q:"3 1/8 cups",c:"Pantry"},
    {i:"Granulated sugar",q:"~3/4 cup + 2 tbsp",c:"Pantry"},
    {i:"Whole milk",q:"3/4 cup",c:"Dairy & Refrigerated"},
    {i:"Unsalted butter",q:"~5 tbsp",c:"Dairy & Refrigerated"},
    {i:"Active dry yeast",q:"1 packet",c:"Pantry"},
    {i:"Eggs",q:"2",c:"Dairy & Refrigerated"},
    {i:"Blueberries",q:"2 cups",c:"Produce"},
    {i:"Lemon juice",q:"1 tbsp",c:"Produce"},
    {i:"Cornstarch",q:"1 tbsp",c:"Pantry"},
    {i:"Confectioners' sugar",q:"small bag",c:"Pantry"},
    {i:"Vanilla extract & lemon extract",q:"small bottles",c:"Pantry"},
    {i:"Chicken breast or thighs (meal prep)",q:"1.5 lbs",c:"Meat & Seafood"},
    {i:"Rice, dry (meal prep)",q:"1.5 cups",c:"Pantry"}
  ],
  14:[
    {i:"Chicken breast",q:"2 lbs",c:"Meat & Seafood"},
    {i:"All-purpose flour",q:"for dredging",c:"Pantry"},
    {i:"Eggs",q:"3",c:"Dairy & Refrigerated"},
    {i:"Corn flakes cereal",q:"4 cups",c:"Pantry"},
    {i:"Avocado oil",q:"for sauce",c:"Pantry"},
    {i:"Limes",q:"3",c:"Produce"},
    {i:"Honey",q:"for sauce + slaw",c:"Pantry"},
    {i:"Ground cumin",q:"1 tsp",c:"Pantry"},
    {i:"Garlic",q:"3 cloves",c:"Produce"},
    {i:"Ciabatta rolls",q:"6",c:"Bread & Bakery"},
    {i:"Cucumbers",q:"2",c:"Produce"},
    {i:"Green cabbage",q:"1/2 head",c:"Produce"},
    {i:"Jalapeño",q:"2",c:"Produce"},
    {i:"Pickles (for brine)",q:"1 jar",c:"Pantry"},
    {i:"Garlic powder & onion powder",q:"pantry spices",c:"Pantry"}
  ],
  15:[
    {i:"Tortilla shells",q:"4-6",c:"Bread & Bakery", note:"reusing leftover buffalo chicken dip as filling"}
  ],
  16:[
    {i:"Olive oil",q:"2 tbsp",c:"Pantry"},
    {i:"Yellow onion",q:"1",c:"Produce"},
    {i:"Garlic",q:"2 cloves",c:"Produce"},
    {i:"Carrots",q:"3 medium",c:"Produce"},
    {i:"Celery",q:"2 stalks",c:"Produce"},
    {i:"Chicken broth",q:"6 cups",c:"Pantry"},
    {i:"Chicken tenderloin or breast",q:"1.5 lbs",c:"Meat & Seafood"},
    {i:"Egg noodles",q:"8 oz",c:"Pantry"},
    {i:"Fresh thyme",q:"1 sprig",c:"Produce"},
    {i:"Fresh parsley",q:"garnish",c:"Produce"}
  ],
  20:[{i:"Chicken breast or thighs (meal prep)",q:"1.5 lbs",c:"Meat & Seafood"},{i:"Rice, dry (meal prep)",q:"1.5 cups",c:"Pantry"}],
  21:[
    {i:"Chorizo sausage",q:"6 links (~1.5 lbs)",c:"Meat & Seafood"},
    {i:"Potatoes",q:"4",c:"Produce"},
    {i:"Yellow onion",q:"2",c:"Produce"},
    {i:"Garlic",q:"16 cloves (2 heads)",c:"Produce"},
    {i:"Chicken stock",q:"10-12 cups",c:"Pantry"},
    {i:"Kale",q:"2 bunches",c:"Produce"},
    {i:"Black pepper",q:"to taste",c:"Pantry"}
  ],
  22:[
    {i:"Bone-in, skin-on chicken thighs",q:"8 medium (2 1/4 lbs)",c:"Meat & Seafood"},
    {i:"Olive oil",q:"as needed",c:"Pantry"},
    {i:"Yellow onions",q:"2",c:"Produce"},
    {i:"Dry white wine",q:"2 tbsp",c:"Pantry"},
    {i:"Crème fraîche (or sour cream)",q:"8 oz",c:"Dairy & Refrigerated"},
    {i:"Dijon mustard",q:"1 tbsp",c:"Pantry"},
    {i:"Whole-grain mustard",q:"1 tsp",c:"Pantry"},
    {i:"Fresh parsley",q:"1 tbsp chopped",c:"Produce"}
  ],
  24:[
    {i:"Large shrimp, peeled & deveined",q:"1 lb",c:"Meat & Seafood"},
    {i:"Achiote paste",q:"small jar",c:"Pantry"},
    {i:"Chipotle peppers in adobo",q:"1 can",c:"Pantry"},
    {i:"Yellow onion",q:"1",c:"Produce"},
    {i:"Garlic",q:"3 cloves",c:"Produce"},
    {i:"Dried oregano",q:"1 tsp",c:"Pantry"},
    {i:"Limes",q:"3",c:"Produce"},
    {i:"Corn or flour tortillas",q:"8 small",c:"Bread & Bakery"},
    {i:"Green cabbage (for slaw)",q:"1 cup shredded",c:"Produce"},
    {i:"Avocado (optional)",q:"1",c:"Produce"},
    {i:"Cotija cheese (optional)",q:"small container",c:"Dairy & Refrigerated"}
  ],
  27:[{i:"Chicken breast or thighs (meal prep)",q:"1.5 lbs",c:"Meat & Seafood"},{i:"Rice, dry (meal prep)",q:"1.5 cups",c:"Pantry"}],
  28:[
    {i:"Butter",q:"2 tbsp",c:"Dairy & Refrigerated"},
    {i:"Olive oil",q:"1 tsp",c:"Pantry"},
    {i:"Yellow onion",q:"1/2",c:"Produce"},
    {i:"Orzo pasta",q:"8-12 oz",c:"Pantry"},
    {i:"Chicken or vegetable broth",q:"2-3 cups",c:"Pantry"},
    {i:"Lemons",q:"2",c:"Produce"},
    {i:"Parmesan cheese",q:"grated",c:"Dairy & Refrigerated"}
  ],
  29:[
    {i:"Hot dogs",q:"1 package",c:"Meat & Seafood"},
    {i:"Ground beef",q:"1 lb",c:"Meat & Seafood"},
    {i:"Hot dog buns",q:"1 pack",c:"Bread & Bakery"},
    {i:"Hamburger buns",q:"1 pack",c:"Bread & Bakery"},
    {i:"Cheese slices",q:"for burgers",c:"Dairy & Refrigerated"},
    {i:"Ketchup, mustard, relish",q:"check what you have",c:"Pantry"},
    {i:"Lettuce, tomato, onion",q:"for topping",c:"Produce"}
  ]
};

const MASTER = [
  {cat:"Produce", items:[
    ["Romaine lettuce","1 head"],["Arugula","5 oz box"],["Cherry or grape tomatoes","2 pints"],
    ["Avocados","2"],["Brussels sprouts","1 lb"],["Lemons","5"],["Limes","6"],
    ["Cilantro","2 bunches"],["Yellow onions","8"],["Garlic","3 heads"],["Jalapeño","2"],
    ["Cucumbers","2"],["Green cabbage","1 head"],["Kale","2 bunches"],["Potatoes","4"],
    ["Fresh parsley","2 bunches"],["Carrots","3 medium"],["Celery","1 bunch (soup + dip dipping)"],
    ["Fresh thyme","1 small pack"],["Blueberries","2 cups"],
    ["Lettuce, tomato, onion (burger toppings)","small amounts"]
  ]},
  {cat:"Meat & Seafood", items:[
    ["Boneless skinless chicken breast (dinners)","~4 lbs total"],
    ["Chicken tenderloin or breast (soup)","1.5 lbs"],
    ["Bone-in, skin-on chicken thighs","2¼ lbs / 8 medium"],
    ["Chorizo sausage","6 links (~1.5 lbs)"],
    ["Large shrimp, peeled & deveined","1 lb"],
    ["Ground beef","1 lb"],["Hot dogs","1 package"],["Bacon","1 small package"],
    ["Shredded chicken (canned, for buffalo dip)","1 large can"],
    ["Chicken breast or thighs — weekly meal prep","6 lbs total (1.5 lbs × 4 weeks, 1 person)"]
  ]},
  {cat:"Dairy & Refrigerated", items:[
    ["Eggs","1 dozen"],["Parmesan cheese","1 wedge + 1 shredded bag"],["Butter","2 sticks"],
    ["Cream cheese","2 sticks (16 oz)"],["Crème fraîche (or use sour cream)","8 oz"],
    ["Shredded Mexican cheese blend","1 bag"],["Shredded mozzarella / Monterey Jack","2 cups"],
    ["Whole milk","1/2 pint"],["Caesar dressing","1 bottle"],
    ["Blue cheese dressing","1 bottle"],["Cheese slices","for burgers"],
    ["Cotija cheese (optional)","small container"]
  ]},
  {cat:"Bread & Bakery", items:[
    ["Large flour tortillas","6-pack (wraps)"],["Tortilla shells (quesadillas)","4-6"],
    ["Small corn or flour tortillas","8-pack (tacos)"],
    ["Ciabatta rolls","6"],["Hot dog buns","1 pack"],["Hamburger buns","1 pack"],["Pizza dough","2 balls"]
  ]},
  {cat:"Pantry & Dry Goods", items:[
    ["Angel hair pasta","12 oz"],["Orzo pasta","16 oz box"],["Egg noodles","8 oz"],
    ["Italian-style breadcrumbs","1 cup"],["Corn flakes cereal","1 box"],
    ["All-purpose flour","1 bag"],["Bread flour (or sub AP)","3 cups"],["Active dry yeast","1 packet"],
    ["Granulated sugar","1 bag"],["Confectioners' sugar","small bag"],["Cornstarch","small container"],
    ["Vanilla extract & lemon extract","small bottles"],["Chicken broth/stock","~6 cartons (32 oz)"],
    ["Canola oil","for frying"],["Avocado oil",""],["Olive oil",""],
    ["Dry white wine","small bottle"],["Honey",""],["Dijon mustard",""],["Whole-grain mustard","small jar"],
    ["Jarred pickles","for brine"],
    ["Achiote paste","1 small jar"],["Chipotle peppers in adobo","1 can"],["Dried oregano",""],
    ["Ground cumin",""],["Garlic powder & onion powder",""],["Kosher salt & black pepper",""],
    ["Ketchup, mustard, relish","check what you have"],
    ["Pizza sauce","1 jar"],["Rice, dry — weekly meal prep","6 cups total (1.5 cups × 4 weeks)"]
  ]}
];

const WEEKS = [
  {label:"Week 1", range:"Aug 31 – Sep 5", days:[1,2,3,4,5]},
  {label:"Week 2", range:"Sep 6 – Sep 12", days:[6,7,8,9,10,11,12]},
  {label:"Week 3", range:"Sep 13 – Sep 19", days:[13,14,15,16,17,18,19]},
  {label:"Week 4", range:"Sep 20 – Sep 26", days:[20,21,22,23,24,25,26]},
  {label:"Week 5", range:"Sep 27 – Sep 30", days:[27,28,29,30]}
];
