# Внимание разработчик 

- [Изменения стиля компонента ant](./docs/customStyle.md).
- [Использование шаблонов кода](./docs/generators/usage.md).
****

- [Общее о задачах](./docs/workCommon.md).
- [Порядок работы с тасками](./docs/workWithTask.md).
****

#### How to start

```bash
# install dependencies
yarn

# start dev server
yarn start:client

# run storybook to view and develop components
yarn storybook
```

#### Folder structure
- `components` - react components that *do not contain their own logic*, but accept it through props. Developed in the *storybook*.
- `containers` - react components that have their own business logic, for example, hooks. Includes components.
- `pages` - separate containers for pages. Includes containers.
- `store` - a global storage of data and business logic of the project
- `utils` - general project functions
- `hooks` - react hooks that can be reused

#### Configuring project

See `/.env` file for configuration:

```dotenv
# Backend api URL
REACT_APP_API_URL=https://your.api.url/
```
