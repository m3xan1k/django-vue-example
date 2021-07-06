var app = new Vue({
  el: '#app',
  data: {
    tasks: []
  },
  methods: {
    getCsrf() {
      const cookieArr = document.cookie.split(' ');
      let cookieObjects = {}
      cookieArr.forEach(elem => {
        [key, value] = elem.split('=');
        cookieObjects[key] = value.replace(';', '').trim();
      })
      console.log(cookieObjects.csrftoken);
      return cookieObjects.csrftoken;
    },
    async getTaskList() {
      try {
        const url = 'http://localhost:8000/tasks/list/';
        const response = await fetch(url);
        const data = await response.json();
        this.tasks = data;
      } catch (err) {
        console.log(err);
      }
    },
    async completeTask(task) {
      const csrftoken = app.getCsrf();
      try {
        const url = `http://localhost:8000/tasks/task/${task.id}`;
        const response = await fetch(url, {
          method: 'PUT',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-type': 'application/json',
            'X-CSRFTOKEN': csrftoken
          }
        });
        if (response.ok) {
          task.completed = task.completed ? false : true;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async deleteTask(task) {
      const csrftoken = app.getCsrf();
      try {
        const url = `http://localhost:8000/tasks/task/${task.id}`;
        const response = await fetch(url, {
          method: 'DELETE',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-type': 'application/json',
            'X-CSRFTOKEN': csrftoken
          }
        });
        if (response.ok) {
          this.tasks.splice(this.tasks.indexOf(task), 1);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async createTask (event) {
      event.preventDefault();
      const csrftoken = app.getCsrf();
      const taskInput = event.target.querySelector('#task-input');
      try {
        const url = 'http://localhost:8000/tasks/task/';
        const payload = {text: taskInput.value};
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-type': 'application/json',
            'X-CSRFTOKEN': csrftoken
          },
          body: JSON.stringify(payload)
        })
        if (response.ok) {
          const newTask = await response.json();
          this.tasks.push(newTask);
        }
      } catch(err) {
        console.log(err);
      }
    }
  }
})