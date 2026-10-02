// Referencias verificadas el 1 de octubre de 2026. Los años de los datos
// son parte de cada afirmación: no equivalen a la fecha de esta revisión.
export const sources = [
  {
    id: 'historia',
    number: '01',
    author: 'Mayorga, M. (2023)',
    title:
      'Punta Arenas y la pesquería de focas del sur de Patagonia: capitán Temple en la Gran Feria Internacional de Pesca de Londres, 1883',
    publisher: 'Magallania, 51 · Universidad de Magallanes',
    url: 'https://doi.org/10.22352/MAGALLANIA202351013',
    use: 'Explotación comercial, circuitos de pieles y primeras prohibiciones.',
  },
  {
    id: 'anita',
    number: '02',
    author: 'Mayorga Zúñiga, M. (2020)',
    title: 'A la caza de lobos y otras especulaciones: el diario de la goleta lobera Anita',
    publisher: 'Servicio Nacional del Patrimonio Cultural · Bajo la Lupa',
    url: 'https://www.investigacion.patrimoniocultural.gob.cl/publicaciones/la-caza-de-lobos-y-otras-especulaciones-el-diario-de-la-goleta-lobera-anita',
    use: 'Registro histórico de expediciones entre 1875 y 1878.',
  },
  {
    id: 'censo',
    number: '03',
    author: 'Oliva, D. y equipo (2019)',
    title:
      'Estimación poblacional de lobos marinos e impacto de la captura incidental. Informe complementario FIPA 2018-54',
    publisher: 'Universidad de Valparaíso / Subpesca · resumen y pp. 20, 41',
    url: 'https://www.subpesca.cl/portal/617/articles-105724_recurso_1.pdf',
    use: 'Estimaciones y loberas de Arica y Parinacota a Aysén, verano de 2019.',
  },
  {
    id: 'comun',
    number: '04',
    author: 'Ministerio del Medio Ambiente (s. f.)',
    title: 'Otaria byronia: ficha de especie',
    publisher: 'SIMBIO · Plataforma de Políticas de la Biodiversidad',
    url: 'https://simbio.mma.gob.cl/Especies/Details/12279',
    use: 'Biología, distribución y antecedentes del lobo marino común.',
  },
  {
    id: 'fino',
    number: '05',
    author: 'Ministerio del Medio Ambiente (s. f.)',
    title: 'Arctocephalus australis: ficha de especie',
    publisher: 'SIMBIO · Plataforma de Políticas de la Biodiversidad',
    url: 'https://simbio.mma.gob.cl/Especies/Details/4513',
    use: 'Identificación, pelaje y antecedentes del lobo fino austral.',
  },
  {
    id: 'veda-comun',
    number: '06',
    author: 'Ministerio de Economía (2021)',
    title: 'Decreto exento N° 4: renueva veda extractiva del lobo marino común',
    publisher: '21 de enero de 2021 · texto disponible en Sernapesca',
    url: 'https://www.sernapesca.cl/app/uploads/2023/11/d.ex_.4-2021.pdf',
    use: 'Veda por diez años desde el 27 de enero de 2021 y excepciones específicas.',
  },
  {
    id: 'veda-fino',
    number: '07',
    author: 'Ministerio de Economía (2025)',
    title:
      'Decreto exento folio 202500204: renueva veda de mamíferos marinos, reptiles marinos y pingüinos',
    publisher: '23 de octubre de 2025 · Subpesca',
    url: 'https://www.subpesca.cl/portal/615/articles-127483_documento.pdf',
    use: 'Veda por treinta años desde el 11 de noviembre de 2025; incluye al lobo fino austral.',
  },
  {
    id: 'cites',
    number: '08',
    author: 'FAO y Secretaría CITES (2020)',
    title:
      'La aplicación de la CITES mediante los marcos jurídicos nacionales de pesca: estudio y guía',
    publisher: 'FAO / CITES',
    url: 'https://cites.org/sites/default/files/LAC/S.guide_study.pdf',
    use: 'Comercio internacional: Arctocephalus spp. en Apéndice II, con las excepciones del Apéndice I. Consultar apéndices vigentes para trámites.',
  },
  {
    id: 'interacciones',
    number: '09',
    author: 'Ebmer, D. y colaboradores (2020)',
    title:
      'Anthropozoonotic Parasites Circulating in Synanthropic and Pacific Colonies of South American Sea Lions',
    publisher: 'Frontiers in Marine Science · DOI 10.3389/fmars.2020.543829',
    url: 'https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2020.543829/full',
    use: 'Interacciones entre colonias, actividad humana y dimensión sanitaria.',
  },
  {
    id: 'captura',
    number: '10',
    author: 'Wade, P. R. y colaboradores (2021)',
    title: 'Best Practices for Assessing and Managing Bycatch of Marine Mammals',
    publisher: 'Frontiers in Marine Science · DOI 10.3389/fmars.2021.757330',
    url: 'https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2021.757330/full',
    use: 'Captura incidental, monitoreo y evaluación de medidas de mitigación.',
  },
  {
    id: 'convivencia',
    number: '11',
    author: 'Sernapesca (s. f.)',
    title:
      'Sernapesca realiza difusión sobre cuidado con la fauna marina por presencia de lobo marino común en el lago Ranco',
    publisher: 'Servicio Nacional de Pesca y Acuicultura',
    url: 'https://www.sernapesca.cl/noticias/sernapesca-realiza-difusion-sobre-cuidado-con-la-fauna-marina-por-presencia-de-lobo-marino-comun-en-el-lago-ranco/',
    use: 'Distancia mínima de 50 m, no alimentar, no manipular y alejar mascotas.',
  },
  {
    id: 'influenza',
    number: '12',
    author: 'Sernapesca (2023)',
    title: 'Sernapesca confirma primer caso de influenza aviar en un lobo marino en Chile',
    publisher: 'Servicio Nacional de Pesca y Acuicultura',
    url: 'https://www.sernapesca.cl/noticias/sernapesca-confirma-primer-caso-de-influenza-aviar-en-un-lobo-marino-en-chile/',
    use: 'Una amenaza sanitaria distinta de la caza; aviso al 800 320 032.',
  },
] as const;
export type SourceId = (typeof sources)[number]['id'];

