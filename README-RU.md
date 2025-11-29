<div align="right">
  <a href="README.md"><img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/us.svg" width="32" alt="Английский язык" title="Английский язык"/></a>
  <code><a href="#"><img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/ru.svg" width="32" alt="Русский язык" title="Русский язык"/></a></code>
</div>

# Проект "Чат (Slack)":

[![Actions Status](https://github.com/sobolevaea/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/sobolevaea/frontend-project-12/actions)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=sobolevaea_frontend-project-12&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=sobolevaea_frontend-project-12)

Упрощенная версия Slack-чата, демонстрирующая работу с веб-сокетами, REST API, React, Redux, роутингом, авторизацией и современными инструментами сборки.

## Демонстрация

**Live версия**: https://frontend-project-12-rojw.onrender.com

Этот проект демонстрирует спектр стандартных задач фронтенд-разработки, включая:
- Интеграцию WebSocket для обмена сообщениями в реальном времени
- Взаимодействие с REST API
- Разработка с помощью функциональных компонентов и хуков
- Использование Redux Toolkit для управления состоянием приложения
- Эффективную навигацию и маршрутизацию c React Router
- Использование Vite для сборки и продакшн-развертывания

## Технологический стек

### Основные технологии

- **React** с хуками и функциональными компонентами
- **Redux Toolkit** - библиотека для управления состоянием в React-приложениях
- **React Router** - клиентская маршрутизация для одностраничных приложений
- **Vite** - сборщик фронтенда

### Дополнительные библиотеки

- **Socket.IO Client** - двусторонняя связь клиент-сервер для обновления данных в реальном времени
- **Axios** - HTTP клиент для выполнения API-запросов
- **Formik + Yup** - библиотека для работы с формами и валидации
- **React Bootstrap** - библиотека UI-компонентов для интерфейсов на основе Bootstrap
- **react-i18next** - фреймворк для интернационализации мультиязычных приложений
- **leo-profanity** - библиотека для фильтрации нецензурных слов
- **react-toastify** - библиотека для отображения всплывающих уведомлений
- **Rollbar** - сервис для отслеживания и мониторинга ошибок в продакшн-приложениях

## Начало работы

Для локальной настройки проекта необходимо выполнить следующие шаги:

1. Склонировать репозиторий
```bash
git clone git@github.com:sobolevaea/frontend-project-12.git
cd frontend-project-12
```

2. Установить зависимости
```bash
make install
```

3. Запустить сервер и клиент
```bash
make start
make run-frontend
```

Приложение будет доступно по адресу: http://localhost:5002/
