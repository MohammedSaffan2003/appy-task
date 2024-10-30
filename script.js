// Load reminders from local storage
window.onload = function () {
  displayReminders();
  checkReminders();
};

// Add a new reminder
function addReminder() {
  const taskName = document.getElementById("taskName").value;
  const reminderTime = new Date(
    document.getElementById("reminderTime").value
  ).getTime();

  if (!taskName || !reminderTime) {
    alert("Please fill in both fields.");
    return;
  }

  const reminder = { taskName, reminderTime };
  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
  reminders.push(reminder);
  localStorage.setItem("reminders", JSON.stringify(reminders));

  displayReminders();
  document.getElementById("taskName").value = "";
  document.getElementById("reminderTime").value = "";
}

// Display reminders
function displayReminders() {
  const reminderList = document.getElementById("reminderList");
  reminderList.innerHTML = "";
  const reminders = JSON.parse(localStorage.getItem("reminders")) || [];

  reminders.forEach((reminder, index) => {
    const reminderDiv = document.createElement("div");
    reminderDiv.classList.add("reminder");
    reminderDiv.innerHTML = `
            <span>${reminder.taskName}</span>
            <button onclick="deleteReminder(${index})">Delete</button>
        `;
    reminderList.appendChild(reminderDiv);
  });
}

// Delete a reminder
function deleteReminder(index) {
  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
  reminders.splice(index, 1);
  localStorage.setItem("reminders", JSON.stringify(reminders));
  displayReminders();
}

// Check reminders and notify
function checkReminders() {
  setInterval(() => {
    const now = new Date().getTime();
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

    reminders.forEach((reminder, index) => {
      if (now >= reminder.reminderTime) {
        alert(`Reminder: ${reminder.taskName}`);
        deleteReminder(index);
      }
    });
  }, 60000); // Check every minute
}
