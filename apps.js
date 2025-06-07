function showApp(appName) {
    const sections = document.querySelectorAll(".app-section");
    sections.forEach((section) => section.classList.remove("active"));
    const target = document.getElementById(`${appName}-app`);
    if (target) target.classList.add("active");
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.remove("active");
  }
  
  document.getElementById("hamburger").addEventListener("click", () => {
    document.getElementById("navMenu").classList.toggle("active");
  });
  
  

  function updateFormula() {
    const conversionType = document.getElementById("conversion-type").value;
    const formulaElement = document.getElementById("formula");
    if (conversionType === "ftoc") {
      formulaElement.textContent = "Formula: (F - 32) × 5/9 = C";
    } else {
      formulaElement.textContent = "Formula: (C × 9/5) + 32 = F";
    }
  }
  
  function assessTemperature(temp, scale) {
    const tempElement = document.getElementById("temp-assessment");
    let assessment = "", color = "";
    if (scale === "celsius") {
      if (temp <= 0) { assessment = "Very Cold"; color = "#3498db"; }
      else if (temp < 10) { assessment = "Cold"; color = "#7fb3d5"; }
      else if (temp < 20) { assessment = "Cool"; color = "#a9cce3"; }
      else if (temp < 30) { assessment = "Moderate"; color = "#2ecc71"; }
      else if (temp < 40) { assessment = "Warm"; color = "#f39c12"; }
      else { assessment = "Hot"; color = "#e74c3c"; }
    } else {
      if (temp <= 32) { assessment = "Very Cold"; color = "#3498db"; }
      else if (temp <= 49) { assessment = "Cold"; color = "#7fb3d5"; }
      else if (temp <= 67) { assessment = "Cool"; color = "#a9cce3"; }
      else if (temp <= 85) { assessment = "Moderate"; color = "#2ecc71"; }
      else if (temp <= 103) { assessment = "Warm"; color = "#f39c12"; }
      else { assessment = "Hot"; color = "#e74c3c"; }
    }
    tempElement.textContent = `Temperature Assessment: ${assessment}`;
    tempElement.style.color = color;
    tempElement.style.fontWeight = "bold";
  }
  
  function convertTemperature() {
    const temperatureInput = document.getElementById("temperature").value;
    const temperatureValue = parseFloat(temperatureInput);
    const conversionType = document.getElementById("conversion-type").value;
    const resultElement = document.getElementById("conversion-result");
    if (isNaN(temperatureValue)) {
      resultElement.textContent = "Invalid input. Please enter a number.";
      document.getElementById("temp-assessment").textContent = "";
      return;
    }
    let result = 0;
    if (conversionType === "ftoc") {
      result = (temperatureValue - 32) * 5 / 9;
      resultElement.textContent = `${temperatureValue}°F = ${result.toFixed(2)}°C`;
      assessTemperature(result, "celsius");
    } else {
      result = (temperatureValue * 9 / 5) + 32;
      resultElement.textContent = `${temperatureValue}°C = ${result.toFixed(2)}°F`;
      assessTemperature(result, "fahrenheit");
    }
  }
  
  function clearConverter() {
    document.getElementById("temperature").value = "";
    document.getElementById("conversion-result").textContent = "";
    document.getElementById("temp-assessment").textContent = "";
  }
  
  // ========== TASK LIST ========== //
  let tasks = [];
  let taskDueDates = [];
  const randomTasks = [
    "Take a short walk", "Drink a glass of water", "Stretch for 5 minutes",
    "Practice deep breathing for 2 minutes", "Stand up and move around for 5 minutes",
    "Do a quick meditation session", "Write in a gratitude journal", "Have a healthy snack",
    "Rest your eyes for 2 minutes", "Fix your posture", "Do a quick workout",
    "Call a friend or family member", "Take a short nap", "Listen to calming music",
    "Drink a cup of tea", "Practice mindfulness for 5 minutes", "Step outside for fresh air",
    "Do a quick stretching routine"
  ];
  
  const taskInput = document.getElementById('task-input');
  const dateInput = document.getElementById('date-input');
  const timeInput = document.getElementById('time-input');
  const taskList = document.getElementById('task-list');
  
  function validateDate(dateStr) {
    if (dateStr.indexOf('/') !== dateStr.lastIndexOf('/') || dateStr.indexOf('/') === -1) return false;
    const parts = dateStr.split('/');
    if (parts.length !== 2 || parts[0].length !== 2 || parts[1].length !== 2) return false;
    const [month, day] = parts;
    for (let char of month + day) {
      if (char.charCodeAt(0) < 48 || char.charCodeAt(0) > 57) return false;
    }
    const monthNum = parseInt(month, 10), dayNum = parseInt(day, 10);
    if (monthNum < 1 || monthNum > 12) return false;
    const daysInMonth = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (dayNum < 1 || dayNum > daysInMonth[monthNum]) return false;
    return true;
  }
  
  function validateTime(timeStr) {
    if (timeStr.indexOf(':') !== timeStr.lastIndexOf(':') || timeStr.indexOf(':') === -1) return false;
    const parts = timeStr.split(':');
    if (parts.length !== 2 || parts[0].length !== 2 || parts[1].length !== 2) return false;
    const [hourStr, minStr] = parts;
    for (let char of hourStr + minStr) {
      if (char.charCodeAt(0) < 48 || char.charCodeAt(0) > 57) return false;
    }
    const hours = parseInt(hourStr, 10), minutes = parseInt(minStr, 10);
    return (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59);
  }
  
  function calculatePriority(dateStr, timeStr) {
    const year = new Date().getFullYear();
    const [month, day] = dateStr.split('/').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    const dueDate = new Date(year, month - 1, day, hours, minutes);
    return dueDate.getTime();
  }
  
  function addTask() {
    const taskText = taskInput.value.trim();
    const dateStr = dateInput.value.trim();
    const timeStr = timeInput.value.trim();
    if (taskText === '') return alert('Please enter a task first!');
    if (!validateDate(dateStr)) return alert('Please enter a valid date in MM/DD format!');
    if (!validateTime(timeStr)) return alert('Please enter a valid time in 24-hour format (HH:MM)!');
  
    const priority = calculatePriority(dateStr, timeStr);
    tasks.push([taskText, priority]);
    taskDueDates.push([dateStr, timeStr]);
    sortTasksByPriority();
    updateTaskDisplay();
    clearInput();
  }
  
  function addRandomTask() {
    const randomIndex = Math.floor(Math.random() * randomTasks.length);
    taskInput.value = randomTasks[randomIndex];
    dateInput.focus();
  }
  
  function sortTasksByPriority() {
    const indices = Array.from(tasks.keys());
    indices.sort((a, b) => tasks[a][1] - tasks[b][1]);
    tasks = indices.map(i => tasks[i]);
    taskDueDates = indices.map(i => taskDueDates[i]);
  }
  
  function handleKeyPress(event) {
    if (event.key === 'Enter') addTask();
  }
  
  taskInput.onkeydown = handleKeyPress;
  
  function clearInput() {
    taskInput.value = '';
    dateInput.value = '';
    timeInput.value = '';
    taskInput.focus();
  }
  
  function updateTaskDisplay() {
    taskList.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
      const taskText = tasks[i][0];
      const [dateStr, timeStr] = taskDueDates[i];
      const [month, day] = dateStr.split('/').map(Number);
      const [hours, minutes] = timeStr.split(':').map(Number);
      const now = new Date();
      const year = now.getFullYear();
      const dueDate = new Date(year, month - 1, day, hours, minutes);
      const diffHours = (dueDate - now) / (1000 * 60 * 60);
      let priorityClass = 1;
      if (diffHours < 0) priorityClass = 1;
      else if (diffHours < 4) priorityClass = 1;
      else if (diffHours < 24) priorityClass = 2;
      else if (diffHours < 48) priorityClass = 3;
      else if (diffHours < 72) priorityClass = 4;
      else priorityClass = 5;
  
      const listItem = document.createElement('li');
      listItem.className = 'task-item';
      const taskDetails = document.createElement('div');
      taskDetails.className = 'task-details';
      const taskTextContainer = document.createElement('span');
      taskTextContainer.className = 'task-text';
      const priorityDot = document.createElement('span');
      priorityDot.className = `priority-indicator priority-${priorityClass}`;
      const taskTextElement = document.createTextNode(taskText);
      const dueDateText = document.createElement('span');
      dueDateText.className = 'due-date-text';
      dueDateText.textContent = `Due: ${dateStr} at ${timeStr}`;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete-button';
      deleteButton.onclick = () => deleteTask(i);
      taskTextContainer.appendChild(priorityDot);
      taskTextContainer.appendChild(taskTextElement);
      taskDetails.appendChild(taskTextContainer);
      taskDetails.appendChild(dueDateText);
      listItem.appendChild(taskDetails);
      listItem.appendChild(deleteButton);
      taskList.appendChild(listItem);
    }
  }
  
  function deleteTask(index) {
    tasks.splice(index, 1);
    taskDueDates.splice(index, 1);
    updateTaskDisplay();
  }
  
  function clearTasks() {
    tasks = [];
    taskDueDates = [];
    updateTaskDisplay();
  }
  
  
  // ========== CALCULATOR ========== //
  let memory = 0;
  let currentInput = "0";
  let currentOperator = null;
  let leftOperand = null;
  let waitingForRightOperand = false;
  let lastOperation = "";
  let calculationDone = false;
  
  const display = document.getElementById('display');
  const history = document.getElementById('history');
  display.value = "0";
  
  function appendToDisplay(value) {
    if (calculationDone && !isNaN(value)) {
      clearDisplay();
      calculationDone = false;
    } else if (calculationDone) {
      calculationDone = false;
    }
    if (waitingForRightOperand) {
      display.value = value;
      waitingForRightOperand = false;
    } else {
      if (display.value === "0" && value !== ".") {
        display.value = value;
      } else {
        display.value += value;
      }
    }
    currentInput = display.value;
  }
  
  function clearDisplay() {
    display.value = "0";
    currentInput = "0";
  }
  
  function clearAll() {
    clearDisplay();
    history.textContent = "";
    leftOperand = null;
    currentOperator = null;
    waitingForRightOperand = false;
    lastOperation = "";
  }
  
  function clearMemory() {
    memory = 0;
  }
  
  function recallMemory() {
    display.value = memory;
    currentInput = display.value;
  }
  
  function addToMemory() {
    memory += parseFloat(display.value);
  }
  
  function subtractFromMemory() {
    memory -= parseFloat(display.value);
  }
  
  function deleteLast() {
    display.value = display.value.length > 1 ? display.value.slice(0, -1) : "0";
    currentInput = display.value;
  }
  
  function evaluateExpression(expression) {
    if (!isNaN(parseFloat(expression)) && isFinite(expression)) {
      return parseFloat(expression);
    }
    const tokens = [], operators = "+-*/";
    let currentNumber = '';
    for (let char of expression) {
      if (operators.includes(char)) {
        if (currentNumber) {
          tokens.push(parseFloat(currentNumber));
          currentNumber = '';
        }
        tokens.push(char);
      } else {
        currentNumber += char;
      }
    }
    if (currentNumber) tokens.push(parseFloat(currentNumber));
    for (let i = 1; i < tokens.length; i += 2) {
      if (tokens[i] === '*') {
        tokens[i-1] *= tokens[i+1];
        tokens.splice(i, 2);
        i -= 2;
      } else if (tokens[i] === '/') {
        tokens[i-1] /= tokens[i+1];
        tokens.splice(i, 2);
        i -= 2;
      }
    }
    let result = tokens[0];
    for (let i = 1; i < tokens.length; i += 2) {
      if (tokens[i] === '+') result += tokens[i+1];
      else if (tokens[i] === '-') result -= tokens[i+1];
    }
    return result;
  }
  
  function insertMathFunction(func) {
    try {
      const value = parseFloat(display.value);
      let result = null, operation = '';
      if (func === 'sqrt') { result = Math.sqrt(value); operation = `√(${value})`; }
      else if (func === 'abs') { result = Math.abs(value); operation = `|${value}|`; }
      else if (['sin','cos','tan','asin','acos','atan','log','exp','round','ceil','floor'].includes(func)) {
        result = func === 'log' ? Math.log10(value) : Math[func](value);
        operation = `${func}(${value})`;
      } else if (func === 'pow') {
        leftOperand = value;
        currentOperator = 'pow';
        waitingForRightOperand = true;
        history.textContent = `${value}^`;
        return;
      }
      history.textContent = operation;
      display.value = result;
      currentInput = result;
      calculationDone = true;
    } catch {
      display.value = "Error";
    }
  }
  
  function insertMathConstant(constant) {
    const map = {
      "Math.PI": Math.PI,
      "Math.E": Math.E,
      "Math.LN2": Math.LN2,
      "Math.LN10": Math.LN10,
    };
    display.value = map[constant] || 0;
    currentInput = display.value;
    calculationDone = true;
  }
  
  function calculate() {
    try {
      if (currentOperator === "pow" && leftOperand !== null) {
        const rightOperand = parseFloat(display.value);
        history.textContent = `${leftOperand}^${rightOperand}`;
        display.value = Math.pow(leftOperand, rightOperand);
        leftOperand = null;
        currentOperator = null;
      } else {
        history.textContent = display.value;
        display.value = evaluateExpression(display.value);
      }
      calculationDone = true;
    } catch {
      display.value = "Error";
    }
  }

