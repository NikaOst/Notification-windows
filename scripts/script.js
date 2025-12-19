/* 1.Реализовать всплывающие уведомления: уведомление должно вызываться с 
помощью функции “конструктора” уведомления, которая принимает название, 
текст и тип уведомления (успех, предупреждение, ошибка).

2.Сверстать форму, после отправки которой появляется уведомление о 
том, что заказ успешно создан, а также появляются 3 кнопки: “Заказ оплачен”, 
“Заказ отправлен”, “Заказ получен”, при нажатии на которые появляется 
уведомление с соответствующим сообщением. */

/* {
    id: "",
    title: "",
    content: "",
    icon: "",
    type: "",
  } */

const form = document.querySelector('form');
const mainWindow = document.querySelector('.mainWindow');
const notifications = document.querySelector('.notifications');
let notificationArray = JSON.parse(localStorage.getItem('notificationArray')) || [];

function renderNotification(id, icon, title, content, type) {
  const messageWindow = document.createElement('div');
  messageWindow.innerHTML = `
    <i id="${id}" class="fa-solid fa-xmark close-btn"></i>
    <div>
    ${icon}
    <div>
    <p class='messageTitle'>${title}</p>
    <p class='messageContent'>${content}</p>
    </div></div>
    `;
  messageWindow.classList.add('messageWindow');
  messageWindow.style.backgroundColor =
    type === 'waitingConformation' ? 'rgb(105, 194, 83)' : 'rgb(216, 177, 73)';
  notifications.append(messageWindow);

  const closeBtn = messageWindow.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    Notification.closeMessageBox(id);
  });
}

class Notification {
  constructor(title, content, icon, type) {
    this.id = Math.floor(Math.random() * 1000000000);
    this.title = title;
    this.content = content;
    this.icon = icon;
    this.type = type;
  }
  createNotification() {
    notificationArray.push({
      id: this.id,
      title: this.title,
      content: this.content,
      icon: this.icon,
      type: this.type,
    });
    localStorage.setItem('notificationArray', JSON.stringify(notificationArray));
    renderNotification(this.id, this.icon, this.title, this.content, this.type);
  }
  static closeMessageBox(messageWindowId) {
    const closeBtn = document.querySelector(`[id="${messageWindowId}"]`);
    if (closeBtn) {
      const messageWindow = closeBtn.closest('.messageWindow');
      messageWindow.classList.add('hideMessage');
    }
    notificationArray = notificationArray.filter((message) => {
      return Number(message.id) !== Number(messageWindowId);
    });
    localStorage.setItem('notificationArray', JSON.stringify(notificationArray));
  }
}

function createButtons() {
  const buttonOrderPaid = document.createElement('button');
  const buttonOrderSent = document.createElement('button');
  const buttonOrderReceived = document.createElement('button');
  const buttonContainer = document.createElement('div');

  buttonOrderPaid.textContent = 'Заказ оплачен';
  buttonOrderSent.textContent = 'Заказ отправлен';
  buttonOrderReceived.textContent = 'Заказ получен';

  buttonContainer.classList.add('buttonContainer');

  buttonContainer.append(buttonOrderPaid, buttonOrderSent, buttonOrderReceived);
  mainWindow.append(buttonContainer);

  buttonOrderPaid.addEventListener('click', () => {
    const notification = new Notification(
      'Заказ оплачен',
      'Ожидайте отправку',
      '<i class="fa-solid fa-check"></i>',
      'waitingSending',
    );
    notification.createNotification();
  });
  buttonOrderSent.addEventListener('click', () => {
    const notification = new Notification(
      'Заказ отправлен',
      'Ожидайте курьера',
      '<i class="fa-solid fa-check"></i>',
      'waitingDelivery',
    );
    notification.createNotification();
  });
  buttonOrderReceived.addEventListener('click', () => {
    const notification = new Notification(
      'Заказ получен',
      'Ждем вас снова!',
      '<i class="fa-solid fa-check"></i>',
      'orderCompleted',
    );
    notification.createNotification();
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const notification = new Notification(
    'Заказ создан',
    'Ожидайте дальнейшей информации',
    '<i class="fa-solid fa-check"></i>',
    'waitingConformation',
  );
  notification.createNotification();
  const allButtons = document.querySelector('button');
  if (!allButtons) createButtons();
});

window.addEventListener('load', () => {
  notificationArray.forEach((message) => {
    renderNotification(message.id, message.icon, message.title, message.content, message.type);
  });
});
