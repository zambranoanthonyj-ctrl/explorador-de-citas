# Aforismo — Explorador Moderno de Citas y Reflexiones

Una aplicación web de diseño luminoso y contemporáneo que presenta citas seleccionadas de filosofía, motivación, liderazgo y productividad, permitiendo cambiar de cita al instante, copiar al portapapeles y gestionar una colección personal de favoritos.

### User Review & Critical Decisions

> [!IMPORTANT]
> A continuación se resumen las decisiones confirmadas para el diseño y alcance funcional de la aplicación antes de proceder con su construcción.

- **Categorías Temáticas Confirmadas**: Colección curada enfocada en **Filosofía, motivación y reflexiones de vida** junto con **Liderazgo, negocios y productividad**.
- **Dirección Visual Confirmada**: Estilo **Moderno luminoso con tarjetas limpias y acentos suaves**, priorizando amplitud visual, contraste nítido y jerarquía tipográfica editorial.
- **Funciones Interactivas Confirmadas**: Botón principal de **Siguiente cita** acompañado de acciones directas para **Copiar cita al portapapeles** (con confirmación visual instantánea) y **Guardar en favoritos** (con acceso a la colección guardada).

---

### 1. Overview & Core Concept

- **Qué Hace**: Muestra una cita inspiradora aleatoria en un lienzo despejado y luminoso, permitiendo al usuario descubrir nuevas ideas sin repeticiones inmediatas, filtrar por área temática, copiar el texto formateado con un clic y conservar sus frases preferidas en una biblioteca local.
- **Audiencia Objetivo**: Profesionales, líderes de equipo, estudiantes y lectores que buscan una pausa reflexiva, inspiración diaria o referencias rápidas para presentaciones y escritos.
- **Valor Principal**: Combina la simplicidad inmediata de un generador de citas aleatorio con una experiencia de lectura cuidada y herramientas prácticas de curaduría personal sin distracciones.

---

### 2. User Experience & Visual Design

- **Flujos Principales del Usuario**:
  1. **Descubrimiento Instantáneo**: Al abrir la página, el usuario visualiza una cita destacada en el escenario principal, acompañada de su autor, contexto de la obra o cargo, y categoría en texto limpio separado por puntos medios (`·`).
  2. **Cambio de Cita Fluido**: Al pulsar el botón principal `"Siguiente cita"` (o presionar la barra espaciadora), la tarjeta realiza una transición suave ($\le 200\text{ms}$) hacia una nueva cita aleatoria garantizando que no se repita la cita actual.
  3. **Filtrado por Temática**: Un selector segmentado limpio permite alternar entre `"Todas"`, `"Filosofía y Vida"` y `"Liderazgo y Productividad"`.
  4. **Copiado y Favoritos**: El botón `"Copiar cita"` copia `"«Cita» — Autor"` al portapapeles mostrando un estado de confirmación temporal (`"Copiada"`). El botón `"Guardar"` añade o retira la cita de la lista de favoritos y actualiza la sección inferior de colección personal.

- **Identidad Visual y Tema**:
  - *Dirección Estética*: Moderno luminoso de inspiración editorial, con superficies limpias, bordes sutiles de `1px` y presencia de escritorio completa ($1440\text{px}$ con contenedor principal equilibrado de $1080\text{px}$).
  - *Paleta de Color (Regla 60-30-10)*:
    - **60% Lienzo Neutro Dominante**: Blanco cálido luminoso (`#F8FAFC` / `slate-50`) que aporta serenidad visual.
    - **30% Superficies Estructurales**: Tarjeta principal en blanco puro (`#FFFFFF`), bordes sutiles (`#E2E8F0` / `slate-200`) y tipografía secundaria en gris pizarra (`#475569` / `slate-600`).
    - **10% Presupuesto de Acento**: Azul cobalto sereno (`#2563EB` / `blue-600`) reservado exclusivamente para el botón de acción principal (`"Siguiente cita"`), indicadores de estado activo y foco de teclado.
  - *Tipografía y Jerarquía (Regla 2+1)*:
    - **Display / Citas**: `Fraunces` o `Playfair Display` para el cuerpo de la cita (`clamp(1.75rem, 3vw, 2.5rem)`, `text-wrap: balance`), aportando calidez humana y carácter literario.
    - **UI y Cuerpo**: `Plus Jakarta Sans` para controles, navegación, nombres de autores y descripciones.
    - **Datos / Índices**: `JetBrains Mono` con números tabulares (`tabular-nums`) para el contador de citas exploradas y numeración de favoritos.
  - *Composición Espacial y Disciplina Anti-Slop*:
    - **Contrato de Barra Superior (3 Zonas)**: Marca en una línea (`Aforismo`), enlaces de navegación concisos (`Explorar`, `Filosofía`, `Liderazgo`, `Favoritos`) y una acción primaria (`Cita aleatoria`).
    - **Cero Cápsulas Estáticas (Zero-Pill Discipline)**: Los metadatos de autor, año/contexto y categoría se presentan como texto limpio con separadores tipográficos (`Séneca · Cartas a Lucilio · Filosofía y Vida`), sin etiquetas redondeadas decorativas ni barras laterales gruesas.

