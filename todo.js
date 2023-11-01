
// Immediately Invoked Function Expression
(function () {

    let tasks = [];
    const taskList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const taskCounter = document.getElementById('tasks-counter');


    //Fetch todos from API
    async function fetchTodos(){
        // GET request
        // fetch returns a promise
        // fetch('https://jsonplaceholder.typicode.com/todos')
        //   .then(function(response)
        //   {
        //     console.log(response);
        //     return response.json(); // again returs a promise
        //   })
        //   .then(function(data){
        //     tasks = data.slice(0, 10);
        //     renderList();
        //   })
        //   .catch(function(error){
        //     console.log('error',error);
        //   })


        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            tasks = data.slice(0, 10);
            renderList();
        }catch(error){
            console.log('error');
        }

    } 

    function  addTasktoDOM(task){
        const li = document.createElement('li');
        li.innerHTML += `
        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked': ' ' } class="custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <img src="bin.jpg" class="delete" data-id="${task.id}"/>
    `;
    taskList.append(li);
    }

    function renderList(){
        taskList.innerHTML = ''

        for(let i=0 ;i< tasks.length;i++){
            addTasktoDOM(tasks[i]);
        }
        taskCounter.innerHTML = tasks.length;
    }


    function toggleTask(taskId){

        for(let t of tasks){
            if(t.id === Number(taskId)){
                t.completed = !t.completed;
                renderList();
                showNotification('Task toggled successfully');
                break;
            }
        }

        console.log(tasks);

    }


    function deleteTask(taskId){
        const newTasks = tasks.filter( (task) => {
            return task.id !== Number(taskId);
        } );
        tasks = newTasks;
        console.log(tasks);
        renderList();
        showNotification('Task deleted successfully');
    }

    function addTask(task){

        if(task){
            tasks.push(task);
            console.log(tasks);
            renderList();
            showNotification('Task added successfully');
            return;
        }
        showNotification('Task cannot be added ');


        //POST method
        // if(task){
        //     fetch('https://jsonplaceholder.typicode.com/todos' , {
        //         method: 'POST',
        //         headers: {
        //             "Content-Type": "application/json",
        //           },
        //           body: JSON.stringify(data),
        //     })
        //     .then(function(response){
        //         console.log(response);
        //         return response.json(); // again returs a promise
        //     })
        //     .then(function(data){
        //         console.log(data);
        //         tasks.push(task);
        //         renderList();
        //         showNotification('Task added successfully');
        //     })
        //     .catch(function(error){
        //         console.log('error',error);
        //     })
        // }    
    }

    function showNotification(text){
        alert(text);
    }

    function handleInputKeypress(e){

        
        if(e.key === 'Enter'){
            const text = e.target.value; // Get the input value  
            console.log(text);
        

        if(!text){
            showNotification('Task text cannot be empty');
            return;
        }
        //Create task object with text, id, done as properties
        const task  = {
        title: text,
        id : Date.now(), // Timestamp
        completed:false, // Initially false as it is not added in the list yet
        }

        e.target.value = '';  // Now empty the input box cause you have created an object and added the value
        addTask(task); // Now add task to list
    }
    }

    function handleClickListener(e){
        
        const target = e.target;
        if(target.className === 'delete'){
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;
        }
        else if(target.className === 'custom-checkbox'){
            const taskId = target.id;
            toggleTask(taskId);
            return;
        }
    }


    function initializeApp(){
        fetchTodos();
        addTaskInput.addEventListener('keyup',handleInputKeypress);
        //Event Delegation
        document.addEventListener('click', handleClickListener);

    }

    initializeApp();

})()



