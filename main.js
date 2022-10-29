const curStudents = [
{
  id: 1,
  name: "Harry",
  house: "Ravenclaw"
},

{
  id: 2,
  name: "Paul",
  house: "Slytherin"
},
{
  id: 3,
  name: "Sciffes",
  house: "Gryffindor"
},
{
  id: 4,
  name: "Gorland",
  house: "Hufflepuff"
},

];
const expelledStudents = [
  {
    id: 1,
    name: "Gorland",
    house: "Hufflepuff"
  }
];

const stuHouse = [
  "Ravenclaw", 
  "Slytherin",
  "Gryffindor",
  "Hufflepuff"
];

const renderToDom = (divId, htmlToRender) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = htmlToRender;
};

//Welcome Function
const welcomeFunction= () => {
  let domString = 
  `<div class="card">
    <div class="card-body">
      <h5 class="card-title">We are Honored by Your Inquiry</h5>
      <p class="card-text">Peruvian-Night-Powder werewolf, Dobby pear-tickle half-moon-glasses, Knight-Bus. Padfoot snargaluff seeker: Hagrid broomstick mischief managed..</p>

      <form><button class="btn btn-primary" id="welcomeButton">Let's Find Our House!</button></form>
      
    </div>
  </div>`;

renderToDom("#form", domString)
};

//Welcome Button 
const welcomeButton = () => {
document.querySelector("#welcomeButton").addEventListener('click', ForumFunction);
};

//Function Prompt's First Year for Their Name 
const ForumFunction = () => {

const domString = 
`<h3>
Enter the student's name:
</h3>
<div class="form-floating mb-3">
    <div class="card">
      <input type="text" class="form-control" placeholder="Name" id="name">
    </div>
    
    <button class="btn btn-dark" type="submit">Submit</button>
</div>`
;

renderToDom('form', domString);

};

//Renders current students on DOM
const curStudentsOnDom= (studentDisplay) => {
  let domString = "";

  for (const student of studentDisplay)
  {
  domString += 
`
<div class="card">
<div class="card text-center">
  <div class="card-body">${student.name}</div>

  <div class="card-footer ${student.house}"> ${student.house}<br></div>

  <button class="btn btn-danger" id="delete--${student.id}">Expel</button>
</div>
</div>`;
  }
  renderToDom("#curStudents", domString);

};

//Renders expelled students on DOM
const exStudentsOnDom= (studentDisplay) => {
  let domString = "";

  for (const student of studentDisplay)
  {
  domString += 

`<div class="card">
<div class="card text-center">
  <div class="card-body">${student.name}</div>
  <div class="card-footer"> ${student.house}<br></div>
</div>
</div>`;
  }
  renderToDom("#expelled", domString);

};

//Filter buttons 
const allButton = document.querySelector("#allButton");
const showAllRavens = document.querySelector("#RavenclawButton");
const showAllGryfs = document.querySelector("#GryffindorButton");
const showAllSlyths = document.querySelector("#SlytherinButton");
const showAllHuffs = document.querySelector("#HuffleButton");

//Filters button eventlistenrs
allButton.addEventListener('click', () => 
{
    curStudentsOnDom(curStudents);
});

showAllRavens.addEventListener('click', () => 
{
  const ravens = filter (curStudents, 'Ravenclaw');
  curStudentsOnDom(ravens);
});

showAllGryfs.addEventListener('click', () => 
{
    const gryfs = filter (curStudents, 'Gryffindor');
    curStudentsOnDom(gryfs);
});

showAllSlyths.addEventListener('click', () => 
{
    const slys = filter (curStudents, 'Slytherin');
    curStudentsOnDom(slys);
});

showAllHuffs.addEventListener('click', () => 
{
  const huffs = filter (curStudents, 'Hufflepuff');
  curStudentsOnDom(huffs);
});


//Filters functions that filters students by houses
const filter = (curStudents, houseType) => 
{
    const stuArray =[];

    for (const stu of curStudents)
    {
      if (stu.house === houseType)
      {
        stuArray.push(stu);
      }
    }
    return stuArray;
  };

//Create new student id
const newStuID = (studentArray) =>
{
   if (studentArray.length)
   {
    const idArray = [];
    for (const stu of studentArray)
      {
        idArray.push(stu.id);
      }
      return Math.max(...idArray) + 1;
   }
   else
   {
      return 0;
   }

};

//Submits new First Year student when the button is clicked
const submitButton = () => { 
  
  const form = document.querySelector('form');
console.log('works too')
  //Function to add new students in the curStundent array
  form.addEventListener('submit', (event) => {
    console.log('submit');
    event.preventDefault();
  
    const newStudentObj = {
      id: newStuID(curStudents),
      name: document.querySelector("#name").value,
      house: stuHouse[Math.floor((Math.random() * stuHouse.length))]
    };
      //Pushes new student into Current First Year's and renders them on DOM
      curStudents.push(newStudentObj)
      curStudentsOnDom(curStudents);
      form.reset();

})
};

//Function that expels student from current student array
const ExpelStu = () => {
const expelStudent = document.querySelector("#curStudents");

expelStudent.addEventListener('click', (event) => {
  if(event.target.id.includes('delete')) 
    {
      const [, id] = event.target.id.split("--");

      const index = curStudents.findIndex((student) => student.id === Number(id));

      const troubleStudent = curStudents.splice(index, 1);

      expelledStudents.push(troubleStudent[0]);

      curStudentsOnDom(curStudents);
      exStudentsOnDom(expelledStudents);
    }
});

};


//Start App Function
const startApp = () => 
{
  curStudentsOnDom(curStudents);
  exStudentsOnDom(expelledStudents);  
  welcomeFunction();
  welcomeButton();
  submitButton();
  ExpelStu();
  filter();
};

startApp();