// ===== MAGIC 8 BALL =====

// Array of possible answers
const answers=[
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Naw",
    "Signs point to yes",
    "Reply hazy, try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
  ];

  const colors=[
    "red",
    "blue",
    "green",
    "orange"
  ]
  // Get DOM elements
  const ball = document.getElementById('ball');
  const answerElement = document.getElementById('answer');
  const questionInput = document.getElementById('question');
  const questionDisplay = document.getElementById('question-display');
  const questionHistory = document.getElementById('question-history');
  
  // Array to store question history - just strings
  let historyItems = [];

  // Function to get a random answer
  // TODO
  /* 1. create a randomIndex by using Math.floor and Math.random to get a random index between 0 and answers.length-1
     2. return the answer at the randomIndex from the answers array
  */
  function getRandomAnswer() {
    const randomIndex = Math.floor(Math.random()*answers.length);
    return answers[randomIndex];
  }
function getRandomColors (){
  const randomIndex=Math.floor(Math.random()*colors.length);
  return colors[randomIndex];
}
  // Function to shake the ball and show an answer
  function shakeBall() {
    const question = questionInput.value.trim();
    
    if (question === '') {
      alert('Please ask a question first!');
      return;
    }

    // Reset to 8
    answerElement.textContent = '8';
    
    // Add shaking animation
    ball.style.transform = 'translateX(-5px)';
    setTimeout(() => { ball.style.transform = 'translateX(5px)'; }, 100);
    setTimeout(() => { ball.style.transform = 'translateX(-5px)'; }, 200);
    setTimeout(() => { ball.style.transform = 'translateX(5px)'; }, 300);
    setTimeout(() => { ball.style.transform = 'translateX(0)'; }, 400);
    
    // Show the answer after shaking
    // TODO
    /* 1. use setTimeout to execute a function after 500ms delay
       2. inside the function, get a random answer by calling getRandomAnswer()
       3. set the answerElement's textContent to the random answer
       4. set the questionDisplay's textContent to show the question with quotes
       5. set the questionDisplay's opacity to 1 to make it visible
       6. call addToHistory function with the question as parameter
    */
   
      setTimeout(()=>{
        const answer=getRandomAnswer();
        answerElement.textContent=answer;

        questionDisplay.textContent=`Your question: "${question}`;
        addToHistory(question);

      }, 500)
    
    // Clear the question input
    questionInput.value = '';
    ball.style.backgroundColor=getRandomColors();
  }

  // Function to reset the ball and clear the question display
  function resetBall() {
    answerElement.textContent = '8';
    questionDisplay.textContent = '';
    questionDisplay.style.opacity = 0;
    questionInput.value = '';
    // Clear the question display
    questionDisplay.textContent = '';
    questionDisplay.style.opacity = 0;
    
    // Clear the input field (in case there's text but not submitted)
    questionInput.value = '';
  }
  
  // Function to add a question to history
  // TODO
  /* 1. add the question to the beginning of the historyItems array using unshift()
     2. call updateHistoryDisplay() to update the history display with the new question
  */
  function addToHistory(question) {
    historyItems.unshift(question)
    updateHistoryDisplay()
  }
  
  // Function to update the history display
  // you do not have to understand everything written here yet
  function updateHistoryDisplay() {
    // Clear current history
    questionHistory.innerHTML = '';
    
    // Add each history item
    historyItems.forEach((question, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'history-item';
      listItem.textContent = question;
      
      questionHistory.appendChild(listItem);
    });
  }
  
  // Function to clear all history
  // TODO
  /* 1. reset the historyItems array to an empty array
     2. call updateHistoryDisplay() to update the history display, which will clear it
  */
  function clearHistory() {
    historyItems=[];
    updateHistoryDisplay();
  }