export const timeline = [
  {
    year: '1780s',
    label: 'EL NEGOCIO DE LAS PIELES',
    title: 'El océano se convierte en mercado.',
    text: 'Desde fines del siglo XVIII, loberos británicos y estadounidenses explotan lobos finos del extremo austral para el comercio internacional. La presión comercial reduce sus poblaciones.',
    source: 'historia' as SourceId,
  },
  {
    year: '1875–78',
    label: 'UNA HISTORIA DOCUMENTADA',
    title: 'Lo que cuenta la goleta Anita.',
    text: 'Su bitácora registra viajes desde Punta Arenas hacia los archipiélagos de Patagonia occidental en busca de pieles de lobo fino austral. El archivo permite reconstruir esta actividad.',
    source: 'anita' as SourceId,
  },
  {
    year: '1892',
    label: 'LOS PRIMEROS LÍMITES',
    title: 'Regular una explotación creciente.',
    text: 'Comienzan prohibiciones temporales de caza del lobo fino austral. Las normas de 1892, 1893 y 1929 anteceden a la prohibición indefinida de 1950.',
    source: 'historia' as SourceId,
  },
  {
    year: '2021',
    label: 'LOBO MARINO COMÚN',
    title: 'Una veda por diez años.',
    text: 'El decreto N° 4 renueva la veda extractiva desde el 27 de enero de 2021. Establece excepciones específicas sujetas a regulación; no autoriza la caza libre.',
    source: 'veda-comun' as SourceId,
  },
  {
    year: '2025',
    label: 'LOBO FINO AUSTRAL',
    title: 'Treinta años más de protección.',
    text: 'La veda para las especies enumeradas en el decreto 202500204 se renueva desde el 11 de noviembre de 2025. Entre ellas está el lobo fino austral.',
    source: 'veda-fino' as SourceId,
  },
];

