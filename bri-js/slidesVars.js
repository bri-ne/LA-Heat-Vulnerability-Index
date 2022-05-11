




//= === Function_outlines Vars ===//

const sidebar = document.querySelector(".side-bar");
const slideTitleDiv = document.querySelector('.slide-title');
const slideContentDiv = document.querySelector('.slide-content');

// for map change and data table change
let checkboxContainer;

let allButResources;
/*= == Slides === */
const storySlide = {
  title: '<h1> Abstract </h1>',
  slide: 'storySlide',
  content: '<p><b>Motivations and Acknowledgements:</b><p>Taking inspiration from the City of Philadelphia&apos;s "Philadelphia Heat Vulnerability Index" story map, we hope to highlight the populations and areas within Los Angeles that are most vulnerable to extreme heat events. Our general process:<ol><li>conducted a literature review to assess which demographic groups would be most susceptible to extreme heat events</li><li>gathered open source and organization data to create features that represent the social and physical vulnerabilities for each Census tract in the City,</li><li>calculated and mapped the physical and social vulnerability of each Census tract in the City,</li><li>overlayed the physical and social vulnerability maps to reveal the areas of the City that are most vulnerable to extreme heat events</li></ol></p><p><b>Literature Review and Methods:</b><p>The Centers for Disease Control and Prevention provide literature and explanations regarding the demographic groups that are considered most at-risk to extreme heat events. These include:<ul><li>percent 65 years or older</li><li>percent 5 years or younger</li><li>percent living below the Federal Poverty Level</li><li>percent over the age of 25 w/o a high school diploma</li><li>percent limited English-speaking households</li><li>percent single parent households</li><li>percent homeless or displaced individuals</li><li>percent non-white individuals</li><li>percent individuals with asthma</li><li>percent without a car</li><li>percent unemployed</li></ul></p><p>In order to calculate a Census tract&apos;s physical vulnerability, we used granular temperature data (provided by CHAT), as well as land-use and proximity features. More specifically, these are the factors that were incorporated into the physical vulnerability calculation:<ul><li>difference between historical and projected temperature (Fahrenheit)</li><li>difference between potential and existing tree canopy coverage (percent)</li><li>nearest distance to community resource</li><li>count of each community resource<ol><li>emergency prepardeness sites</li><li>cooling centers</li><li>public parks</li><li>public pools and spraygrounds</li><li>hospitals and urgent cares</li></ol></li><li>percent PM 2.5 concentration</li><li>percent ozone concentration</li></ul></p><p><b>Conclusions and Usability:</b><p>With the physical and social vulnerability scores that we calculated for each Census tract, we produced our Los Angeles Heat Vulnerability Index interactive map - illustrating the areas of Los Angeles that are most susceptible to extreme heat events and identifying important local community resources that exist to help people cope with and mitigate the effects of extreme heat. With this map, we hope to educate individuals within the City about their relative vulnerability to extreme heat events as well as help bridge the gap between community resources and the people who need them most. Additionally, we encourage that the City use our map to inform residents of this multi-faceted issue and to aid in the allocation of climate-adaptive resources and strategies.</p><p><em>The Los Angeles Heat Vulnerability Index was created by University of Pennsylvania MUSA (Master of Urban Spatial Analytics) students, Briana Cervantes and Aidan Cole. Please contact cerb@upenn.edu or apcole@upenn.edu for more information.</em></p></p>'
};

// <input type="checkbox" id="Resources"><h4>Resources</h4>
const filterslide = {
  title: '<h1> Map Layers </h1>',
  slide: 'filterSlide',
  content: `<div class="checkies">
  <h2><input type="checkbox" id="HVI" class="largerCheck"> &nbspOverall Heat Vulnerability Index</h2>
  <ul>
  <li><input type="checkbox" id="SVI" class="mediumCheck"> &nbspSocial Heat Vulnerability Score</li>
  <li><input type="checkbox" id="PVI" class="mediumCheck"> &nbspPhysical Heat Vulnerability Score</li>
  </ul>
  <h2><input type="checkbox" id="Resources" class="largerCheck"> &nbspAll Resources</h2>
  <ul>
    <li><input type="checkbox" id="coolingCenters" class="mediumCheck"> &nbspCooling Centers</li>
    <li><input type="checkbox" id="pools" class="mediumCheck"> &nbspPublic Pools</li>
    <li><input type="checkbox" id="emergencyP" class="mediumCheck"> &nbspEmergency Preparedness Centers</li>
    <li><input type="checkbox" id="parks" class="mediumCheck"> &nbspParks and Greenspaces</li>
    <li><input type="checkbox" id="hosp" class="mediumCheck"> &nbspHospitals</li>
  </ul>
 </div>`,
};

const slides = [storySlide, filterslide];

const motive = {
  title: 'Summary Statistics',
  slide: 'motive',
  content: `<p>Here, we want to put an interactive data table that presents summary statistics depending on the layer shown and the user's selected Census Tract.</p>`
};

// const motivationText = [motive]