// ===== COUNTDOWN TIMER =====

// Initialize variables in global scope
let timerDisplay;
let motivationDisplay;
let secondsInput;
let startBtn;
let resetBtn;
let statusDisplay;
let countdown;
let timeLeft;
let phraseIndex = 0;

// Motivational phrases array
// this is also a global scope
const motivationalPhrases = [
    "Every second counts!",
    "You're making progress!",
    "Keep going, you're doing great!",
    "Stay focused, stay strong!",
    "You've got this!",
    "One step at a time!",
    "Believe in yourself!",
    "Success is just ahead!",
    "Don't give up now!",
    "The best is yet to come!",
    "Each moment brings you closer to your goal!",
    "Small steps lead to big results!",
    "Your determination is inspiring!",
    "Progress happens one second at a time!",
    "Keep that momentum going!"
];

// Initialize on page load
window.onload = function() {
  window.onload = function() {

    // Task List setup
    updateTaskDisplay();

    // Contacts setup
    displayContacts();
    updateJSONDisplay();
};

    // Get DOM elements
    // TODO 
    timerDisplay=document.getElementById('timer');
    motivationDisplay=document.getElementById('motivation');
    secondsInput = document.getElementById('seconds');
    startBtn = document.getElementById('startBtn');
    resetBtn = document.getElementById('resetBtn');
    statusDisplay = document.getElementById('status');

};

