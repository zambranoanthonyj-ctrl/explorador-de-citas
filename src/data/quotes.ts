export type QuoteCategory = 'philosophy' | 'leadership';

export interface Quote {
  id: string;
  text: string;
  author: string;
  roleOrWork: string;
  category: QuoteCategory;
  categoryLabel: string;
  yearOrEra: string;
  reflectionNote: string;
}

export const QUOTES: Quote[] = [
  // Filosofía, motivación y reflexiones de vida
  {
    id: 'phil-01',
    text: 'La felicidad de tu vida depende de la calidad de tus pensamientos; por lo tanto, actúa en consecuencia y cuida de no albergar nociones inadecuadas a la virtud y a la naturaleza razonable.',
    author: 'Marco Aurelio',
    roleOrWork: 'Meditaciones, Libro IV',
    category: 'philosophy',
    categoryLabel: 'Filosofía y Vida',
    yearOrEra: 'Siglo II d.C.',
    reflectionNote: 'La serenidad interior comienza con la disciplina de la atención cotidiana.'
  },
  {
    id: 'phil-02',
    text: 'No es que tengamos poco tiempo, sino que perdemos mucho. La vida es suficientemente larga y se nos ha dado con generosidad para realizar las cosas más importantes si se emplea bien toda ella.',
    author: 'Séneca',
    roleOrWork: 'Sobre la brevedad de la vida',
    category: 'philosophy',
    categoryLabel: 'Filosofía y Vida',
    yearOrEra: '49 d.C.',
    reflectionNote: 'El valor del tiempo no reside en su duración nominal, sino en la intención con que lo habitamos.'
  },
  {
    id: 'phil-03',
    text: 'Al hombre se le puede arrebatar todo salvo una cosa: la última de las libertades humanas —la elección de la actitud personal ante un conjunto de circunstancias— para decidir su propio camino.',
    author: 'Viktor Frankl',
    roleOrWork: 'El hombre en busca de sentido',
    category: 'philosophy',
    categoryLabel: 'Filosofía y Vida',
    yearOrEra: '1946',
    reflectionNote: 'Entre el estímulo y la respuesta siempre existe un espacio donde reside nuestra libertad interior.'
  },
  {
    id: 'phil-04',
    text: 'No nos perturba lo que nos sucede, sino lo que nos decimos a nosotros mismos acerca de lo que nos sucede.',
    author: 'Epicteto',
    roleOrWork: 'Enquiridión (Manual de vida)',
    category: 'philosophy',
    categoryLabel: 'Filosofía y Vida',
    yearOrEra: 'Siglo I d.C.',
    reflectionNote: 'Distinguir los hechos objetivos de nuestros juicios nos devuelve la calma en momentos de incertidumbre.'
  },
  {
    id: 'phil-05',
    text: 'Somos lo que hacemos día a día. De modo que la excelencia no es un acto aislado, sino un hábito sostenido con deliberación.',
    author: 'Aristóteles',
    roleOrWork: 'Ética a Nicómaco',
    category: 'philosophy',
    categoryLabel: 'Filosofía y Vida',
    yearOrEra: 'Siglo IV a.C.',
    reflectionNote: 'El carácter se forja mediante pequeñas decisiones repetidas cuando nadie observa.'
  },
  {
    id: 'phil-06',
    text: 'Quien tiene un porqué para vivir puede soportar casi cualquier cómo.',
    author: 'Friedrich Nietzsche',
    roleOrWork: 'El crepúsculo de los ídolos',
    category: 'philosophy',
    categoryLabel: 'Filosofía y Vida',
    yearOrEra: '1889',
    reflectionNote: 'Un propósito claro convierte la adversidad en parte comprensible del recorrido.'
  },
  {
    id: 'phil-07',
    text: 'Yo soy yo y mi circunstancia, y si no la salvo a ella no me salvo yo.',
    author: 'José Ortega y Gasset',
    roleOrWork: 'Meditaciones del Quijote',
    category: 'philosophy',
    categoryLabel: 'Filosofía y Vida',
    yearOrEra: '1914',
    reflectionNote: 'Comprender nuestro entorno y transformarlo con lucidez es inseparable de nuestro propio crecimiento.'
  },
  {
    id: 'phil-08',
    text: 'En medio del invierno aprendí por fin que había en mí un verano invencible.',
    author: 'Albert Camus',
    roleOrWork: 'El verano (Bodas)',
    category: 'philosophy',
    categoryLabel: 'Filosofía y Vida',
    yearOrEra: '1954',
    reflectionNote: 'La resiliencia florece cuando reconocemos nuestra vitalidad incluso en etapas difíciles.'
  },
  {
    id: 'phil-09',
    text: 'La vida sólo puede ser comprendida mirando hacia atrás, pero ha de ser vivida mirando hacia adelante.',
    author: 'Søren Kierkegaard',
    roleOrWork: 'Diarios y papeles',
    category: 'philosophy',
    categoryLabel: 'Filosofía y Vida',
    yearOrEra: '1843',
    reflectionNote: 'Aceptar que la acción precede a la certeza total nos libera de la parálisis por análisis.'
  },
  {
    id: 'phil-10',
    text: 'Aquel que conquista a otros es fuerte; aquel que se conquista a sí mismo es verdaderamente poderoso.',
    author: 'Lao Tsé',
    roleOrWork: 'Tao Te Ching, Capítulo 33',
    category: 'philosophy',
    categoryLabel: 'Filosofía y Vida',
    yearOrEra: 'Siglo VI a.C.',
    reflectionNote: 'El autodominio silencioso supera cualquier demostración externa de autoridad.'
  },
  {
    id: 'phil-11',
    text: 'Sufrimos más a menudo en la imaginación que en la realidad.',
    author: 'Séneca',
    roleOrWork: 'Cartas morales a Lucilio, Carta XIII',
    category: 'philosophy',
    categoryLabel: 'Filosofía y Vida',
    yearOrEra: '64 d.C.',
    reflectionNote: 'Adelantar desastres que aún no han ocurrido consume la energía necesaria para el presente.'
  },
  {
    id: 'phil-12',
    text: 'La verdadera sabiduría está en reconocer la propia ignorancia y mantener intacta la capacidad de asombro.',
    author: 'Sócrates',
    roleOrWork: 'Apología de Sócrates (Platón)',
    category: 'philosophy',
    categoryLabel: 'Filosofía y Vida',
    yearOrEra: '399 a.C.',
    reflectionNote: 'La humildad intelectual abre la puerta a todo aprendizaje auténtico.'
  },
  {
    id: 'phil-13',
    text: 'No se alcanza la iluminación fantaseando sobre la luz, sino haciendo consciente la oscuridad.',
    author: 'Carl Gustav Jung',
    roleOrWork: 'Estudios sobre representaciones alquímicas',
    category: 'philosophy',
    categoryLabel: 'Filosofía y Vida',
    yearOrEra: '1945',
    reflectionNote: 'El autoconocimiento genuino requiere examinar con honestidad nuestras propias contradicciones.'
  },
  {
    id: 'phil-14',
    text: 'El secreto de la existencia humana no consiste solo en vivir, sino en saber para qué se vive.',
    author: 'Fiódor Dostoyevski',
    roleOrWork: 'Los hermanos Karamázov',
    category: 'philosophy',
    categoryLabel: 'Filosofía y Vida',
    yearOrEra: '1880',
    reflectionNote: 'El sentido vital proporciona dirección cuando las metas superficiales pierden brillo.'
  },
  {
    id: 'phil-15',
    text: 'Nada en la vida debe ser temido, solamente comprendido. Ahora es el momento de comprender más, para que podamos temer menos.',
    author: 'Marie Curie',
    roleOrWork: 'Escritos autobiográficos y notas de laboratorio',
    category: 'philosophy',
    categoryLabel: 'Filosofía y Vida',
    yearOrEra: '1923',
    reflectionNote: 'La curiosidad rigurosa disipa el miedo ante lo desconocido.'
  },
  {
    id: 'phil-16',
    text: 'La paciencia es amarga, pero su fruto es extraordinariamente dulce.',
    author: 'Jean-Jacques Rousseau',
    roleOrWork: 'Emilio, o De la educación',
    category: 'philosophy',
    categoryLabel: 'Filosofía y Vida',
    yearOrEra: '1762',
    reflectionNote: 'Todo proceso profundo requiere respetar sus propios tiempos de maduración.'
  },
  {
    id: 'phil-17',
    text: 'Quien mira hacia afuera, sueña; quien mira hacia adentro, despierta.',
    author: 'Carl Gustav Jung',
    roleOrWork: 'Cartas y ensayos psicológicos',
    category: 'philosophy',
    categoryLabel: 'Filosofía y Vida',
    yearOrEra: '1916',
    reflectionNote: 'La claridad personal surge al dejar de buscar validación constante en el exterior.'
  },
  {
    id: 'phil-18',
    text: 'La simplicidad es la máxima sofisticación cuando se ha atravesado toda la complejidad.',
    author: 'Leonardo da Vinci',
    roleOrWork: 'Cuadernos de notas (Códice Atlántico)',
    category: 'philosophy',
    categoryLabel: 'Filosofía y Vida',
    yearOrEra: 'c. 1500',
    reflectionNote: 'Destilar lo esencial exige comprender profundamente cada detalle previo.'
  },

  // Liderazgo, negocios y productividad
  {
    id: 'lead-01',
    text: 'No hay nada tan inútil como hacer con gran eficiencia algo que no debería hacerse en absoluto.',
    author: 'Peter Drucker',
    roleOrWork: 'El ejecutivo eficaz',
    category: 'leadership',
    categoryLabel: 'Liderazgo y Productividad',
    yearOrEra: '1963',
    reflectionNote: 'Antes de optimizar la velocidad de ejecución, verifica que estás avanzando en la dirección correcta.'
  },
  {
    id: 'lead-02',
    text: 'No te elevas al nivel de tus metas; caes al nivel de tus sistemas y procesos cotidianos.',
    author: 'James Clear',
    roleOrWork: 'Hábitos atómicos',
    category: 'leadership',
    categoryLabel: 'Liderazgo y Productividad',
    yearOrEra: '2018',
    reflectionNote: 'Los resultados extraordinarios dependen de diseñar entornos que faciliten la conducta deseada.'
  },
  {
    id: 'lead-03',
    text: 'La esencia de la estrategia consiste en elegir qué no hacer; sin renuncias deliberadas no existe ventaja sostenible.',
    author: 'Michael Porter',
    roleOrWork: 'What Is Strategy? — Harvard Business Review',
    category: 'leadership',
    categoryLabel: 'Liderazgo y Productividad',
    yearOrEra: '1996',
    reflectionNote: 'Decir «no» a buenas oportunidades permite dedicar toda la energía a las oportunidades extraordinarias.'
  },
  {
    id: 'lead-04',
    text: 'Juega juegos a largo plazo con personas de largo plazo. Todos los retornos en la vida —en riqueza, relaciones o conocimiento— provienen del interés compuesto.',
    author: 'Naval Ravikant',
    roleOrWork: 'El almanaque de Naval Ravikant',
    category: 'leadership',
    categoryLabel: 'Liderazgo y Productividad',
    yearOrEra: '2020',
    reflectionNote: 'La confianza mutua acumulada durante años multiplica el impacto de cualquier esfuerzo.'
  },
  {
    id: 'lead-05',
    text: 'Decidir qué no hacer es tan importante como decidir qué hacer. Eso es cierto para las empresas y también para los productos.',
    author: 'Steve Jobs',
    roleOrWork: 'Conferencia de liderazgo tecnológico',
    category: 'leadership',
    categoryLabel: 'Liderazgo y Productividad',
    yearOrEra: '1997',
    reflectionNote: 'El enfoque radical implica proteger al equipo de la dispersión en docenas de prioridades secundarias.'
  },
  {
    id: 'lead-06',
    text: 'La capacidad de concentrarse a fondo y sin distracciones en una tarea exigente es la habilidad que permite dominar cualquier oficio y crear valor real.',
    author: 'Cal Newport',
    roleOrWork: 'Enfócate (Deep Work)',
    category: 'leadership',
    categoryLabel: 'Liderazgo y Productividad',
    yearOrEra: '2016',
    reflectionNote: 'Reservar bloques de trabajo profundo protege el pensamiento creativo frente al ruido constante.'
  },
  {
    id: 'lead-07',
    text: 'La cultura de una organización se define por los comportamientos que sus líderes practican, promueven y toleran cada día.',
    author: 'Satya Nadella',
    roleOrWork: 'Hit Refresh (Pulsa actualizar)',
    category: 'leadership',
    categoryLabel: 'Liderazgo y Productividad',
    yearOrEra: '2017',
    reflectionNote: 'Un equipo que aprende todo supera siempre a un equipo que cree saberlo todo.'
  },
  {
    id: 'lead-08',
    text: 'Tu mente está hecha para tener ideas, no para retenerlas. Cuando vacías tus compromisos pendientes en un sistema confiable, recuperas la claridad creativa.',
    author: 'David Allen',
    roleOrWork: 'Organízate con eficacia (Getting Things Done)',
    category: 'leadership',
    categoryLabel: 'Liderazgo y Productividad',
    yearOrEra: '2001',
    reflectionNote: 'Liberar la memoria de trabajo reduce la fatiga mental y mejora la calidad de las decisiones.'
  },
  {
    id: 'lead-09',
    text: 'Un buen líder asume un poco más de la parte que le corresponde de la culpa y un poco menos de la parte que le corresponde del mérito.',
    author: 'Arnold H. Glasow',
    roleOrWork: 'Ensayos de dirección empresarial',
    category: 'leadership',
    categoryLabel: 'Liderazgo y Productividad',
    yearOrEra: '1965',
    reflectionNote: 'La generosidad en el reconocimiento fortalece el compromiso y la autonomía del equipo.'
  },
  {
    id: 'lead-10',
    text: 'Enfócate en las cosas que NO cambian con el paso de diez años: la excelencia, la fiabilidad y el respeto por el tiempo de las personas.',
    author: 'Jeff Bezos',
    roleOrWork: 'Cartas anuales a los accionistas',
    category: 'leadership',
    categoryLabel: 'Liderazgo y Productividad',
    yearOrEra: '2012',
    reflectionNote: 'Construir una estrategia sobre principios duraderos otorga estabilidad frente a modas pasajeras.'
  },
  {
    id: 'lead-11',
    text: 'El liderazgo no consiste en estar al mando, sino en cuidar de las personas que están a tu cargo y crear las condiciones para que prosperen.',
    author: 'Simon Sinek',
    roleOrWork: 'Los líderes comen al final',
    category: 'leadership',
    categoryLabel: 'Liderazgo y Productividad',
    yearOrEra: '2014',
    reflectionNote: 'La seguridad psicológica permite que los equipos asuman retos ambiciosos sin temor a proponer mejoras.'
  },
  {
    id: 'lead-12',
    text: 'Si no priorizas tu propia vida y tu agenda con intención deliberada, alguien más lo hará por ti.',
    author: 'Greg McKeown',
    roleOrWork: 'Esencialismo: La búsqueda disciplinada de menos',
    category: 'leadership',
    categoryLabel: 'Liderazgo y Productividad',
    yearOrEra: '2014',
    reflectionNote: 'Menos pero mejor es la regla fundamental para lograr contribuciones significativas.'
  },
  {
    id: 'lead-13',
    text: 'La franqueza radical solo funciona cuando demuestras que te importan profundamente las personas a las que desafías directamente.',
    author: 'Kim Scott',
    roleOrWork: 'Franqueza radical (Radical Candor)',
    category: 'leadership',
    categoryLabel: 'Liderazgo y Productividad',
    yearOrEra: '2017',
    reflectionNote: 'La retroalimentación honesta y empática acelera el desarrollo profesional sin erosionar la confianza.'
  },
  {
    id: 'lead-14',
    text: 'El activo más valioso del siglo XXI no es el equipo físico, sino los trabajadores del conocimiento y su capacidad de criterio autónomo.',
    author: 'Peter Drucker',
    roleOrWork: 'Los desafíos de la gerencia para el siglo XXI',
    category: 'leadership',
    categoryLabel: 'Liderazgo y Productividad',
    yearOrEra: '1999',
    reflectionNote: 'Liderar talento moderno exige alinear el propósito en lugar de supervisar cada microtarea.'
  },
  {
    id: 'lead-15',
    text: 'Tarda veinte años construir una reputación sólida y apenas cinco minutos arruinarla. Si piensas en ello, actuarás de manera diferente.',
    author: 'Warren Buffett',
    roleOrWork: 'Discursos y cartas de Berkshire Hathaway',
    category: 'leadership',
    categoryLabel: 'Liderazgo y Productividad',
    yearOrEra: '1991',
    reflectionNote: 'La integridad en los negocios es el único cimiento que resiste cualquier ciclo del mercado.'
  },
  {
    id: 'lead-16',
    text: 'Los planes son inútiles en el primer contacto con el cambio, pero la disciplina de planificar es indispensable.',
    author: 'Dwight D. Eisenhower',
    roleOrWork: 'Discurso ante el National Defense Executive Reserve',
    category: 'leadership',
    categoryLabel: 'Liderazgo y Productividad',
    yearOrEra: '1957',
    reflectionNote: 'Prepararse a fondo nos equipa con el contexto necesario para improvisar con criterio.'
  }
];