- **Retroalimentación Interactiva y Movimiento**:
  - Transiciones de opacidad y desplazamiento ligero (`transform`, `opacity`) en $\le 200\text{ms}$ al cambiar de cita.
  - Atajo de teclado (`Espacio` para siguiente cita, `C` para copiar, `F` para favorito) para una experiencia ágil en escritorio.

---

### 3. Key Product Decisions & Trade-Offs

- **Decisión 1: Algoritmo de Selección Aleatoria sin Repetición Inmediata (Shuffle Bag)**
  - *Enfoque Elegido*: Mantener un historial de sesión de las citas vistas recientemente para evitar que el botón `"Siguiente cita"` muestre la misma frase dos veces seguidas o repita citas antes de recorrer el conjunto activo.
  - *Por Qué*: El azar puro en colecciones medianas suele producir repeticiones tempranas que degradan la sensación de variedad.
  - *Alternativas Consideradas*: Selección `Math.random()` simple (descartada por colisiones frecuentes).

- **Decisión 2: Persistencia Local de Favoritos (`localStorage`)**
  - *Enfoque Elegido*: Almacenar las citas marcadas como favoritas directamente en el navegador del usuario mediante `localStorage`.
  - *Por Qué*: Permite conservar la colección personal entre sesiones de forma instantánea y privada, sin obligar al usuario a crear una cuenta o iniciar sesión.
  - *Alternativas Consideradas*: Base de datos remota con autenticación (excesivo para una herramienta de consulta rápida e inspiración personal).

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Diagrama de Arquitectura y Componentes**:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        Estado Principal (React)                         │
│  • currentQuoteId       • activeCategory ('all' | 'philosophy' | 'lead')│
│  • favoriteIds (Set)    • seenHistory (Queue)     • copyFeedback (bool) │
└───────────────────┬─────────────────────────────────┬───────────────────┘
                    │                                 │
                    ▼                                 ▼
┌───────────────────────────────────────┐ ┌───────────────────────────────┐
│     Escenario Principal de Cita       │ │   Persistencia LocalStorage   │
│  ┌─────────────────────────────────┐  │ │  • Sincronización de favoritos│
│  │ Selector de Categoría (Tabs)    │  │ │  • Preferencia de categoría   │
│  ├─────────────────────────────────┤  │ └───────────────┬───────────────┘
│  │ Tarjeta de Cita Activa          │  │                 │
│  │  • Texto en Serif (Balanceado)  │  │                 ▼
│  │  • Autor · Obra · Categoría     │  │ ┌───────────────────────────────┐
│  ├─────────────────────────────────┤  │ │   Colección de Favoritos      │
│  │ Barra de Acciones               │  │ │  • Cuadrícula de guardados    │
│  │  • [Siguiente cita] (Primario)  │  │ │  • Copiar / Eliminar favorito │
│  │  • [Copiar cita] [Guardar]      │  │ │  • Estado vacío guiado        │
│  └─────────────────────────────────┘  │ └───────────────────────────────┘
└───────────────────────────────────────┘
```

- **Modelo de Datos y Estado**:
  - **Entidad `Quote`**: Identificador único (`id`), texto de la cita en español (`text`), autor (`author`), contexto u obra (`source`), categoría (`'philosophy' | 'leadership'`) y longitud estimada de lectura.
  - **Catálogo Curado**: Base de datos integrada con más de 40 citas auténticas y verificadas en español de pensadores clásicos y referentes modernos de liderazgo y productividad (Marco Aurelio, Séneca, Epicteto, Aristóteles, Peter Drucker, Naval Ravikant, James Clear, Viktor Frankl, entre otros).

- **Mapeo de Componentes Interactivos y Manejadores de Estado**:
  - **Botón `Siguiente cita`**: Filtra el catálogo según `activeCategory`, excluye los IDs en `seenHistory` (reiniciando la cola si se completó el ciclo), selecciona una nueva cita aleatoria, incrementa el contador de sesión y restablece `copyFeedback`.
  - **Selector de Categoría**: Actualiza `activeCategory` y, si la cita actual no pertenece a la categoría seleccionada, selecciona automáticamente una cita válida de ese grupo.
  - **Botón `Copiar cita`**: Invoca `navigator.clipboard.writeText()` con formato limpio, activa el estado visual `"Copiada"` durante 2 segundos y ofrece respaldo seguro en caso de permisos restringidos.
  - **Botón `Guardar` y Galería de Favoritos**: Alterna la presencia del `id` en `favoriteIds`, sincroniza con `localStorage` y permite visualizar, copiar o quitar cualquier cita guardada desde la sección inferior o saltar directamente a ella.