// Format time to MM:SS

function formatTime(seconds) {
    const mins=Math.floor(seconds/60);
    const secs=seconds % 60;
    return `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`
}

// Update the timer display
function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
}

// Start the countdown - attached via onclick
function startCountdown() {
    // Get user input and validate
    const seconds = parseInt(secondsInput.value);

    // Validate the input
    if (isNaN(seconds) || seconds <= 0) {
        statusDisplay.textContent = "Please enter a valid number of seconds";
        return;
    }
    
    // Disable start button and input during countdown
    startBtn.disabled = true;
    secondsInput.disabled = true;
    statusDisplay.textContent = "Countdown in progress...";
    
    // Initialize the timer
    timeLeft = seconds;
    updateTimerDisplay();
    
    
    countdown = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if(timeLeft%5===0 || timeLeft===seconds-1){
        phraseIndex=(phraseIndex+1)%motivationalPhrases.length;
        motivationDisplay.textContent=motivationalPhrases[phraseIndex];
    }
    if(timeLeft<=0){
        clearInterval(countdown);
        timerDisplay.textContent="00:00";
        motivationDisplay.textContent="Time's up! Great job!"
        
        setTimeout(()=>{
            motivationDisplay.innerHTML = '<span style="font-size: 3rem;">😃</span>';
    }, 1000);

    startBtn.disabled = false;
    secondsInput.disabled = false;
    statusDisplay.textContent = "Countdown complete!";
        }
    },1000);
}

