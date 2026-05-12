import type { ReporteProblematica } from '@/types/problematica'

const img = (id: string, n: number) =>
  `https://picsum.photos/seed/bv-${id}-${n}/720/480`

/** Mínimo 17 reportes mock con contexto de Bogotá (calles, TM, localidades reales). */
export const MOCK_REPORTES_PROBLEMATICAS: ReporteProblematica[] = [
  {
    id: 'rep-001',
    titulo: 'Hueco en carril mixto frente al CAI de la Caracas con 59',
    descripcion:
      'Lleva más de tres semanas. Los buses del SITP y las motos esquivan a último minuto; anoche vi un carro levantar llanta. Está justo donde se forma taco saliendo del portal de la Caracas.',
    categoria: 'hueco_peligroso',
    estado: 'en_curso',
    localidad: 'Chapinero',
    coordenadas: { lat: 4.64689, lng: -74.06291 },
    fecha: '2026-04-28T07:40:00-05:00',
    prioridad: 'critica',
    resumenIa:
      'Reporte urbano: deterioro del pavimento en intersección de alto flujo vehicular (Caracas). Riesgo de daño vehicular y caídas en dos ruedas. Se sugiere priorizar tapado parcial y señalización nocturna.',
    imagenes: [img('001', 1), img('001', 2)],
    usuarioReportante: {
      id: 'usr-12',
      nombre: 'Camilo Rojas',
      alias: 'cam_rojas',
      email: 'camilo.rojas@correo-mock.co',
    },
    comentarios: [
      {
        id: 'c-001-a',
        autor: 'Vecina_7ma',
        texto: 'Confirmo, ayer casi se me mete una buseta encima esquivando el hueco.',
        fecha: '2026-04-28T19:02:00-05:00',
      },
      {
        id: 'c-001-b',
        autor: 'Mauricio — bici',
        texto: 'Por favor señalicen antes del puente peatonal, a oscuras no se ve.',
        fecha: '2026-04-29T06:15:00-05:00',
      },
    ],
  },
  {
    id: 'rep-002',
    titulo: 'Punto ciego entre estación Calle 85 y el cajero del lado occidental',
    descripcion:
      'Salgo del TM a las 9:30 pm varias veces a la semana. Hay un tramo sin comercio abierto, poca luz y gente que se queda “esperando bus” pero no sube a ninguno. La semana pasada corrieron a una pareja.',
    categoria: 'inseguridad_estacion',
    estado: 'abierto',
    localidad: 'Chapinero',
    coordenadas: { lat: 4.67252, lng: -74.05773 },
    fecha: '2026-05-02T21:18:00-05:00',
    prioridad: 'alta',
    resumenIa:
      'Percepción de inseguridad nocturna asociada a entorno de estación TM y ausencia de actividad comercial. Correlación con reportes de “acoso al salir del torniquete”. Recomendable patrullaje horario punta salida universidades.',
    imagenes: [img('002', 1)],
    usuarioReportante: {
      id: 'usr-44',
      nombre: 'Laura Méndez',
      alias: 'lau_md',
      email: 'l.mendez@correo-mock.co',
    },
    comentarios: [
      {
        id: 'c-002-a',
        autor: 'Defensoría barrial (mock)',
        texto: '¿Alguien tiene contacto del CAU de Chapinero? Lo paso al grupo de WhatsApp del edificio.',
        fecha: '2026-05-02T22:40:00-05:00',
      },
    ],
  },
  {
    id: 'rep-003',
    titulo: 'Semáforo de Av. NQS con Av. El Dorado lleva días en intermitente “parpadeo amarillo"',
    descripcion:
      'El cruce es un infierno en la mañana: salen carros del aeropuerto, entran a la NQS y nadie respeta turno. Los policías de tránsito no alcanzan a cubrir todos los días.',
    categoria: 'semaforo_danado',
    estado: 'en_revision',
    localidad: 'Fontibón',
    coordenadas: { lat: 4.66862, lng: -74.12389 },
    fecha: '2026-05-05T05:55:00-05:00',
    prioridad: 'alta',
    resumenIa:
      'Fallo de semáforo en nodo vial crítico (conexión a Corredor Aeropuerto). Modo intermitente genera ambigüedad de precedencia. Alto riesgo de choque lateral. Prioridad de mantenimiento de señalización.',
    imagenes: [img('003', 1), img('003', 2), img('003', 3)],
    usuarioReportante: {
      id: 'usr-08',
      nombre: 'Hernán Villalobos',
      alias: 'hv_chofer',
      email: 'hvillalobos@correo-mock.co',
    },
    comentarios: [
      {
        id: 'c-003-a',
        autor: 'Taxista NQS',
        texto: 'Llevo 4 días viendo lo mismo, hoy casi nos pegamos dos tractomulas.',
        fecha: '2026-05-05T06:30:00-05:00',
      },
      {
        id: 'c-003-b',
        autor: 'Ana — moto',
        texto: 'Por la tarde es peor, nadie cede.',
        fecha: '2026-05-05T17:10:00-05:00',
      },
    ],
  },
  {
    id: 'rep-004',
    titulo: 'Rumba en terraza en carrera 4 con 26: música hasta las 3 am entre semana',
    descripcion:
      'Soy del edificio del frente, tengo niño pequeño. Es reincidente: sube el bajo y gritos. El portero del otro edificio dice que “es un Airbnb”.',
    categoria: 'ruido_nocturno',
    estado: 'abierto',
    localidad: 'Santa Fe',
    coordenadas: { lat: 4.61412, lng: -74.06887 },
    fecha: '2026-05-07T02:35:00-05:00',
    prioridad: 'media',
    resumenIa:
      'Queja por ruido nocturno recurrente en zona céntrica de densidad mixta (vivienda + turismo). Posible uso nocturno de inmueble tipo alojamiento. Sugerencia: medición sonora y ruta de convivencia/policía de barrio.',
    imagenes: [img('004', 1)],
    usuarioReportante: {
      id: 'usr-19',
      nombre: 'María Fernanda López',
      alias: 'mafe_lo',
      email: 'mflopez@correo-mock.co',
    },
    comentarios: [
      {
        id: 'c-004-a',
        autor: 'Piso 8 torre B',
        texto: 'A mí también me despertó, mandé audio al grupo del conjunto.',
        fecha: '2026-05-07T07:00:00-05:00',
      },
    ],
  },
  {
    id: 'rep-005',
    titulo: 'Esquina de la 53 con Caracas: basureros volcados y perros callejeros revolviendo',
    descripcion:
      'Hay sacos negros desde el viernes, huele horrible y se están corriendo los líquidos hacia el canal. Es frente a una salida del TM Marly.',
    categoria: 'basura_acumulada',
    estado: 'en_curso',
    localidad: 'Chapinero',
    coordenadas: { lat: 4.64109, lng: -74.06558 },
    fecha: '2026-05-01T11:20:00-05:00',
    prioridad: 'alta',
    resumenIa:
      'Acumulación de residuos sólidos en vía pública con proximidad a infraestructura de transporte masivo. Riesgo sanitario y afectación peatonal. Se sugiere recolección urgente y verificación de disposición informal.',
    imagenes: [img('005', 1), img('005', 2)],
    usuarioReportante: {
      id: 'usr-31',
      nombre: 'Jorge Pinzón',
      alias: 'jpinzon',
      email: 'j.pinzon@correo-mock.co',
    },
    comentarios: [
      {
        id: 'c-005-a',
        autor: 'Tienda de barrio Doña Rosa',
        texto: 'Afecta la entrada del local, clientes se devuelven.',
        fecha: '2026-05-01T14:00:00-05:00',
      },
    ],
  },
  {
    id: 'rep-006',
    titulo: 'Poste de alumbrado caído sobre andén en Carrera 7 con 63 (lado Parque de la 93)',
    descripcion:
      'Lo amarraron con cinta precaria pero sigue inclinado; los cables quedan a la altura de la cara de un niño. Mucho turista camina por ahí.',
    categoria: 'alumbrado_publico',
    estado: 'en_revision',
    localidad: 'Chapinero',
    coordenadas: { lat: 4.66771, lng: -74.0528 },
    fecha: '2026-05-06T16:45:00-05:00',
    prioridad: 'critica',
    resumenIa:
      'Poste de alumbrado público con inclinación peligrosa y cableado expuesto. Zona de alto flujo peatonal y turístico. Riesgo eléctrico y de caída del artefacto. Requiere intervención inmediata de red de energía y señalización perimetral.',
    imagenes: [img('006', 1), img('006', 2)],
    usuarioReportante: {
      id: 'usr-02',
      nombre: 'Andrea Cárdenas',
      alias: 'andre93',
      email: 'a.cardenas@correo-mock.co',
    },
    comentarios: [
      {
        id: 'c-006-a',
        autor: 'Guía turístico (mock)',
        texto: 'Lo vi hoy en la mañana, está peor que ayer.',
        fecha: '2026-05-07T09:10:00-05:00',
      },
    ],
  },
  {
    id: 'rep-007',
    titulo: 'Rampas del andén de estación Banderas: grietas y desnivel con la acera',
    descripcion:
      'Mi papá va en silla de ruedas y se atasca en el borde. Además cuando llueve queda charco y patina el metal de la rampa.',
    categoria: 'accesibilidad',
    estado: 'abierto',
    localidad: 'Kennedy',
    coordenadas: { lat: 4.62641, lng: -74.16839 },
    fecha: '2026-04-22T10:05:00-05:00',
    prioridad: 'media',
    resumenIa:
      'Barrera de accesibilidad en interfaz rampa-acera asociada a estación TM. Condiciones de desnivel y superficie resbaladiza en lluvia. Impacto en movilidad reducida. Sugerencia: ajuste de pendiente y material antideslizante.',
    imagenes: [img('007', 1)],
    usuarioReportante: {
      id: 'usr-27',
      nombre: 'Patricia Guevara',
      alias: 'paty_g',
      email: 'p.guevara@correo-mock.co',
    },
    comentarios: [
      {
        id: 'c-007-a',
        autor: 'Consejo de discapacidad local (mock)',
        texto: 'Lo sumamos a la mesa de Kennedy sur, gracias por el detalle del clima.',
        fecha: '2026-04-23T08:30:00-05:00',
      },
    ],
  },
  {
    id: 'rep-008',
    titulo: 'Carrera 24 I con calle 6 sur sur: mal olor y rebalse en temporada de lluvia',
    descripcion:
      'Huele a cloaca desde hace rato. Los vecinos dicen que el pozo tapado “revienta” cuando llueve fuerte. Ya hubo caso de niños con infección (comentario de salón comunal, no verificado).',
    categoria: 'alcantarillado',
    estado: 'en_curso',
    localidad: 'Usme',
    coordenadas: { lat: 4.47652, lng: -74.12108 },
    fecha: '2026-05-03T13:22:00-05:00',
    prioridad: 'alta',
    resumenIa:
      'Reporte de posible falla de red de alcantarillado con rebalse episódico y olor en sector sur. Requiere inspección técnica de red y monitoreo en eventos de precipitación. Salud comunitaria mencionada sin fuente verificada — marcar para validación.',
    imagenes: [img('008', 1), img('008', 2)],
    usuarioReportante: {
      id: 'usr-55',
      nombre: 'Óscar Niño',
      alias: 'osc_usme',
      email: 'onino@correo-mock.co',
    },
    comentarios: [
      {
        id: 'c-008-a',
        autor: 'JAC Usme (mock)',
        texto: 'Pedimos visita de acueducto, comparto fotos del salón.',
        fecha: '2026-05-03T15:00:00-05:00',
      },
      {
        id: 'c-008-b',
        autor: 'Vecino bloque 4',
        texto: 'Hoy amaneció otra vez con charco en la esquina.',
        fecha: '2026-05-04T06:50:00-05:00',
      },
    ],
  },
  {
    id: 'rep-009',
    titulo: 'Vendedores informales bloquean mitad del andén salida sur Portal del Sur',
    descripcion:
      'Hay toldos fijos y mesas; el corredor queda de 60 cm. Con lluvia la gente empuja y casi cae a la calle. Es diario de 5 a 8 pm.',
    categoria: 'anden_obstruido',
    estado: 'en_revision',
    localidad: 'Usme',
    coordenadas: { lat: 4.56712, lng: -74.14351 },
    fecha: '2026-05-04T17:40:00-05:00',
    prioridad: 'media',
    resumenIa:
      'Ocupación del espacio peatonal por comercio informal en horario pico en entorno de portal TM. Riesgo de aglomeración y caídas. Sugiere gestión del espacio público con enfoque de convivencia y seguridad peatonal.',
    imagenes: [img('009', 1)],
    usuarioReportante: {
      id: 'usr-41',
      nombre: 'Daniela Suárez',
      alias: 'd_suarez',
      email: 'dsuarez@correo-mock.co',
    },
    comentarios: [
      {
        id: 'c-009-a',
        autor: 'Pasajero TM',
        texto: 'Confirmo, hoy casi no pasaba una persona con maleta.',
        fecha: '2026-05-04T18:10:00-05:00',
      },
    ],
  },
  {
    id: 'rep-010',
    titulo: 'Hueco profundo en transversal 54 con Av. Boyacá (lado suba a rotonda)',
    descripcion:
      'Ya taparon una vez pero volvió a abrirse. Los buses articulados pegan fuerte y suelta pedazos de asfalto. Peligroso para motos que se cuelan por la derecha.',
    categoria: 'hueco_peligroso',
    estado: 'abierto',
    localidad: 'Engativá',
    coordenadas: { lat: 4.70591, lng: -74.10612 },
    fecha: '2026-05-06T08:12:00-05:00',
    prioridad: 'alta',
    resumenIa:
      'Recurrencia de falla estructural en pavimento en corredor de alto flujo de buses articulados. Indicativo de posible problema de base o drenaje. Requiere intervención estructural, no solo parche superficial.',
    imagenes: [img('010', 1), img('010', 2)],
    usuarioReportante: {
      id: 'usr-03',
      nombre: 'Felipe Ardila',
      alias: 'fardila',
      email: 'f.ardila@correo-mock.co',
    },
    comentarios: [],
  },
  {
    id: 'rep-011',
    titulo: 'Robos “al salir” de estación Patio Bonito en horario nocturno',
    descripcion:
      'Varias personas del barrio han contado lo mismo: los esperan entre el paso a desnivel y los paraderos. Yo no quiero grabar con el celular por miedo, pero sí quiero más presencia.',
    categoria: 'inseguridad_estacion',
    estado: 'en_curso',
    localidad: 'Kennedy',
    coordenadas: { lat: 4.6189, lng: -74.16872 },
    fecha: '2026-04-30T22:05:00-05:00',
    prioridad: 'alta',
    resumenIa:
      'Patrón de hurto reportado en corredor peatonal posterior a estación TM. Percepción de ausencia de disuasión. Se sugiere articulación con CAI y rutas de patrullaje móvil en ventana 21:00–00:00.',
    imagenes: [img('011', 1)],
    usuarioReportante: {
      id: 'usr-60',
      nombre: 'Ricardo Peña',
      alias: 'richkennedy',
      email: 'r.pena@correo-mock.co',
    },
    comentarios: [
      {
        id: 'c-011-a',
        autor: 'Líder juvenil barrio',
        texto: 'En el chat del barrio hay 6 testimonios similares de abril.',
        fecha: '2026-05-01T10:00:00-05:00',
      },
    ],
  },
  {
    id: 'rep-012',
    titulo: 'Semáforo peatonal de la 11 con 69 frente al parque no cambia: peatones cruzan “a la mala"',
    descripcion:
      'El botón suena pero la luz peatonal nunca da verde; los carros aceleran porque la NQS está despejada. Es cerca del puente de la 11.',
    categoria: 'semaforo_danado',
    estado: 'abierto',
    localidad: 'Chapinero',
    coordenadas: { lat: 4.65312, lng: -74.05591 },
    fecha: '2026-05-07T12:30:00-05:00',
    prioridad: 'critica',
    resumenIa:
      'Fallo en fase peatonal de cruce sobre corredor de alta velocidad. Riesgo severo: cruces forzados sin protección. Prioridad máxima de mantenimiento de cruces seguros.',
    imagenes: [img('012', 1), img('012', 2)],
    usuarioReportante: {
      id: 'usr-17',
      nombre: 'Lucía Herrera',
      alias: 'luher',
      email: 'l.herrera@correo-mock.co',
    },
    comentarios: [
      {
        id: 'c-012-a',
        autor: 'Profes universidad cercana',
        texto: 'Salimos a las 9 pm de clases, es un tema serio.',
        fecha: '2026-05-07T13:00:00-05:00',
      },
    ],
  },
  {
    id: 'rep-013',
    titulo: 'Construcción en Teusaquillo: vibraciones y ruido fuera del horario permitido',
    descripcion:
      'Están vaciando escombros a las 11 pm y los martillos neumáticos suenan desde las 6 am sábado. El vigilante dice que “mandaron apurar obra”.',
    categoria: 'ruido_nocturno',
    estado: 'en_revision',
    localidad: 'Teusaquillo',
    coordenadas: { lat: 4.64821, lng: -74.10087 },
    fecha: '2026-05-05T23:10:00-05:00',
    prioridad: 'media',
    resumenIa:
      'Presunto incumplimiento de horario de obra con impacto acústico en zona residencial. Sugerencia: verificación de permisos de obra y medición de ruido por inspección.',
    imagenes: [img('013', 1)],
    usuarioReportante: {
      id: 'usr-09',
      nombre: 'Esteban Murillo',
      alias: 'este_mur',
      email: 'e.murillo@correo-mock.co',
    },
    comentarios: [
      {
        id: 'c-013-a',
        autor: 'Apto 502',
        texto: 'Firmamos carta al edificio de al lado, sumo mi nombre.',
        fecha: '2026-05-06T07:45:00-05:00',
      },
    ],
  },
  {
    id: 'rep-014',
    titulo: 'Carrera 68 con calle 53: “isla” de escombros y plásticos arrastrados del canal',
    descripcion:
      'Después del aguacero quedó montado un berrenchín de basura en el separador. Parece mezcla de obra y residuos domésticos. Huele a quemado los fines de semana.',
    categoria: 'basura_acumulada',
    estado: 'resuelto',
    localidad: 'Engativá',
    coordenadas: { lat: 4.65441, lng: -74.10952 },
    fecha: '2026-04-10T09:00:00-05:00',
    prioridad: 'media',
    resumenIa:
      'Acumulación heterogénea posiblemente asociada a arrastre pluvial y vertimiento informal. Caso marcado como resuelto en mock para variación de estado.',
    imagenes: [img('014', 1)],
    usuarioReportante: {
      id: 'usr-22',
      nombre: 'Gloria Bastidas',
      alias: 'glo_bast',
      email: 'g.bastidas@correo-mock.co',
    },
    comentarios: [
      {
        id: 'c-014-a',
        autor: 'Vecino',
        texto: 'Hoy pasó el camión, quedó mucho mejor.',
        fecha: '2026-04-12T18:00:00-05:00',
      },
    ],
  },
  {
    id: 'rep-015',
    titulo: 'Luminarias apagadas en el canalón del parque El Tunal (tramo sur)',
    descripcion:
      'Entreno trotando y desde hace meses ese tramo está oscuro. Hay gente tomando y no se ve el borde del camino.',
    categoria: 'alumbrado_publico',
    estado: 'en_curso',
    localidad: 'Tunjuelito',
    coordenadas: { lat: 4.56602, lng: -74.12751 },
    fecha: '2026-04-18T19:40:00-05:00',
    prioridad: 'alta',
    resumenIa:
      'Sector de parque con luminarias inoperativas y percepción de inseguridad nocturna. Recomendable restablecimiento de alumbrado y recorrido de vigilancia en horario nocturno.',
    imagenes: [img('015', 1), img('015', 2)],
    usuarioReportante: {
      id: 'usr-33',
      nombre: 'Iván Duarte',
      alias: 'ivan_run',
      email: 'i.duarte@correo-mock.co',
    },
    comentarios: [],
  },
  {
    id: 'rep-016',
    titulo: 'Andén de estación San Victorino: comercio fijo reduce ancho a menos de un metro',
    descripcion:
      'Es el corredor que conecta con la Séptima. Con mercancía en el piso no pasa una silla de ruedas ni un adulto mayor con andador.',
    categoria: 'anden_obstruido',
    estado: 'abierto',
    localidad: 'Santa Fe',
    coordenadas: { lat: 4.60291, lng: -74.07752 },
    fecha: '2026-05-01T15:25:00-05:00',
    prioridad: 'alta',
    resumenIa:
      'Conflicto de uso del espacio peatonal por comercio en vía en corredor de alta afluencia céntrica. Impacto directo en accesibilidad universal. Requiere gestión coordinada de espacio público.',
    imagenes: [img('016', 1)],
    usuarioReportante: {
      id: 'usr-50',
      nombre: 'Carolina Ortiz',
      alias: 'caro_ort',
      email: 'c.ortiz@correo-mock.co',
    },
    comentarios: [
      {
        id: 'c-016-a',
        autor: 'Observatorio movilidad (mock)',
        texto: 'Sumamos este punto al mapa de conflictos del centro.',
        fecha: '2026-05-02T11:00:00-05:00',
      },
    ],
  },
  {
    id: 'rep-017',
    titulo: 'Hueco con agua estancada frente a entrada de Ciudad Bolívar sector Lucero',
    descripcion:
      'Cada lluvia se hace laguna y los buses chapotean y mojan a los peatones. Ya van dos caídas de moto que vi con mis ojos.',
    categoria: 'hueco_peligroso',
    estado: 'cerrado',
    localidad: 'Ciudad Bolívar',
    coordenadas: { lat: 4.49512, lng: -74.15388 },
    fecha: '2026-03-20T07:10:00-05:00',
    prioridad: 'media',
    resumenIa:
      'Bache con acumulación hídrica recurrente; riesgo de salpicadura y caídas. Estado “cerrado” en mock simula cierre administrativo sin obra confirmada — útil para pruebas de UI.',
    imagenes: [img('017', 1)],
    usuarioReportante: {
      id: 'usr-71',
      nombre: 'Henry Molina',
      alias: 'hen_mol',
      email: 'hmolina@correo-mock.co',
    },
    comentarios: [
      {
        id: 'c-017-a',
        autor: 'Moderación mock',
        texto: 'Caso archivado por duplicado según sistema (mensaje simulado).',
        fecha: '2026-04-01T10:00:00-05:00',
      },
    ],
  },
  {
    id: 'rep-018',
    titulo: 'Mal estado de andenes en Av. Jiménez entre carrera 8 y 10: adoquines sueltos',
    descripcion:
      'Turistas con maletas se traban; una señora se torció el tobillo el domingo. Además el desnivel no está señalizado para bastón.',
    categoria: 'accesibilidad',
    estado: 'en_revision',
    localidad: 'La Candelaria',
    coordenadas: { lat: 4.60144, lng: -74.07491 },
    fecha: '2026-05-08T11:00:00-05:00',
    prioridad: 'media',
    resumenIa:
      'Superficie peatonal irregular en corredor turístico céntrico. Riesgo de tropiezos y baja accesibilidad táctil/luminosa. Sugiere intervención de mantenimiento y señalización provisional.',
    imagenes: [img('018', 1), img('018', 2)],
    usuarioReportante: {
      id: 'usr-05',
      nombre: 'Natalia Fandiño',
      alias: 'nat_fand',
      email: 'n.fandino@correo-mock.co',
    },
    comentarios: [
      {
        id: 'c-018-a',
        autor: 'Hostal La Candelaria',
        texto: 'Nuestros huéspedes se quejan todos los fines de semana.',
        fecha: '2026-05-08T12:20:00-05:00',
      },
    ],
  },
]
