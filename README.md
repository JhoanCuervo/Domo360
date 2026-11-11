# 🏠 Domo360

**Plataforma de gestión de arrendamientos que conecta arrendadores y arrendatarios en un solo lugar.**

Domo360 es una aplicación diseñada para facilitar la administración de inmuebles en arrendamiento, centralizando la gestión de contratos, pagos, servicios públicos, certificados y documentación relacionada con la relación entre arrendadores y arrendatarios.

La plataforma busca simplificar los procesos administrativos, mejorar la comunicación entre ambas partes y brindar mayor transparencia durante todo el periodo de arrendamiento.

## 🎯 Objetivo del proyecto

Desarrollar una plataforma web que permita gestionar de manera organizada el ciclo de arrendamiento de un inmueble, desde la asignación y formalización del contrato hasta la finalización de la relación contractual.

## 👥 Tipos de usuario

### 🏢 Arrendador

El arrendador podrá administrar sus inmuebles y gestionar la información relacionada con sus arrendatarios.

**Funcionalidades:**

- **Gestión de contratos:** Crear y administrar contratos de arrendamiento.
- **Generación de paz y salvo:** Generar certificados al finalizar un contrato, siempre que las obligaciones económicas estén al día.
- **Consulta de servicios públicos:** Visualizar los comprobantes de pago de servicios públicos cargados por los arrendatarios.
- **Gestión de inmuebles:** Consultar los apartamentos asignados y sus respectivos arrendatarios.
- **Certificado de último arrendador:** Habilitar la generación de certificados de último arrendador para los arrendatarios.
- **Validación de obligaciones:** Verificar que los pagos y obligaciones estén al día antes de generar un paz y salvo.

### 🏠 Arrendatario

El arrendatario podrá consultar su información contractual y mantener actualizados los comprobantes de sus obligaciones.

**Funcionalidades:**

- **Pago de canon:** Cargar los comprobantes de pago del canon de arrendamiento.
- **Pago de servicios públicos:** Subir los comprobantes de pago de agua, energía, gas y otros servicios.
- **Certificado de último arrendador:** Solicitar y generar su certificado cuando esté habilitado.
- **Comentarios y referencias:** Registrar comentarios positivos sobre su experiencia durante el arrendamiento.

## ⚙️ Módulos principales

| Módulo             | Descripción                                                  |
| ------------------ | ------------------------------------------------------------ |
| Contratos          | Administración de contratos de arrendamiento.                |
| Inmuebles          | Gestión y asignación de apartamentos.                        |
| Pagos              | Registro y consulta de pagos de canon.                       |
| Servicios públicos | Carga y consulta de comprobantes.                            |
| Paz y salvo        | Generación de certificados según validación de obligaciones. |
| Certificaciones    | Gestión de certificados de último arrendador.                |
| Referencias        | Registro de comentarios y referencias de arrendatarios.      |

## 🛠️ Tecnologías utilizadas

### Frontend

- **React:** Construcción de interfaces y componentes reutilizables.
- **TypeScript:** Tipado estático para mejorar la calidad y mantenibilidad del código.

### Backend

- **Google Apps Script:** Desarrollo de la lógica de negocio, procesamiento de solicitudes e integración con los servicios de Google.
- **Webpack:** Empaquetado y organización de los módulos del backend.

### Almacenamiento y persistencia

- **Google Sheets:** Almacenamiento y gestión de los datos de la aplicación.
- **Google Drive:** Almacenamiento de imágenes y archivos asociados a los arrendamientos.

### Servicios de Google

- **Google Workspace:** Integración con el ecosistema de servicios de Google para la gestión de información y archivos.

## 🏗️ Arquitectura del proyecto

Domo360 está organizado en tres componentes principales:

- **Frontend:** Aplicación desarrollada con React y TypeScript, encargada de la interfaz y la interacción con los usuarios.
- **Backend:** Desarrollado con Google Apps Script y Webpack, encargado de ejecutar la lógica de negocio y gestionar las solicitudes.
- **Almacenamiento:** Google Sheets funciona como fuente de persistencia de datos, mientras que Google Drive almacena imágenes y archivos.

## 🚧 Estado del proyecto

**En desarrollo.**

Domo360 se encuentra en etapa de desarrollo. Sus funcionalidades se implementarán y mejorarán progresivamente.