// Reset the timer - attached via onclick
// TODO
/* 1. clear the interval using clearInterval(countdown) to stop the timer
   2. reset timerDisplay.textContent to "00:00"
   3. set motivationDisplay.textContent to a default message about entering seconds
   4. enable the start button by setting startBtn.disabled to false
   5. enable the input field by setting secondsInput.disabled to false
   6. clear the status message by setting statusDisplay.textContent to an empty string
   7. set a default value like "30" for secondsInput.value
*/
function resetTimer() {
    clearInterval(countdown);
    timerDisplay. textContent = "00:00";
    motivationDisplay.textContent = "Enter seconds and start the timer for motivation!";
    startBtn.disabled = false;
    secondsInput.disabled = false;
    statusDisplay.textContent = "";
    secondsInput.value = "30";
}

// ===== NATO CONVERTER =====

// NATO Phonetic Alphabet Converter

// Using arrays 
const natoLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
                     "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
                     "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const natoWords = ["Alfa", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel",
                   "India", "Juliett", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa",
                   "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "X-ray",
                   "Yankee", "Zulu", "One", "Two", "Three", "Four", "Five", "Six", 
                   "Seven", "Eight", "Nine", "Zero"];
const randomWords = [
    "javascript",
    "programming",
    "computer",
    "fun",
    "keyboard",
    "variable",
    "database",
    "interface",
    "algorithm",
    "George",

];

