// Массив пользователей
const users = [
      { login: "admin",
        password: "12345",
        name: "Администратор"
      },
      { login: "amir",
        password: "pass2024",
        name: "Амир"
      },
      { login: "diana",
        password: "qwerty",
        name: "Диана"
      },
      { login: "maks",
        password: "hello",
        name: "Макс"
      },
      { login: "aika",
        password: "lovejs",
        name: "Айка"
      },
      { login: "alex",
        password: "1234",
        name: "Алексей"
      },
      { login: "sara",
        password: "letmein",
        name: "Сара"
    }
    ];

    function login() {
      const loginInput = document.getElementById("login").value.trim();
      const passwordInput = document.getElementById("password").value.trim();
      const message = document.getElementById("message");

// Поиск пользователя через find()
      const user = users.find(u => u.login === loginInput && u.password === passwordInput);

      if (user) {
        message.style.color = "green";
        message.textContent = `Добро пожаловать, ${user.name}!`;
      } else {
        message.style.color = "red";
        message.textContent = "Неверный логин или пароль.";
      }
    }