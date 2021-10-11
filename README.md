# 🔬 Laboratorio de prácticas Angular Testing

## 🚀 Web de consulta de lanzamientos de cohetes

> Sujeto bajo pruebas para el ejercicio práctico del [Curso Angular Testing](https://trainingit.es/curso-angular-testing/).

---

## 🎯 Objetivos

- Poner en práctica los conceptos explicados
- Replicar las demostraciones vistas
- Usar como _sandbox_ para investigar y ejercitar

## 📋 Tareas propuestas

### 1 - Servicio de consulta de próximos lanzamientos

- [SUT: src\app\core\space.service.ts](https://github.com/Angular-Testing/lab-angular-booster/blob/c22808854cf80c4e1f16ea3651d1f6e7699ff57d/src/app/core/space.service.ts#L1)

- Comprobar que el método `getUpcomingLaunches$` invoca la _url_ adecuada.

### 2 - Componente para visualizar un lanzamiento

- [SUT: src\app\shared\launch-card\launch-card.component.ts](https://github.com/Angular-Testing/lab-angular-booster/blob/c22808854cf80c4e1f16ea3651d1f6e7699ff57d/src/app/shared/launch-card/launch-card.component.ts#L29)

- Comprobar mediante un _HostComponent_ que las propiedades `@Input` y los eventos `@Output` están correctamente enlazados con la plantilla.

### 3 - Página de consulta por texto y límite

- [SUT: src\app\search\search.component.ts](https://github.com/Angular-Testing/lab-angular-booster/blob/c22808854cf80c4e1f16ea3651d1f6e7699ff57d/src/app/search/search.component.ts)

- Comprobar que al rellenar el formulario y pulsar el botón _submit_ se llama a `getSearchedLaunches$` una vez con los argumentos adecuados.

### 4 - Agregar un lanzamiento a la lista de favoritos

- [SUT: la aplicación en ejecución](http://localhost:4200/)

- Usando _Cypress_ probar que permite agregar a favoritos.