/**
 * Converts a single character to its NATO phonetic equivalent
 * @param {string} ch - The character to convert
 * @return {string} The NATO phonetic word or the original character
 */
function chToNato(ch) {
       const upperCH = ch.toUpperCase();
       const index = natoLetters.indexOf(upperCH);
        if(index != -1) {
          return natoWords[index];
        }
        return ch;
}

/**
 * Converts a word to its NATO phonetic equivalent
 * @param {string} word - The word to convert
 * @return {string} Space-separated NATO phonetic words
 */
function wordToNato(word) {
   return word.split("").map(chToNato).join(" ");

}

/**
 * Converts a sentence to its NATO phonetic equivalent
 * @param {string} sentence - The sentence to convert
 * @return {string} Space-separated NATO phonetic representation
 */
function sentenceToNato(sentence) {
   return sentence.split(" ").map(wordToNato).join(" ")
    
    // TODO
    /* 1. split the sentence into an array of individual words using split(" ") method
       2. use the map() method to convert each word to its NATO equivalent by calling wordToNato function
       3. join the resulting array of NATO word sequences back into a string with spaces between them using join(" ")
       4. return the resulting string
    */
}

/**
 * Converts the input string to NATO phonetic alphabet
 */
function verbalize() {
   const inputString = document.getElementById("inputString").value;
   const natoResult = sentenceToNato(inputString);
   document.getElementById("natoResult").textContent = natoResult;
}

/**
 * Clears the NATO converter input and result fields
 */
function clearNATOInputs() {
    document.getElementById("inputString").value = "";
    document.getElementById("natoResult").textContent = "";
}
function generateRandomWord(){
    const randomIndex = Math.floor(Math.random() * randomWords.length);
    const randomWord = randomWords[randomIndex];
    document.getElementById("inputString").value = randomWord;
    verbalize();

}

// ===== CONTACTS APP =====

// Initial contacts data as JSON
let contactsData = {
    "contacts": [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "555-123-4567",
            "type": "personal"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "email": "jane@company.com",
            "phone": "555-987-6543",
            "type": "work"
        },
        {
            "id": 3,
            "name": "Bob Johnson",
            "email": "bob@family.net",
            "phone": "555-555-5555",
            "type": "family"
        }
    ]
};

// Function to display contacts
// TODO
/* 1. create a constant variable named 'contactsList' and assign it the DOM element with id 'contacts-list'
   2. clear the contactsList by setting its innerHTML to an empty string
   3. check if the contacts array is empty (length === 0)
   4. if contacts array is empty, set contactsList.innerHTML to '<p>No contacts found.</p>' and return from the function
   5. use the forEach method on the contacts array to iterate through each contact
   6. for each contact, create a new div element using document.createElement('div')
   7. set the className of the div to 'contact-card'
   8. set the innerHTML of the div to create the contact card structure with:
      - an h3 element containing the contact's name
      - p elements for email, phone, and type (with the type's first letter capitalized)
   9. append the contact card div to the contactsList using appendChild()
*/
function displayContacts(contacts = contactsData.contacts) {
    const contactsList = document. getElementById ("contacts-list");
    contactsList.innerHTML = "";
    if (contacts.length === 0 ) {
        contactsList.innerHTML = "<p>No contacts found.</p>";
        return;
    }
    contacts.forEach(contact => {
        let contactElement = document.createElement("div");
        contactElement.className = "contact-card";
        contactElement.innerHTML = `
        <h3>${contact.name}</h3>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>
        <p><strong>Type:</strong> ${contact.type.charAt(0).toUpperCase() +
        contact.type.slice(1)}</p>`
        ;
        contactsList.appendChild(contactElement);

    });
}

