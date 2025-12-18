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

class Notification {
  constructor(id, title, content, icon, type) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.icon = icon;
    this.type = type;
  }
  createNotification() {
    const messageWindow = document.createElement('div');
    messageWindow.innerHTML = `
    ${this.icon}
    <div>
    <p class='messageTitle'>${this.title}</p>
    <p class='messageContent'>${this.content}</p>
    </div>
    `;
    messageWindow.classList.add('messageWindow');
    messageWindow.style.backgroundColor =
      this.type === 'waitingConformation' ? 'rgb(105, 194, 83)' : 'rgb(216, 177, 73)';
    notifications.append(messageWindow);
  }
  closeMessageBox(messageWindow) {
    messageWindow.classList.add('hideMessage');
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
      Math.floor(Math.random() * 1000000000),
      'Заказ оплачен',
      'Ожидайте отправку',
      '<i class="fa-solid fa-check"></i>',
      'waitingSending',
    );
    notification.createNotification();
  });
  buttonOrderSent.addEventListener('click', () => {
    const notification = new Notification(
      Math.floor(Math.random() * 1000000000),
      'Заказ отправлен',
      'Ожидайте курьера',
      '<i class="fa-solid fa-check"></i>',
      'waitingDelivery',
    );
    notification.createNotification();
  });
  buttonOrderReceived.addEventListener('click', () => {
    const notification = new Notification(
      Math.floor(Math.random() * 1000000000),
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
    Math.floor(Math.random() * 1000000000),
    'Заказ создан',
    'Ожидайте дальнейшей информации',
    '<i class="fa-solid fa-check"></i>',
    'waitingConformation',
  );
  notification.createNotification();
  createButtons();
});