export const regions = [
  {
    name: 'Norte',
    area: 'Arica y Parinacota → Coquimbo',
    count: 39256,
    dispersion: 2231,
    color: '#fd795d',
  },
  {
    name: 'Centro',
    area: 'Valparaíso → La Araucanía',
    count: 22201,
    dispersion: 571,
    color: '#efcb87',
  },
  { name: 'Sur', area: 'Los Ríos → Aysén', count: 62044, dispersion: 3139, color: '#86b6b8' },
];

export const questions = [
  {
    label: 'EN EL BORDE COSTERO',
    title: 'Un lobo marino descansa en la playa. ¿Qué haces?',
    options: [
      'Me acerco para darle pescado.',
      'Observo desde al menos 50 m y mantengo alejadas a las mascotas.',
      'Lo empujo al agua para ayudarlo.',
    ],
    correct: 1,
    explanation:
      'Descansar en tierra es normal. Respetar la distancia evita estrés y accidentes. No lo alimentes ni lo manipules; si está herido o en peligro, avisa a Sernapesca.',
    source: 'convivencia' as SourceId,
  },
  {
    label: 'LEER LA EVIDENCIA',
    title: 'Un informe estima 123.301 animales entre Arica y Aysén en 2019. ¿Qué puedes afirmar?',
    options: [
      'Es una estimación de esa zona y ese año.',
      'Es la población exacta de Chile hoy.',
      'Demuestra cuántos animales murieron por caza.',
    ],
    correct: 0,
    explanation:
      'Un dato tiene límites: lugar, fecha, especie y método. Este censo no incluye todo Chile ni demuestra por sí solo una relación causal con la caza.',
    source: 'censo' as SourceId,
  },
  {
    label: 'UNA COSTA COMPARTIDA',
    title: 'Una caleta enfrenta daños en sus redes. ¿Qué propuesta es más responsable?',
    options: [
      'Eliminar lobos sin estudiar el problema.',
      'Culpar a todos los pescadores por igual.',
      'Medir las interacciones y evaluar medidas de mitigación con pescadores y autoridades.',
    ],
    correct: 2,
    explanation:
      'Conservar también exige escuchar a quienes viven de la pesca. Registrar capturas incidentales y evaluar medidas permite buscar soluciones con evidencia y revisar si funcionan.',
    source: 'captura' as SourceId,
  },
  {
    label: 'HISTORIA Y PRESENTE',
    title: '¿La caza comercial del siglo XIX explica por sí sola todos los problemas actuales?',
    options: [
      'Sí, toda muerte actual se debe a esa caza.',
      'No: hay que distinguir explotación histórica, captura incidental y otras amenazas.',
      'No importa investigar las causas.',
    ],
    correct: 1,
    explanation:
      'La historia ayuda a entender la explotación, pero no reemplaza el diagnóstico actual. Un brote sanitario, por ejemplo, requiere evidencia y respuestas diferentes de las de la caza.',
    source: 'influenza' as SourceId,
  },
  {
    label: 'RESPONSABILIDAD COLECTIVA',
    title: 'Tu curso quiere ayudar desde Renca. ¿Qué acción conecta mejor con el problema?',
    options: [
      'Difundir fuentes verificadas y promover diálogo sobre protección, pesca y fiscalización.',
      'Prometer que una limpieza escolar resolverá el conflicto pesquero.',
      'Compartir cualquier cifra alarmante para llamar la atención.',
    ],
    correct: 0,
    explanation:
      'La comunicación científica puede conectar a la escuela con una decisión pública. Las acciones individuales aportan, pero no sustituyen el monitoreo, la fiscalización ni la gestión de las pesquerías.',
    source: 'veda-fino' as SourceId,
  },
];