// Function to update JSON display
// TODO
/* 1. create a constant variable named 'jsonContent' and assign it the DOM element with id 'json-content'
   2. set the textContent of jsonContent to the JSON string representation of contactsData
   3. use JSON.stringify(contactsData, null, 4) to convert contactsData to a formatted JSON string
      - the null parameter means no replacer function
      - the 4 parameter adds 4 spaces of indentation for readability
*/
function updateJSONDisplay() {
    const jsonContent = document.getElementById("json-content");
    jsonContent.textContent = JSON.stringify(contactsData, null, 4);
}

// Function to search contacts
// TODO
/* 1. create a constant variable named 'searchTerm' and assign it the value of the input element with id 'search-input'
   2. convert the searchTerm to lowercase using toLowerCase() method
   3. check if searchTerm is empty (falsy)
   4. if searchTerm is empty, call displayContacts() with no arguments to show all contacts and return from the function
   5. create a constant variable named 'filteredContacts' that uses the filter() method on contactsData.contacts
   6. inside the filter function, return true if any of these conditions are met:
      - contact.name converted to lowercase includes the searchTerm
      - contact.email converted to lowercase includes the searchTerm
      - contact.phone includes the searchTerm (no need to convert to lowercase since it's numeric)
      - contact.type converted to lowercase includes the searchTerm
   7. call displayContacts() with the filteredContacts array as the argument
*/
function searchContacts() {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    if (!searchTerm) {
        displayContacts();
        return;
    }
    const filteredContacts = contactsData.contacts.filter(
    function(contact) {
        return contact.name.toLowerCase().includes(searchTerm) ||
        contact.email.toLowerCase().includes (searchTerm) ||
        contact.phone.includes(searchTerm) ||
        contact.type.toLowerCase().includes(searchTerm);

    }
);
    displayContacts (filteredContacts);

}

// Function to add a new contact
function addContact() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const type = document.getElementById('type').value;
    
    // Generate a new ID using standard conditional statement
    let newId;
    if (contactsData.contacts.length > 0) {
        // Find the maximum ID in the existing contacts and add 1
        const maxId = Math.max(...contactsData.contacts.map(function(c) { 
            return c.id; 
        }));
        newId = maxId + 1;
    } else {
        // If no contacts exist, start with ID 1
        newId = 1;
    }
    
    // Create new contact object
    const newContact = {
        id: newId,
        name,
        email,
        phone,
        type
    };
    
    // Add to contacts array
    contactsData.contacts.push(newContact);
    
    // Reset form
    document.getElementById('contact-form').reset();
    
    // Update displays
    displayContacts();
    updateJSONDisplay();
    
    // Show success message
    alert('Contact added successfully!');
    
    // Switch to view tab
    switchTab('view');
    
    // Prevent form submission
    return false;
}

// Function to reset search
// Write the body of this function as an exercise.
// This should clear the input field and call displayContacts() funciton.
function resetSearch() {
     const searchInput = document.getElementById("search-input");
    searchInput.value = "";
    displayContacts();
}

// Function to switch tabs
function switchTab(tabId) {
    // Update tab buttons
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        if (tab.textContent.toLowerCase().includes(tabId)) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Update tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        if (content.id === `${tabId}-contacts` || content.id === `${tabId}-contact` || content.id === `${tabId}-view`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    
    // Update JSON display when switching to JSON tab
    if (tabId === 'json') {
        updateJSONDisplay();
    }
}
